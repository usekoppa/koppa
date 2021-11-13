import { ISO8601, Snowflake } from "../types/mod.ts";
import { $TODO, Nullable } from "../_internals/utils.ts";
import { User } from "../users/mod.ts";
import { ChannelType } from "./channel_type.ts";
import { PermissionOverwrite } from "./overwrites/mod.ts";
import { ThreadMember, ThreadMetadata } from "./threads/mod.ts";
import { VideoQualityMode } from "./video_quality_mode.ts";
import { Permissions } from "../permissions/mod.ts";

export interface Channel extends Channel.Partial {
  guild_id?: Snowflake;
  position?: number;
  permissions_overwrites?: PermissionOverwrite[];
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
  last_pin_timestamp?: Nullable<ISO8601>;
  rtc_region?: Nullable<string>;
  video_quality_mode?: VideoQualityMode;
  message_count?: number;
  member_count?: number;
  thread_metadata?: ThreadMetadata;
  member?: ThreadMember;
  default_auto_archive_duration?: number;
  permissions?: Permissions.Raw;
}

export namespace Channel {
  export interface Partial<Type extends ChannelType = ChannelType> {
    id: Snowflake;
    type: Type;
  }

  export namespace DM {
    export type Channel = $TODO;
    export type GroupDM = $TODO;
  }

  export namespace REST {}
}
