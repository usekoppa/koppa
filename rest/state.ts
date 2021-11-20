import { Authorisation, AuthorisationType } from "./authorisation.ts";
import { RateLimiter } from "./rate_limits/rate_limiter.ts";
import { DiscordRequest } from "./request.ts";

export interface State {
  authorisation: Authorisation;
  limiter: RateLimiter;
}

export namespace State {
  export function Create(authorisation: Authorisation): Readonly<State>;
  export function Create(token: string): Readonly<State>;
  export function Create(
    tokenOrAuth: string | Authorisation,
  ) {
    const authorisation = typeof tokenOrAuth === "string"
      ? { token: tokenOrAuth, type: "Bot" as AuthorisationType }
      : tokenOrAuth;

    const state: Readonly<State> = Object.freeze({
      authorisation,
      limiter: RateLimiter.Create(),
    });

    return state;
  }

  export async function execute(state: State, discordRequest: DiscordRequest) {
    const headers = new Headers();
    headers.set(
      "Authorization",
      `${state.authorisation.type} ${state.authorisation.token}`,
    );

    headers.set(
      "User-Agent",
      "DiscordBot (https://github.com/usekoppa, Koppa v0.0.1)",
    );

    if (discordRequest.auditLogReason) {
      headers.set("X-AuditLog-Reason", discordRequest.auditLogReason);
    }

    let body = discordRequest.attachments
      ? new FormData()
      : JSON.stringify(discordRequest.body);

    if (discordRequest.attachments) {
      const form = body as FormData;
      for (const { name, blob } of discordRequest.attachments) {
        form.set(name, blob);
      }
      body = form;
    }

    const request = new Request(discordRequest.path, {
      method: discordRequest.method,
      headers,
      body,
    });

    let limiter = await RateLimiter.limit(state.limiter, request);
    const response = await fetch(request);
    limiter = await RateLimiter.update(
      limiter,
      discordRequest.method,
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
}
