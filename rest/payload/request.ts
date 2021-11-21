import { PathLike } from "../../utils/type_util.ts";
import { contentType } from "../deps.ts";
import { Authorisation } from "./authorisation.ts";
import { RequestMethod } from "./method.ts";

export interface RESTPayload<
  Body extends Record<string, unknown> | undefined = undefined,
> {
  method: RequestMethod;
  path: PathLike;
  authorisation: Authorisation;
  body?: Body | FormData;
  auditLogReason?: string;
  attachments?: PayloadAttachment[];
}

export namespace RESTPayload {
  export function produceRequest(payload: RESTPayload) {
    const headers = new Headers();
    headers.set(
      "Authorization",
      `${payload.authorisation.scheme} ${payload.authorisation.token}`,
    );

    headers.set(
      "User-Agent",
      "DiscordBot (https://github.com/usekoppa/koppa, 0.0.1)",
    );

    if (payload.auditLogReason) {
      headers.set(
        "X-AuditLog-Reason",
        encodeURIComponent(payload.auditLogReason),
      );
    }

    let body: string | undefined | FormData = payload.body instanceof FormData
      ? payload.body
      : payload.attachments
      ? new FormData()
      : payload.body;

    if (body instanceof FormData) {
      if (payload.attachments) {
        let i = 0;
        for (let { name, blob } of payload.attachments) {
          if (blob.type === "") {
            const type = contentType(name);
            if (type) blob = new Blob([blob], { type });
          }

          body.append(`files[${i}]`, blob, name);
        }

        if (payload.body) {
          body.append(
            "payload_json",
            new Blob([], { type: "application/json" }),
          );
        }
      }
    } else if (body) {
      headers.set("Content-Type", "application/json");
      body = JSON.stringify(body);
    }

    return new Request(payload.path, {
      method: payload.method,
      headers,
      body,
    });
  }
}

export interface PayloadAttachment {
  name: string;
  blob: Blob;
}
