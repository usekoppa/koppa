import { BucketStorage } from "./ratelimits/storage.ts";
import { DiscordRequest } from "./request.ts";

export interface State {
  authorisation: Authorisation;
  storage: BucketStorage;
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
      storage: BucketStorage.Create(),
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

    let storage = await BucketStorage.limit(state.storage, request);
    const response = await fetch(request);
    storage = await BucketStorage.update(
      storage,
      discordRequest.method,
      response,
    );

    return {
      body: await response.json(),
      state: {
        ...state,
        storage,
      },
    };
  }
}

export type AuthorisationType = "Bot" | "Bearer";

export interface Authorisation {
  token: string;
  type: AuthorisationType;
}
