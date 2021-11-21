import { Authorisation } from "./payload/authorisation.ts";
import { RESTPayload } from "./payload/request.ts";
import { RateLimiter } from "./rate_limits/rate_limiter.ts";

export interface State {
  limiter: RateLimiter;
  opts: StateOptions;
}

export namespace State {
  export function Create(
    opts: CreateOptions & { authorisation: Authorisation },
  ): Readonly<State>;
  export function Create(
    token: string,
    opts?: CreateOptions & {
      authorisation?: Partial<Pick<Authorisation, "scheme">>;
    },
  ): Readonly<State>;
  export function Create(
    tokenOrOpts: string | (CreateOptions & { authorisation: Authorisation }),
    opts?: CreateOptions,
  ) {
    const authorisation: Authorisation = typeof tokenOrOpts === "string"
      ? { token: tokenOrOpts, scheme: opts?.authorisation?.scheme ?? "Bot" }
      : tokenOrOpts.authorisation;

    const stateOpts: StateOptions = {
      authorisation,
      // The maximum amount of times we should retry a request.
      maxRetries: opts?.maxRetries ?? 10,
    };

    const state: Readonly<State> = Object.freeze({
      limiter: RateLimiter.Create(),
      opts: stateOpts,
    });

    return state;
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

    let limiter = await RateLimiter.limit(state.limiter, request);
    const response = await fetch(request);
    limiter = await RateLimiter.update(
      limiter,
      payload.method,
      response,
    );

    return {
      body: await response.json(),
      state: {
        ...state,
        limiter,
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
