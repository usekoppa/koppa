import { Bucket } from "./bucket.ts";

import { RequestMethod } from "../payload/method.ts";

import { SnowflakeUtil } from "../../utils/snowflake_util.ts";
import { PathLike } from "../../utils/type_util.ts";

import { produce } from "../../deps.ts";

export interface RateLimiter {
  readonly global: Bucket;
  // The route ID -> the hash.
  readonly routed: Map<string, string>;
  // hash -> bucket
  readonly buckets: Map<string, Bucket>;
  readonly latency: number;
}

export namespace RateLimiter {
  export interface CreateOptions {
    /**
     * DO NOT use this option unless you have your global rate limit adjusted by Discord.
     */
    global?: {
      /** The amount of requests you can have per period. */
      limit: number;
      /** The period be in seconds. */
      period: number;
    };
  }

  export function Create(opts?: CreateOptions): RateLimiter {
    // 50 requests per second by default.
    const limit = opts?.global?.limit ?? 50;
    return {
      // https://discord.com/developers/docs/topics/rate-limits#global-rate-limit
      global: Bucket.Create({
        limit,
        // Starts with `limit` requests that can be reserved.
        remaining: limit,
        // 1 second in ms by default.
        period: (opts?.global?.period ?? 1) * 1000,
      }),
      routed: new Map(),
      buckets: new Map(),
      latency: 0,
    };
  }

  export async function limit(
    limiter: RateLimiter,
    request: Request,
  ) {
    const global = await Bucket.reserve(limiter.global, limiter.latency);
    const routeID = produceRouteID(
      request.method as RequestMethod,
      new URL(request.url).pathname as PathLike,
    );

    const hash = getHash(limiter, routeID);
    let bucket: Bucket;
    if (hash) {
      bucket = getBucket(limiter, hash);
      bucket = await Bucket.reserve(bucket, limiter.latency);
    }

    return produce(limiter, (draft) => {
      draft.global = global;
      if (hash) draft.buckets.set(hash, bucket);
    });
  }

  export async function update(
    limiter: RateLimiter,
    method: RequestMethod,
    response: Response,
  ) {
    const latency = calculateLatency(response);

    const routeID = produceRouteID(
      method,
      new URL(response.url).pathname as PathLike,
    );

    let hash = getHash(
      limiter,
      routeID,
    );

    let bucket: Bucket;
    let isGlobalRateLimit = false;
    let retryAfter: number | null = null;

    if (hash) {
      bucket = getBucket(limiter, hash);
    } else {
      if (response.status === 429) {
        isGlobalRateLimit = response.headers.has("X-RateLimit-Global");
        const isCloudFlare = !response.headers.get("via")?.includes(
          "1.1 google",
        );

        retryAfter = response.headers.has("Retry-After")
          ? parseFloat(response.headers.get("Retry-After")!) * 1000
          : null;

        // TODO(@zorbyte): Test what cloudflare rate limits actually look like.
        if (!isCloudFlare) {
          const body = await response.json();
          retryAfter = body.retry_after * 1000;
        }
      }

      if (!isGlobalRateLimit) {
        if (
          !(response.headers.has("X-RateLimit-Bucket") ||
            response.headers.has("X-RateLimit-Limit") ||
            response.headers.has("X-RateLimit-Reset-After"))
        ) {
          return limiter;
        }

        hash = response.headers.get("X-RateLimit-Bucket")!;
        const limit = parseInt(response.headers.get("X-RateLimit-Limit")!);
        const remaining = response.headers.has("X-RateLimit-Remaining")
          ? parseInt(response.headers.get("X-RateLimit-Remaining")!)
          : limit - 1;

        const period = parseFloat(
          response.headers.get("X-RateLimit-Reset-After")!,
        ) * 1000;

        bucket = Bucket.Create({
          limit,
          remaining,
          period,
          retryAfter,
        });
      }
    }

    return await produce(limiter, async (draft) => {
      draft.latency = latency;
      if (isGlobalRateLimit) {
        draft.global = {
          ...draft.global,
          retryAfter,
        };
      } else if (hash && bucket) {
        draft.routed.set(routeID, hash);
        draft.buckets.set(hash, bucket);
      }
    });
  }

  function getBucket(
    limiter: RateLimiter,
    hash: string,
  ) {
    if (!limiter.routed.has(hash)) throw new Error("Bucket hash not found");
    const bucket = limiter.buckets.get(hash)!;
    return bucket;
  }

  function getHash(
    limiter: RateLimiter,
    routeID: string,
  ) {
    const hash = limiter.routed.get(routeID);
    return hash;
  }

  export function produceRouteID(method: RequestMethod, path: PathLike) {
    const majorPath = path.replace(
      /\/([a-z-]+)\/(?:\d{16,19})/g,
      (match, segment) => {
        if (
          segment === "channels" || segment === "guilds" ||
          segment === "webhooks"
        ) {
          // Return the full match, which looks like `/{segment}/{id}`.
          return match;
        } else {
          // Strip out all IDs that are not for major segments.
          return `/${segment}/:id`;
        }
      },
    )
      // Strip out reaction as they fall under the same bucket.
      .replace(/\/reactions\/[^/]+/g, "/reactions/:id");

    /**
     * @license MIT
     * @author Discord.js Authors
     * https://github.com/discordjs/discord.js-modules/blob/7f1c9be817bbc6a4a11a726c952580dd3cb7b149/packages/rest/src/lib/RequestManager.ts#L283
     */

    let exceptions = "";

    // Hard-Code Old Message Deletion Exception (2 week+ old messages are a different bucket)
    // https://github.com/discord/discord-api-docs/issues/1295
    if (
      method === RequestMethod.DELETE &&
      majorPath === "/channels/:id/messages/:id"
    ) {
      const ID = /\d{16,19}$/.exec(path)![0];
      const timestamp = SnowflakeUtil.getTimestamp(ID);
      if (Date.now() - timestamp > 1000 * 60 * 60 * 24 * 14) {
        exceptions += "/Delete 2 week+ old messages";
      }
    }

    return `${method}:${majorPath}${exceptions}`;
  }

  function calculateLatency(response: Response) {
    const now = Date.now();
    const discordTime = response.headers.has("Date")
      ? Date.parse(response.headers.get("Date")!)
      : now;

    return Math.abs(now - discordTime);
  }
}
