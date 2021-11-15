import { ISO8601, Snowflake } from "../types/mod.ts";
import { Nullable } from "../_internals/utils.ts";
import { User } from "../users/mod.ts";
import { ChannelType } from "./channel_type.ts";
import { PermissionOverwrite } from "./overwrites/mod.ts";
import { ThreadMember, ThreadMetadata, ThreadType } from "./threads/mod.ts";
import { VideoQualityMode } from "./video_quality_mode.ts";
import { SerialisedPermissions } from "../permissions/mod.ts";

/**
 * Represents a guild or DM channel within Discord.
 *
 * https://discord.com/developers/docs/resources/channel#channel-object
 */
export interface Channel<Type extends ChannelType = ChannelType>
  extends Channel.Partial<Type> {
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
  recipients?: Omit<User.Partial, "flags">[];
  icon?: Nullable<string>;
  owner_id?: Snowflake;
  application_id?: Snowflake;
  parent_id?: Nullable<string>;
  last_pin_timestamp?: Nullable<ISO8601>;
  rtc_region?: Nullable<string>;
  video_quality_mode?: VideoQualityMode;
  message_count?: number;
  member_count?: number;
  thread_metadata?: Type extends ThreadType ? ThreadMetadata<Type>
    : ThreadMetadata;
  member?: ThreadMember;
  default_auto_archive_duration?: 60 | 1440 | 4320 | 10080;
  permissions?: SerialisedPermissions;
}

/** https://discord.com/developers/docs/resources/channel#channels-resource */
export namespace Channel {
  export interface Partial<Type extends ChannelType = ChannelType> {
    id: Snowflake;
    type: Type;
  }

  /** https://discord.com/developers/docs/resources/channel#channel-object-example-dm-channel */
  export type DM =
    & Required<
      Pick<
        Channel<ChannelType.DM>,
        "id" | "type" | "last_message_id" | "recipients"
      >
    >
    & { recipients: [Omit<User.Partial, "flags">] };

  export namespace DM {
    /** https://discord.com/developers/docs/resources/channel#channel-object-example-group-dm-channel */
    export type Group =
      & Omit<DM, "recipients" | "type">
      & Required<
        Pick<
          Channel<ChannelType.GroupDM>,
          "type" | "recipients" | "icon" | "name" | "owner_id"
        >
      >;
  }

  export namespace Guild {
    /** https://discord.com/developers/docs/resources/channel#channel-object-example-guild-text-channel */
    export type Text = _GuildChannel<ChannelType.GuildText>;

    /**
     * Guild News Channel
     * Bots can post or publish messages in this type of channel if they have the proper permissions.
     * These are called "Announcement Channels" in the client.
     *
     * https://discord.com/developers/docs/resources/channel#channel-object-example-guild-news-channel
     */
    export type News = _GuildChannel<ChannelType.GuildNews>;

    /** https://discord.com/developers/docs/resources/channel#channel-object-example-store-channel */
    export type Store = _BaseGuildChannel<ChannelType.GuildStore> & {
      nsfw: false;
    };

    /** https://discord.com/developers/docs/resources/channel#channel-object-example-channel-category */
    export type Category =
      & _BaseGuildChannel<ChannelType.GuildCategory>
      & {
        parent_id: null;
        nsfw: false;
      };

    /** https://discord.com/developers/docs/resources/channel#channel-object-example-guild-voice-channel */
    export type Voice =
      & _BaseGuildChannel<ChannelType.GuildVoice>
      & Pick<Channel, "rtc_region" | "user_limit" | "bitrate">;

    export type Stage = Voice & {
      nsfw: false;
      type: ChannelType.GuildStageVoice;
    };

    export type _GuildChannelTypes =
      | ChannelType.GuildText
      | ChannelType.GuildVoice
      | ChannelType.GuildCategory
      | ChannelType.GuildNews
      | ChannelType.GuildStore
      | ChannelType.GuildNewsThread
      | ChannelType.GuildPublicThread
      | ChannelType.GuildPrivateThread
      | ChannelType.GuildStageVoice;

    type _GuildChannel<Type extends _GuildChannelTypes> = Required<
      Pick<
        Channel<Type>,
        | "id"
        | "guild_id"
        | "name"
        | "type"
        | "position"
        | "permissions_overwrites"
        | "rate_limit_per_user"
        | "nsfw"
        | "topic"
        | "last_message_id"
        | "parent_id"
        | "default_auto_archive_duration"
      >
    >;

    type _BaseGuildChannel<Type extends _GuildChannelTypes> = Required<
      Pick<
        Channel<Type>,
        | "id"
        | "permissions_overwrites"
        | "name"
        | "guild_id"
        | "type"
        | "position"
        | "nsfw"
        | "parent_id"
      >
    >;
  }

  export namespace REST {
  }
}
