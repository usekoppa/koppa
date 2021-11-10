import { Permissions } from "../types/permissions.ts";
import { Snowflake } from "../types/snowflake.ts";
import { $TODO, Nullable } from "../_internals/utils.ts";
import { User } from "./user.ts";

export interface Channel extends Channel.Partial {
  guild_id?: Snowflake;
  position?: number;
  permissions_overwrites?: Channel.Overwrite[];
  name?: string;
  topic?: Nullable<string>;
  nsfw?: boolean;
  last_message_id?: Nullable<Snowflake>;
  bitrate?: number;
  user_limit?: number;
  rate_limit_per_user?: number;
  recipients?: User.Partial[];
  icon?: Nullable<string>;
  owner_id?: Snowflake;
  application_id?: Snowflake;
  parent_id?: Nullable<string>;
  last_pin_timestamp?: Nullable<string>;
  rtc_region?: Nullable<string>;
  video_quality_mode?: Channel.VideoQualityMode;
  message_count?: number;
  thread_metadata?: $TODO;
  member?: $TODO;
  default_auto_archive_duration?: number;
  permissions?: Permissions.Raw;
}

export namespace Channel {
  export const enum Type {
    GuildText = 0,
    DM = 1,
    GuildVoice = 2,
    GroupDM = 3,
    GuildCategory = 4,
    GuildNews = 5,
    GuildStore = 6,
    GuildNewsThread = 10,
    GuildPublicThread = 11,
    GuildPrivateThread = 12,
    GuildStageVoice = 13,
  }

  export const enum VideoQualityMode {
    Auto = 1,
    Full = 2,
  }

  export interface Partial {
    id: Snowflake;
    type: Channel.Type;
  }
  export namespace DM {
    export type Channel = $TODO;
    export type GroupDM = $TODO;
  }

  export interface Overwrite {
    id: Snowflake;
    type: Overwrite.Type;
    allow: Permissions.Raw;
    deny: Permissions.Raw;
  }

  export namespace Overwrite {
    export const enum Type {
      Role = 0,
      Member = 1,
    }
  }

  export type Thread = $TODO;
  export namespace Thread {}
}
