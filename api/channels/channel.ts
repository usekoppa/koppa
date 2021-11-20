import { ISO8601, Snowflake } from "../types/mod.ts";
import { Nullable } from "../_internals/utils.ts";
import { User } from "../users/mod.ts";
import { ChannelType } from "./channel_type.ts";
import { PermissionOverwrite } from "../permissions/overwrites/overwrite.ts";
import { ThreadMember, ThreadMetadata, ThreadType } from "../threads/mod.ts";
import { VideoQualityMode } from "./video_quality_mode.ts";
import { Permission, SerialisedPermissions } from "../permissions/mod.ts";

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
    name?: string;
  }

  /** https://discord.com/developers/docs/resources/channel#channel-object-example-dm-channel */
  export type DM =
    & Required<
      Pick<
        Channel<ChannelType.DM>,
        "id" | "type" | "last_message_id" | "recipients"
      >
    >
    & { recipients: [User.Partial] };

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

  export type Guild =
    & _GuildChannel
    & Guild.Voice;
  // | Guild.Category
  // | Guild.News
  // | Guild.Stage
  // | Guild.Store
  //   & Guild.Text
  //   & Guild.Voice;

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
  }

  type _GuildChannelTypes =
    | ChannelType.GuildText
    | ChannelType.GuildVoice
    | ChannelType.GuildCategory
    | ChannelType.GuildNews
    | ChannelType.GuildStore
    | ChannelType.GuildNewsThread
    | ChannelType.GuildPublicThread
    | ChannelType.GuildPrivateThread
    | ChannelType.GuildStageVoice;

  type _GuildChannel<Type extends _GuildChannelTypes = _GuildChannelTypes> =
    & Required<
      Pick<
        Channel<Type>,
        | "rate_limit_per_user"
        | "topic"
        | "last_message_id"
        | "default_auto_archive_duration"
      >
    >
    & _BaseGuildChannel<Type>;

  type _BaseGuildChannel<
    Type extends _GuildChannelTypes = _GuildChannelTypes,
  > = Required<
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

  export namespace REST {
    export namespace GET {
      /**
       * Get Channel
       * GET `/channels/{channel.id}`
       *
       * Get a channel by ID. Returns a channel object.
       * If the channel is a thread, a thread member object is included in the returned result.
       *
       * https://discord.com/developers/docs/resources/channel#get-channel
       */
      export namespace GetChannel {
        export type Route<ChannelID extends Snowflake = Snowflake> =
          _ChannelRoute<ChannelID>;

        export const Route = _ChannelRoute;

        export type Response = Channel;
      }

      export namespace GetGuildChannels {
        export type Route<ChannelID extends Snowflake = Snowflake> =
          _GuildChannelsRoute<ChannelID>;

        export const Route = _GuildChannelsRoute;
      }
    }

    export namespace PATCH {
      export namespace ModifyChannel {}

      export namespace ModifyGuildChannelPositions {
        export type Route<ChannelID extends Snowflake = Snowflake> =
          _GuildChannelsRoute<ChannelID>;

        export const Route = _GuildChannelsRoute;
      }
    }

    export namespace PUT {
      export namespace GroupDMAddRecipient {}
    }

    export namespace POST {
      // export namespace CreateGuildChannel {
      //   export type Route<
      //     GuildID extends Snowflake = Snowflake,
      //     ChannelID extends Snowflake = Snowflake,
      //   > = `/guilds/${GuildID}/channels/${ChannelID}`;

      //   export function Route<
      //     GuildID extends Snowflake,
      //     ChannelID extends Snowflake,
      //   >(
      //     guildID: GuildID,
      //     channelID: ChannelID,
      //   ): Route<GuildID, ChannelID> {
      //     return `/guilds/${guildID}/channels/${channelID}`;
      //   }
      // }

      /**
       * Create Guild Channel
       * POST `/guilds/{guild.id}/channels`
       *
       * Create a new channel object for the guild.
       * Requires the `MANAGE_CHANNELS` permission.
       * If setting permission overwrites, only permissions your bot has in the guild can be allowed/denied.
       * Setting `MANAGE_ROLES` permission in channels is only possible for guild administrators.
       * Returns the new channel object on success.
       * Fires a Channel Create Gateway event.
       *
       * All parameters to this endpoint are optional excluding `name`.
       *
       * This endpoint supports the `X-Audit-Log-Reason` header.
       *
       * https://discord.com/developers/docs/resources/guild#create-guild-channel
       */
      export namespace CreateGuildChannel {
        export type Route<GuildID extends Snowflake = Snowflake> =
          _GuildChannelsRoute<GuildID>;

        export const Route = _GuildChannelsRoute;

        export type Permissions = [
          Permission.ManageChannels,
          Permission.Administrator?,
        ];

        export function Permissions<PO extends boolean = false>(
          hasGuildRolesPermissionOverwrite = false as PO,
        ) {
          const permissions: Permissions = [Permission.ManageChannels];
          if (hasGuildRolesPermissionOverwrite) {
            permissions.push(Permission.Administrator);
          }

          return permissions as PO extends true ? Required<Permissions>
            : [Permission.ManageChannels];
        }

        export type Body =
          & Required<Pick<Guild, "name">>
          & Pick<
            Guild,
            | "type"
            | "topic"
            | "bitrate"
            | "user_limit"
            | "rate_limit_per_user"
            | "position"
            | "permissions_overwrites"
            | "parent_id"
            | "nsfw"
          >;
      }

      export namespace TriggerTypingIndicator {}

      export namespace FollowNewsChannel {}
    }

    export namespace DELETE {
      export namespace DeleteOrCloseChannel {}

      export namespace GroupDMRemoveRecipient {}
    }

    type _ChannelRoute<ChannelID extends Snowflake = Snowflake> =
      `/channels/${ChannelID}`;

    function _ChannelRoute<ChannelID extends Snowflake>(
      channelID: ChannelID,
    ): _ChannelRoute<ChannelID> {
      return `/channels/${channelID}`;
    }

    type _GuildChannelsRoute<
      GuildID extends Snowflake = Snowflake,
    > = `/guilds/${GuildID}/channels`;

    function _GuildChannelsRoute<
      GuildID extends Snowflake,
      ChannelID extends Snowflake,
    >(
      guildID: GuildID,
    ): _GuildChannelsRoute<GuildID> {
      return `/guilds/${guildID}/channels`;
    }
  }
}
