import { Snowflake } from "../types/snowflake.ts";
import { Nullable } from "../_internals/utils.ts";

export interface Attachment {
  /** Attachment ID. */
  id: Snowflake;
  /** Name of file attached. */
  filename: string;
  /** Description for the file. */
  description?: string;
  /** The attachment's media type. */
  content_type?: `${string}/${string}`;
  /** The size of the file (in bytes). */
  size: number;
  /** The source URL of the file. */
  url: string;
  /** A proxied URL of the file. */
  proxy_url: string;
  /** Height of the file (if it's an image). */
  height?: Nullable<number>;
  /** Width of the file (if it's an image). */
  width?: Nullable<number>;
  /** Whether this attachment is ephemeral. */
  ephemeral?: boolean;
}
