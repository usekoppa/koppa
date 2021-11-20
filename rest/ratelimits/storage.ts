import { PathLike } from "../../utils/type_util.ts";
import { produce } from "../deps.ts";
import { RequestMethod } from "../method.ts";
// import { DiscordRequest } from "../request.ts";
import { RWMutex } from "../rwmutex.ts";
import { Bucket } from "./bucket.ts";
import { produceRouteID } from "./produce_route_ID.ts";

export interface BucketStorage {
  readonly mutex: RWMutex;
  readonly global: Bucket;
  // The route ID -> the hash.
  readonly routed: Map<string, string>;
  // hash -> bucket
  readonly buckets: Map<string, Bucket>;
  readonly latency: number;
}

export namespace BucketStorage {
  export function Create(): BucketStorage {
    return {
      mutex: new RWMutex(),
      // https://discord.com/developers/docs/topics/rate-limits#global-rate-limit
      global: Bucket.Create({
        // 50 requests per second.
        limit: 50,
        // Starts with 50 requests that can be reserved.
        remaining: 50,
        // 1 second in ms.
        period: 1000,
      }),
      routed: new Map(),
      buckets: new Map(),
      latency: 0,
    };
  }

  export async function limit(storage: BucketStorage, request: Request) {
    storage.mutex.lock();
    const global = await Bucket.reserve(storage.global, storage.latency);
    const routeID = produceRouteID(
      request.method as RequestMethod,
      new URL(request.url).pathname as PathLike,
    );

    const hash = getHash(storage, routeID);
    let bucket: Bucket;
    if (hash) {
      bucket = getBucket(storage, hash);
      bucket = await Bucket.reserve(bucket, storage.latency);
    }

    return produce(storage, (draft) => {
      draft.global = global;
      if (hash) draft.buckets.set(hash, bucket);
      draft.mutex.unlock();
    });
  }

  function getBucket(
    storage: BucketStorage,
    hash: string,
  ) {
    storage.mutex.readLock();
    const bucket = storage.buckets.get(hash)!;
    storage.mutex.readUnlock();
    return bucket;
  }

  export async function update(
    storage: BucketStorage,
    method: RequestMethod,
    response: Response,
  ) {
    const latency = calculateLatency(response);

    const routeID = produceRouteID(
      method,
      new URL(response.url).pathname as PathLike,
    );

    let hash = getHash(
      storage,
      routeID,
    );

    let bucket: Bucket;
    let isGlobalRateLimit = false;
    let retryAfter: number | null = null;

    if (hash) {
      bucket = getBucket(storage, hash);
    } else {
      if (response.status === 429) {
        isGlobalRateLimit = response.headers.has("X-RateLimit-Global");
        const isCloudFlare = !response.headers.get("via")?.includes(
          "1.1 google",
        );

        retryAfter = response.headers.has("Retry-After")
          ? parseFloat(response.headers.get("Retry-After")!) * 1000
          : null;

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
          return storage;
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

    storage.mutex.lock();
    return produce(storage, (draft) => {
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

      draft.mutex.unlock();
    });
  }

  function getHash(
    storage: BucketStorage,
    routeID: string,
  ) {
    storage.mutex.readLock();
    const hash = storage.routed.get(routeID);
    storage.mutex.readUnlock();
    return hash;
  }

  function calculateLatency(response: Response) {
    const now = Date.now();
    const discordTime = response.headers.has("Date")
      ? Date.parse(response.headers.get("Date")!)
      : now;

    return Math.abs(now - discordTime);
  }
}
