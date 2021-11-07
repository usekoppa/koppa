import { Snowflake } from "../../types/snowflake.ts";
import { $TODO, Nullable } from "../../_internals/utils.ts";
import { Channel } from "../channel.ts";
import { Guild as GuildNS } from "./guild.ts";
import { Sticker as StickerNS } from "./sticker.ts";
import { User } from "../user.ts";
import { Webhook } from "../webhook.ts";

/**
 * An audit log object associated with a guild.
 * 
 * @see {@link https://discord.com/developers/docs/resources/audit-log#audit-log-object-audit-log-structure | Audit Log Structure}
 */
export interface AuditLog {
  /**
   * A list of audit log entries.
   */
  audit_log_entries: AuditLog.Entry[];

  /**
   * The integrations for this guild.
   */
  integrations: GuildNS.Integration[];
  threads: Channel.Thread[];
  users: User[];
  webhooks: Webhook;
}

/**
 * Whenever an admin action is performed on the API, an entry is added to the respective guild's audit log.
 *
 * @remarks
 * You can specify the reason by attaching the X-Audit-Log-Reason request header.
 * This header supports url encoded UTF-8 characters.
 *
 * @see {@link https://discord.com/developers/docs/resources/audit-log | Audit Logs Resource}
 */
export namespace AuditLog {
  /**
   * An audit log event.
   *
   * @remarks
   * Audit log entries are associated with a certain type of event.
   *
   * @see {@link https://discord.com/developers/docs/resources/audit-log#audit-log-entry-object-audit-log-events | Audit Log Events}
   */
  export const enum Event {
    GuildUpdate = 1,
    ChannelCreate = 10,
    ChannelUpdate = 11,
    ChannelDelete = 12,
    ChannelOverwriteCreate = 13,
    ChannelOverwriteUpdate = 14,
    ChannelOverwriteDelete = 15,
    MemberKick = 20,
    MemberPrune = 21,
    MemberBanAdd = 22,
    MemberBanRemove = 23,
    MemberUpdate = 24,
    MemberRoleUpdate = 25,
    MemberMove = 26,
    MemberDisconnect = 27,
    BotAdd = 28,
    RoleCreate = 30,
    RoleUpdate = 31,
    RoleDelete = 32,
    InviteCreate = 40,
    InviteUpdate = 41,
    InviteDelete = 42,
    WebhookCreate = 50,
    WebhookUpdate = 51,
    WebhookDelete = 52,
    EmojiCreate = 60,
    EmojiUpdate = 61,
    EmojiDelete = 62,
    MessageDelete = 72,
    MessageBulkDelete = 73,
    MessagePin = 74,
    MessageUnpin = 75,
    IntegrationCreate = 80,
    IntegrationUpdate = 81,
    IntegrationDelete = 82,
    StageInstanceCreate = 83,
    StageInstanceUpdate = 84,
    StageInstanceDelete = 85,
    StickerCreate = 90,
    StickerUpdate = 91,
    StickerDelete = 92,
    ThreadCreate = 110,
    ThreadUpdate = 111,
    ThreadDelete = 112,
  }

  /**
   * An entry into a guild's audit log.
   */
  export type Entry<Type = unknown> = Type extends Event ? 
    & _Entry<Type>
    & (Type extends keyof _OptionsMapper
      ? Required<Pick<_Entry<Type>, "options">>
      : never)
    : _Entry<Event>;

  /**
   * Extra options for an audit log entry depending on the action.
   * @see {@link https://discord.com/developers/docs/resources/audit-log#audit-log-entry-object-optional-audit-entry-info | Optional Audit Entry Info}
   */
  export interface Options {
    channel_id: Snowflake.Raw;
    count: string;
    delete_member_days: string;

    /**
     * The ID of the entry.
     */
    id: Snowflake.Raw;

    /**
     * The number of members removed by a prune.
     */
    members_removed: string;

    /**
     * ID of the message that was pinned/unpinned.
     */
    message_id: Snowflake.Raw;
    role_name?: string;
    type?: Options.ChannelOverwrite.OverwrittenEntityType;
  }

  export namespace Options {
    export type ChannelOverwrite =
      | ChannelOverwrite.RoleChannelOverwrite
      | ChannelOverwrite.MemberChannelOverwrite;

    export namespace ChannelOverwrite {
      export const enum OverwrittenEntityType {
        Role = "0",
        Member = "1",
      }

      export type RoleChannelOverwrite = _ChannelOverwrite<
        OverwrittenEntityType.Role
      >;

      export type MemberChannelOverwrite = Omit<
        _ChannelOverwrite<OverwrittenEntityType.Member>,
        "role_name"
      >;

      type _ChannelOverwrite<
        Type extends OverwrittenEntityType = OverwrittenEntityType,
      > =
        & Omit<
          Required<
            Pick<
              Options,
              "id" | "channel_id" | "role_name" | "type"
            >
          >,
          "type"
        >
        & {
          type: Type;
        };
    }

    export type MemberDisconnect = Required<Pick<Options, "count">>;
    export type MemberMove = Required<Pick<Options, "channel_id" | "count">>;
    export type MemberPrune = Required<
      Pick<Options, "delete_member_days" | "members_removed">
    >;

    export type MessageBulkDelete = Required<Pick<Options, "count">>;
    export type MessageDelete = Required<Pick<Options, "channel_id" | "count">>;
    export type MessagePinAndUnpin = Required<
      Pick<Options, "channel_id" | "message_id">
    >;

    export type StageInstanceAction = Required<Pick<Options, "channel_id">>;
  }

  export interface Change {
    new_value?: $TODO;
    old_value?: $TODO;
    key: string;
  }

  export namespace Change {
    export namespace Key {
      export namespace Guild {
        export namespace AFK {
          /**
           * AFK channel changed.
           */
          export type Channel = Snowflake.Raw;
          export const Channel = "afk_channel_id";

          /**
           * AFK timeout duration changed.
           */
          export type Timeout = number;
          export const Timeout = "afk_timeout";
        }

        /**
         * The ID changed for a guild.
         */
        export type ID = Snowflake.Raw;
        export const ID = "id";

        /**
         * The guild banner was changed.
         */
        export type Banner = string;
        export const Banner = "banner_hash";

        /**
         * Default message notification level was changed.
         */
        export type DefaultMessageNotificationsLevel =
          GuildNS.DefaultMessageNotificationLevel;

        export const DefaultMessageNotificationsLevel =
          "default_message_notifications";

        /**
         * Discovery splash image was changed.
         */
        export type DiscoverySplash = string;
        export const DiscoverySplash = "discovery_splash_hash";

        /**
         * The settings for explicit content filtering were changed.
         */
        export type ExplicitContentFilter = GuildNS.ExplicitContentFilterLevel;
        export const ExplicitContentFilter = "explicit_content_filter";

        /**
         * Icon was changed for a guild.
         */
        export type Icon = string;
        export const Icon = "icon_hash";

        export type MFALevel = GuildNS;
      }

      export namespace Integration {
        /**
         * The ID changed for a integration.
         */
        export type ID = Snowflake.Raw;
        export const ID = "id";

        /**
         * Emoticons for an integration were enabled or disabled.
         */
        export type Emoticons = boolean;
        export const Emoticons = "enable_emoticons";

        /**
         * Integration subscription expiry behaviour was changed.
         */
        export type ExpireBehavior = number;
        export const ExpireBehavior = "expire_behavior";

        /**
         * Integration subscription expiry behaviour was changed.
         */
        export type ExpireBehaviour = ExpireBehavior;
        export const ExpireBehaviour = ExpireBehavior;

        /**
         * An integration's grace period length was changed for subscription expiries.
         */
        export type ExpiryGracePeriod = number;
        export const ExpiryGracePeriod = "expire_grace_period";
      }

      export namespace Channel {
        /**
         * The ID changed for a channel.
         */
        export type ID = Snowflake.Raw;
        export const ID = "id";

        /**
         * A bot or webhook was added to the channel.
         */
        export type Application = Snowflake.Raw;
        export const Application = "application_id";

        /**
         * Voice channel bitrate was changed.
         */
        export type Bitrate = number;
        export const Bitrate = "bitrate";

        /**
         * The default auto-archive duration for newly created thread was changed.
         */
        export type DefaultThreadAutoArchiveDuration = number;
        export const DefaultThreadAutoArchiveDuration =
          "default_auto_archive_duration";

        /**
         * The description for the channel was changed.
         */
        export type Description = string;
        export const Description = "description";
      }

      export namespace Thread {
        /**
         * The ID changed for a thread.
         */
        export type ID = Snowflake.Raw;
        export const ID = "id";

        /**
         * Thread was archived or unarchived.
         */
        export type Archived = boolean;
        export const Archived = "archived";

        /**
         * Auto archive duration was changed.
         */
        export type AutoArchiveDuration = number;
        export const AutoArchiveDuration = "auto_archive_duration";

        /**
         * A thread was unlocked or locked.
         */
        export type Lock = boolean;
        export const Lock = "locked";
      }

      export namespace Invite {
        /**
         * The ID changed for a invite.
         */
        export type ID = Snowflake.Raw;
        export const ID = "id";

        /**
         * The channel an invite was made for was changed.
         */
        export type Channel = Snowflake.Raw;
        export const Channel = "channel_id";

        /**
         * Invite code was changed.
         */
        export type Code = string;
        export const Code = "code";

        /**
         * The inviter changed for an invite.
         */
        export type Inviter = Snowflake.Raw;
        export const Inviter = "inviter_id";

        /**
         * The maximum age was changed for an invite.
         */
        export type MaxAge = number;
        export const MaxAge = "max_age";

        /**
         * The maximum number of uses was changed for an invite.
         */
        export type MaxUses = number;
        export const MaxUses = "max_uses";
      }

      export namespace Sticker {
        /**
         * The ID changed for a sticker.
         */
        export type ID = Snowflake.Raw;
        export const ID = "id";

        /**
         * __An unknown and poorly documented audit log change key.__
         */
        export type Asset = "";
        export const Asset = "asset";

        /**
         * Availability of a sticker was changed.
         */
        export type Available = boolean;
        export const Available = "available";

        /**
         * The description for the sticker was changed.
         */
        export type Description = string;
        export const Description = "description";

        /**
         * Format type of sticker changed.
         */
        export type Format = StickerNS.Format;
        export const Format = "format_type";

        /**
         * The guild the sticker is in was changed.
         */
        export type Guild = Snowflake.Raw;
        export const Guild = "guild_id";
      }

      export namespace User {
        /**
         * The ID changed for a user.
         */
        export type ID = Snowflake.Raw;
        export const ID = "id";

        /**
         * The avatar of a user was changed.
         */
        export type Avatar = string;
        export const Avatar = "avatar_hash";

        /**
         * User was server deafened or undeafened.
         */
        export type Deaf = boolean;
        export const Deaf = "deaf";
      }

      /**
       * A role was been modified/created/deleted.
       */
      export namespace Role {
        /**
         * The ID changed for a role.
         */
        export type ID = Snowflake.Raw;
        export const ID = "id";

        /**
         * The name was changed for a role.
         */
        export type Name = string;
        export const Name = "name";

        /**
         * A role was added to a server.
         */
        export type Add = GuildNS.Role.Partial;
        export const Add = "$add";

        /**
         * A role was removed from a server.
         */
        export type Remove = GuildNS.Role.Partial;
        export const Remove = "$remove";

        /**
         * A permission on a text or voice channel was allowed for a role.
         */
        export type AllowChannelPermission = string;
        export const AllowChannelPermission = "allow";

        /**
         * A permission on a text or voice channel was denied for a role.
         */
        export type DenyChannelPermission = string;
        export const DenyChannelPermission = "deny";

        /**
         * The colour was changed for a role.
         */
        export type Color = number;
        export const Color = "color";

        /**
         * The colour was changed for a role.
         */
        export type Colour = Color;
        export const Colour = Color;

        /**
         * The role was set as either mentionable or unmentionable.
         */
        export type Mentionable = boolean;
        export const Mentionable = "mentionable";

        /**
         * The role was set to display or no longer display separately from online users.
         */
        export type Hoist = boolean;
        export const Hoist = "hoist";

        /**
         * The icon changed for a role.
         */
        export type Icon = string;
        export const Icon = "icon_hash";

        /**
         * The permissions changed for a role.
         */
        export type Permissions = string;
        export const Permissions = "permissions";

        /**
         * The unicode emoji was changed for a role.
         */
        export type UnicodeEmoji = string;
        export const UnicodeEmoji = "unicode_emoji";
      }
    }
  }

  interface _Entry<Type extends Event = Event> {
    target_id: Nullable<Snowflake.Raw>;
    changes?: Change[];
    user_id: Nullable<Snowflake.Raw>;
    id: Snowflake.Raw;
    action_type: Type;
    options?: Type extends keyof _OptionsMapper ? _OptionsMapper[Type]
      : Options;
    reason?: string;
  }

  interface _OptionsMapper {
    [Event.ChannelOverwriteCreate]: Options.ChannelOverwrite;
    [Event.ChannelOverwriteDelete]: Options.ChannelOverwrite;
    [Event.ChannelOverwriteUpdate]: Options.ChannelOverwrite;
    [Event.MemberDisconnect]: Options.MemberDisconnect;
    [Event.MemberMove]: Options.MemberMove;
    [Event.MemberPrune]: Options.MemberPrune;
    [Event.MessageBulkDelete]: Options.MessageBulkDelete;
    [Event.MessageDelete]: Options.MessageBulkDelete;
    [Event.MessagePin]: Options.MessagePinAndUnpin;
    [Event.MessageUnpin]: Options.MessagePinAndUnpin;
    [Event.StageInstanceCreate]: Options.StageInstanceAction;
    [Event.StageInstanceDelete]: Options.StageInstanceAction;
    [Event.StageInstanceUpdate]: Options.StageInstanceAction;
  }
}
