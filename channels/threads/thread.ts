import { Channel } from "../channel.ts";
import { ThreadMetadata } from "./thread_metadata.ts";
import { ThreadType } from "./thread_type.ts";

export type Thread<Type extends ThreadType = ThreadType.Public> =
  & Required<
    Pick<
      Channel,
      | "name"
      | "last_message_id"
      | "last_pin_timestamp"
      | "rate_limit_per_user"
      | "owner_id"
      | "parent_id"
      | "guild_id"
      | "member"
      | "message_count"
      | "member_count"
    >
  >
  & Channel.Partial<Type>
  & { thread_metadata: ThreadMetadata<Type> };

export namespace Thread {
  export type Public = Thread<ThreadType.Public>;
  export type Private = Thread<ThreadType.Private>;
}
