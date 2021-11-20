import { Channel } from "../channels/channel.ts";
import { GuildMember } from "../guilds/member.ts";
import { Message } from "../messages/message.ts";
import { Role } from "../roles/role.ts";
import { Snowflake } from "../types/snowflake.ts";
import { User } from "../users/user.ts";

export interface ResolvedData {
  users?: Record<Snowflake, User.Partial>;
  members?: Record<Snowflake, Omit<GuildMember, "user" | "deaf" | "mute">>;
  roles?: Record<Snowflake, Role>;
  channels?: Record<
    Snowflake,
    Pick<
      Channel,
      "id" | "name" | "type" | "permissions" | "thread_metadata" | "parent_id"
    >
  >;
  messages?: Record<Snowflake, Message>;
}
