import { PathLike } from "../utils/type_util.ts";
import { RequestMethod } from "./method.ts";

export interface DiscordRequest {
  method: RequestMethod;
  path: PathLike;
  body?: unknown;
  auditLogReason?: string;
  attachments?: RequestAttachment[];
}

export interface RequestAttachment {
  name: string;
  blob: Blob;
}
