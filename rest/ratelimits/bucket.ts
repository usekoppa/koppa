import { Nullable } from "../../utils/type_util.ts";

export interface Bucket {
  /** How many request reservations are remaining. */
  readonly remaining: number;
  /** The maximum number of requests that can take place in this period between the next reset. */
  readonly limit: number;
  /** The period until the bucket resets in ms. */
  readonly period: number;
  /** Time that the reset last happened at. If the bucket has never been reset before, it is the creation time. */
  readonly lastResetAt: number;
  /** Time that the last reservation occurred at. */
  readonly lastReservationAt: number;

  /**
   * If discord issues us a rate limit directly,
   *  we should use that value instead for the next reset.
   */
  readonly retryAfter: Nullable<number>;
}

export namespace Bucket {
  interface CreateOptions {
    /** The maximum amount of request reservations that can be made within this period. */
    limit: number;
    /** The remaining amount of request reservations that can be made. */
    remaining: number;
    /** The period in which requests can be made before a bucket reset. */
    period: number;
    retryAfter?: number | null;
  }

  export function Create(opts: CreateOptions): Bucket {
    return Object.freeze({
      ...opts,
      lastResetAt: Date.now(),
      retryAfter: opts.retryAfter ?? null,
      lastReservationAt: Date.now(),
    });
  }

  export async function reserve(bucket: Bucket, latency = 0): Promise<Bucket> {
    let remaining = bucket.remaining;
    let lastResetAt = bucket.lastResetAt;

    // If we got rate-limited or we ran out of requests for this period:
    if (!remaining || bucket.retryAfter) {
      const resetAt = bucket.retryAfter
        ? bucket.lastReservationAt + bucket.retryAfter + latency
        : bucket.lastResetAt + bucket.period;

      const now = Date.now();
      if (resetAt > now) {
        const timeUntilReset = resetAt - Date.now();
        await wait(timeUntilReset);
      }

      remaining = bucket.limit;
    } else {
      remaining -= 1;
    }

    return {
      ...bucket,
      lastReservationAt: Date.now(),
      lastResetAt,
      remaining,
      retryAfter: null,
    };
  }

  function wait(time: number) {
    return new Promise<void>((resolve) => {
      setTimeout(resolve, time);
    });
  }
}
