import { RWMutex } from "../utils/mutex/mod.ts";
import { Authorisation } from "./payload/authorisation.ts";
import { RESTPayload } from "./payload/request.ts";
import { RateLimiter } from "./rate_limits/rate_limiter.ts";

export interface State {
  limiterMutex: RWMutex;
  limiter: RateLimiter;
  opts: Readonly<StateOptions>;
}

export namespace State {
  export function Create(
    opts: CreateOptions & { authorisation: Authorisation },
  ): State;
  export function Create(
    token: string,
    opts?: CreateOptions & {
      authorisation?: Partial<Pick<Authorisation, "scheme">>;
    },
  ): State;
  export function Create(
    tokenOrOpts: string | (CreateOptions & { authorisation: Authorisation }),
    opts?: CreateOptions,
  ) {
    const authorisation: Authorisation = typeof tokenOrOpts === "string"
      ? { token: tokenOrOpts, scheme: opts?.authorisation?.scheme ?? "Bot" }
      : tokenOrOpts.authorisation;

    const stateOpts: StateOptions = Object.freeze({
      authorisation,
      // The maximum amount of times we should retry a request.
      maxRetries: opts?.maxRetries ?? 10,
    });

    return {
      limiter: RateLimiter.Create(),
      opts: stateOpts,
    };
  }

  type CreateOptions = Partial<StateOptions> & {
    authorisation?: Partial<Authorisation>;
  };

  export async function dispatch(
    state: State,
    opts: DispatchOptions,
  ) {
    const payload: RESTPayload = {
      ...opts,
      authorisation: opts.authorisation ?? state.opts.authorisation,
    };

    const request = RESTPayload.produceRequest(payload);
    await state.limiterMutex.lock();
    let limiter = await RateLimiter.limit(state.limiter, request);

    const response = await fetch(request);
    limiter = await RateLimiter.update(
      limiter,
      payload.method,
      response,
    );

    state.limiterMutex.unlock();
    return {
      body: await response.json(),
      state: {
        ...state,
        limiter: state.limiter,
      },
    };
  }

  type DispatchOptions =
    & Omit<RESTPayload, "authorisation">
    & Partial<Pick<RESTPayload, "authorisation">>;
}

interface StateOptions {
  authorisation: Authorisation;
  maxRetries: number;
}
