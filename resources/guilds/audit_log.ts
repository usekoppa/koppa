import { Snowflake } from "../../types/snowflake.ts";
import { $TODO, Nullable } from "../../_internals/utils.ts";
import { Channel as ChannelNS } from "../channel.ts";
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
   * The entries of a guild's Audit Log.
   */
  audit_log_entries: AuditLog.Entry[];

  /**
   * The integrations found in a guild's Audit Log.
   */
  integrations: Omit<GuildNS.Integration.Partial, "enabled">[];

  /**
   * The threads found in a guild's Audit Log.
   *
   * @remarks
   * Threads referenced in {@link AuditLog.Event.ThreadCreate | "THREAD_CREATE"} and {@link AuditLog.Event.ThreadUpdate | "THREAD_UPDATE"}
   * events are included in the threads map, since archived threads might not be kept in memory by clients.
   */
  threads: ChannelNS.Thread[];

  /**
   * The users found in a guild's Audit Log.
   */
  users: User[];

  /**
   * The webhooks found in a guild's Audit Log.
   */
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
    /**
     * Channel in which the entities were targeted.
     */
    channel_id: Snowflake.Raw;

    /**
     * The number of entities that were targeted.
     */
    count: string;

    /**
     * The number of days after which inactive members were kicked.
     */
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

    /**
     * Name of the role a channel overwrite was modified for.
     *
     * @remarks
     * This is not present if the entity is a member.
     */
    role_name?: string;

    /**
     * The type of overwritten entity.
     *
     * @remarks
     * "0" for "role" or "1" for "member"
     */
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

  /**
   * The changes that occurred in the entry.
   *
   * @remarks
   * If new_value is not present in the change object,
   * while old_value is, that means the property that was changed has been reset, or set to null.
   *
   * @see {@link https://discord.com/developers/docs/resources/audit-log#audit-log-change-object-audit-log-change-structure | Audit Log Change Structure}
   */
  export interface Change {
    /**
     * The new value of the key.
     */
    new_value?: $TODO;

    /**
     * The old value of the key
     */
    old_value?: $TODO;

    /**
     * The name of audit log change key.
     */
    key: string;
  }

  export namespace Change {
    export type Key = $TODO;

    export namespace Key {
      /**
       * The ID changed for an entity.
       */
      export type ID = Snowflake.Raw;
      export const ID = "id";

      export namespace Guild {
        /**
         * The name of a guild was changed.
         */
        export type Name = string;
        export const Name = "name";

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

        /**
         * The two-factor/multi-factor authentication requirement was changed.
         */
        export type MFALevel = GuildNS.MFARequirement;
        export const MFALevel = "mfa_level";

        /**
         * The owner of the guild was changed.
         */
        export type Owner = Snowflake.Raw;
        export const Owner = "owner_id";
      }

      export namespace Integration {
        /**
         * The name of an integration was changed.
         */
        export type Name = string;
        export const Name = "name";

        /**
         * Emoticons for an integration were enabled or disabled.
         */
        export type Emoticons = boolean;
        export const Emoticons = "enable_emoticons";

        /**
         * Integration subscription expiry behaviour was changed.
         */
        export type ExpireBehaviour = GuildNS.Integration.ExpireBehaviour;
        export const ExpireBehavior = "expire_behavior";

        /**
         * An integration's grace period length was changed for subscription expiries.
         */
        export type ExpiryGracePeriod = number;
        export const ExpiryGracePeriod = "expire_grace_period";
      }

      export namespace Channel {
        /**
         * The name of a channel was changed.
         */
        export type Name = string;
        export const Name = "name";

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

        /**
         * The position of a text or voice channel was changed.
         */
        export type Position = number;
        export const Position = "position";

        /**
         * The channel's NSFW restriction was changed.
         */
        export type NSFW = boolean;
        export const NSFW = "nsfw";

        /**
         * The permissions on a channel changed.
         */
        export type Permissions = ChannelNS.Overwrite;
        export const Permissions = "permission_overwrites";

        /**
         * The channel cooldown has changed.
         *
         * @remarks
         * The cooldown is the number of seconds
         * a user has to wait before sending another message.
         */
        export type Cooldown = number;
        export const Cooldown = "rate_limit_per_user";

        /**
         * The text channel was changed.
         */
        export type Topic = string;
        export const Topic = "topic";

        /**
         * The user limit for a voice channel was changed.
         */
        export type UserLimit = number;
        export const UserLimit = "user_limit";
      }

      export namespace Thread {
        /**
         * The name of a thread was changed.
         */
        export type Name = string;
        export const Name = "name";

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
         * The name of a sticker was changed.
         */
        export type Name = string;
        export const Name = "name";

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
         * The format type of a sticker changed.
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
         * The avatar of a user was changed.
         */
        export type Avatar = string;
        export const Avatar = "avatar_hash";

        /**
         * A user was server deafened or undeafened.
         */
        export type Deaf = boolean;
        export const Deaf = "deaf";

        /**
         * A user was server muted or unmuted.
         */
        export type Mute = boolean;
        export const Mute = "mute";

        /**
         * The nickname of a user was changed.
         *
         * @remarks
         * The nickname of a user may only be 32 characters long.
         */
        export type Nickname = string;
        export const Nickname = "nick";
      }

      /**
       * A role was been modified/created/deleted.
       */
      export namespace Role {
        /**
         * The name of a role was changed.
         */
        export type Name = string;
        export const Name = "name";

        /**
         * A role was added to a guild.
         */
        export type Add = GuildNS.Role.Partial;
        export const Add = "$add";

        /**
         * A role was removed from a guild.
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
        export type Colour = number;
        export const Colour = "color";

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
    /**
     * The ID of the affected entity (webhook, user, role, etc.)
     */
    target_id: Nullable<Snowflake.Raw>;

    /**
     * The changes made to the affected entity.
     */
    changes?: Change[];

    /**
     * The ID of the user who made the changes.
     */
    user_id: Nullable<Snowflake.Raw>;

    /**
     * The ID of the entry.
     */
    id: Snowflake.Raw;

    /**
     * The type of action that occurred.
     *
     * @see {@link Event | Event}
     */
    action_type: Type;

    /**
     * Additional info for certain action types.
     */
    options?: Type extends keyof _OptionsMapper ? _OptionsMapper[Type]
      : Options;

    /**
     * The reason for the change.
     *
     * @remarks
     * Entry reasons may only be 0-512 characters long.
     */
    reason?: string;
  }

  // @ts-ignore Empty for now due to the TODO.
  // deno-lint-ignore no-empty-interface
  interface _ChangeKeyMapper {
    // TODO(@zorbyte): Do this huge job that will be a pain in my ass.
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
