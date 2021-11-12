import { PermissionOverwrite } from "../../../channels/overwrites/overwrite.ts";
import { Snowflake } from "../../../types/snowflake.ts";
import { GuildDefaultMessageNotificationLevel } from "../../default_message_notification_level.ts";
import { GuildExplicitContentFilterLevel } from "../../explicit_content_filter_level.ts";
import { GuildIntegrationExpireBehaviour } from "../../integrations/expiry_behaviour.ts";
import { GuildMFARequirement } from "../../mfa_requirement.ts";
import { GuildVerificationLevel } from "../../verification_level.ts";
import { Sticker as StickerNS } from "../../../stickers/mod.ts";
import { $TODO } from "../../../_internals/utils.ts";
import { Role as RoleNS } from "../../roles/mod.ts";

/** The type of the aspect in question that changed with this entry. */
export type AuditLogChangeKey =
  | typeof AuditLogChangeKey.ID
  | AuditLogChangeKey.Channel
  | AuditLogChangeKey.Guild
  | AuditLogChangeKey.Integration
  | AuditLogChangeKey.Invite
  | AuditLogChangeKey.Role
  | AuditLogChangeKey.Sticker
  | AuditLogChangeKey.Thread
  | AuditLogChangeKey.User;

export namespace AuditLogChangeKey {
  /** The ID changed for an entity. */
  export type ID = Snowflake;
  export const ID = "id";

  /** The guild's settings were been modified/created/deleted. */
  export type Guild =
    | typeof AuditLogChangeKey.Guild.AFK.Channel
    | typeof AuditLogChangeKey.Guild.AFK.Timeout
    | typeof AuditLogChangeKey.Guild.Banner
    | typeof AuditLogChangeKey.Guild.DefaultMessageNotificationsLevel
    | typeof AuditLogChangeKey.Guild.DiscoverySplash
    | typeof AuditLogChangeKey.Guild.ExplicitContentFilter
    | typeof AuditLogChangeKey.Guild.Icon
    | typeof AuditLogChangeKey.Guild.MFALevel
    | typeof AuditLogChangeKey.Guild.Name
    | typeof AuditLogChangeKey.Guild.Owner
    | typeof AuditLogChangeKey.Guild.PreferredLocale
    | typeof AuditLogChangeKey.Guild.PruneKickPeriod
    | typeof AuditLogChangeKey.Guild.PublicUpdatesChannel
    | typeof AuditLogChangeKey.Guild.Region
    | typeof AuditLogChangeKey.Guild.RulesChannel
    | typeof AuditLogChangeKey.Guild.Splash
    | typeof AuditLogChangeKey.Guild.SystemChannel
    | typeof AuditLogChangeKey.Guild.VanityURLCode
    | typeof AuditLogChangeKey.Guild.VerificationLevel
    | typeof AuditLogChangeKey.Guild.Widget
    | typeof AuditLogChangeKey.Guild.WidgetChannel;

  export namespace Guild {
    /** The name of a guild was changed. */
    export type Name = string;
    export const Name = "name";

    /** AFK channel guild settings have changed. */
    export namespace AFK {
      /** AFK channel changed. */
      export type Channel = Snowflake;
      export const Channel = "afk_channel_id";

      /** AFK timeout duration changed. */
      export type Timeout = number;
      export const Timeout = "afk_timeout";
    }

    /** The guild banner was changed. */
    export type Banner = string;
    export const Banner = "banner_hash";

    /** Default message notification level was changed. */
    export type DefaultMessageNotificationsLevel =
      GuildDefaultMessageNotificationLevel;

    export const DefaultMessageNotificationsLevel =
      "default_message_notifications";

    /** Discovery splash image was changed. */
    export type DiscoverySplash = string;
    export const DiscoverySplash = "discovery_splash_hash";

    /** The settings for explicit content filtering were changed. */
    export type ExplicitContentFilter = GuildExplicitContentFilterLevel;
    export const ExplicitContentFilter = "explicit_content_filter";

    /** Icon was changed for a guild. */
    export type Icon = string;
    export const Icon = "icon_hash";

    /** The two-factor/multi-factor authentication requirement was changed. */
    export type MFALevel = GuildMFARequirement;
    export const MFALevel = "mfa_level";

    /** The owner of the guild was changed. */
    export type Owner = Snowflake;
    export const Owner = "owner_id";

    /** The system channel was changed. */
    export type SystemChannel = Snowflake;
    export const SystemChannel = "system_channel_id";

    /** The guild's preferred locale was changed. */
    export type PreferredLocale = string;
    export const PreferredLocale = "preferred_locale";

    /** The number of days after which inactive and role-unassigned members are kicked was changed. */
    export type PruneKickPeriod = number;
    export const PruneKickPeriod = "prune_delete_days";

    /** The public updates channel was changed. */
    export type PublicUpdatesChannel = Snowflake;
    export const PublicUpdatesChannel = "public_updates_channel_id";

    /** The guild's region was changed. */
    export type Region = string;
    export const Region = "region";

    /** The guild's rule channel was changed. */
    export type RulesChannel = Snowflake;
    export const RulesChannel = "rules_channel_id";

    /** The guild's invite splash screen image was changed. */
    export type Splash = string;
    export const Splash = "splash_hash";

    /** The guild's vanity invite code was changed. */
    export type VanityURLCode = string;
    export const VanityURLCode = "vanity_url_code";

    /** The guild's verification level was changed. */
    export type VerificationLevel = GuildVerificationLevel;
    export const VerificationLevel = "verification_level";

    /** The widget channel for the guild was changed. */
    export type WidgetChannel = Snowflake;
    export const WidgetChannel = "widget_channel_id";

    /** The guild's widget was enabled or disabled. */
    export type Widget = boolean;
    export const Widget = "widget_enabled";
  }

  /** A guild integration was been modified/created/deleted. */
  export type Integration =
    | typeof Integration.Emoticons
    | typeof Integration.ExpireBehaviour
    | typeof Integration.ExpiryGracePeriod
    | typeof Integration.Name;

  export namespace Integration {
    /** The name of an integration was changed. */
    export type Name = string;
    export const Name = "name";

    /** Emoticons for an integration were enabled or disabled. */
    export type Emoticons = boolean;
    export const Emoticons = "enable_emoticons";

    /** Integration subscription expiry behaviour was changed. */
    export type ExpireBehaviour = GuildIntegrationExpireBehaviour;
    export const ExpireBehaviour = "expire_behavior";

    /** An integration's grace period length was changed for subscription expiries. */
    export type ExpiryGracePeriod = number;
    export const ExpiryGracePeriod = "expire_grace_period";
  }

  /** A channel was been modified/created/deleted. */
  export type Channel =
    | typeof Channel.Application
    | typeof Channel.Bitrate
    | typeof Channel.Cooldown
    | typeof Channel.DefaultThreadAutoArchiveDuration
    | typeof Channel.Description
    | typeof Channel.NSFW
    | typeof Channel.Name
    | typeof Channel.Permissions
    | typeof Channel.Position
    | typeof Channel.Topic
    | typeof Channel.UserLimit;

  export namespace Channel {
    /** The name of a channel was changed. */
    export type Name = string;
    export const Name = "name";

    /** A bot or webhook was added to the channel. */
    export type Application = Snowflake;
    export const Application = "application_id";

    /** Voice channel bitrate was changed. */
    export type Bitrate = number;
    export const Bitrate = "bitrate";

    /** The default auto-archive duration for newly created thread was changed. */
    export type DefaultThreadAutoArchiveDuration = number;
    export const DefaultThreadAutoArchiveDuration =
      "default_auto_archive_duration";

    /** The description for the channel was changed. */
    export type Description = string;
    export const Description = "description";

    /** The position of a text or voice channel was changed. */
    export type Position = number;
    export const Position = "position";

    /** The channel's NSFW restriction was changed. */
    export type NSFW = boolean;
    export const NSFW = "nsfw";

    /** The permissions on a channel changed. */
    export type Permissions = PermissionOverwrite;
    export const Permissions = "permission_overwrites";

    /** The number of seconds a user has to wait before sending another message in a channel has changed. */
    export type Cooldown = number;
    export const Cooldown = "rate_limit_per_user";

    /** The text channel was changed. */
    export type Topic = string;
    export const Topic = "topic";

    /** The user limit for a voice channel was changed. */
    export type UserLimit = number;
    export const UserLimit = "user_limit";
  }

  /** A thread was been modified/created/deleted. */
  export type Thread =
    | typeof Thread.Archived
    | typeof Thread.AutoArchiveDuration
    | typeof Thread.Lock
    | typeof Thread.Name;

  export namespace Thread {
    /** The name of a thread was changed. */
    export type Name = string;
    export const Name = "name";

    /** Thread was archived or unarchived. */
    export type Archived = boolean;
    export const Archived = "archived";

    /** Auto archive duration was changed. */
    export type AutoArchiveDuration = number;
    export const AutoArchiveDuration = "auto_archive_duration";

    /** A thread was unlocked or locked. */
    export type Lock = boolean;
    export const Lock = "locked";
  }

  /** An invite was been modified/created/deleted. */
  export type Invite =
    | typeof Invite.Channel
    | typeof Invite.Code
    | typeof Invite.Inviter
    | typeof Invite.MaxAge
    | typeof Invite.MaxUses
    | typeof Invite.Temporary
    | typeof Invite.Uses;

  export namespace Invite {
    /** The channel an invite was made for was changed. */
    export type Channel = Snowflake;
    export const Channel = "channel_id";

    /** Invite code was changed. */
    export type Code = string;
    export const Code = "code";

    /** The inviter changed for an invite. */
    export type Inviter = Snowflake;
    export const Inviter = "inviter_id";

    /** The maximum age was changed for an invite. */
    export type MaxAge = number;
    export const MaxAge = "max_age";

    /** The maximum number of uses was changed for an invite. */
    export type MaxUses = number;
    export const MaxUses = "max_uses";

    /** The number of times the invite has been used has changed. */
    export type Uses = number;
    export const Uses = "uses";

    /** The invite code has been set to temporary or permanent. */
    export type Temporary = boolean;
    export const Temporary = "temporary";
  }

  /** A sticker was been modified/created/deleted. */
  export type Sticker =
    | typeof Sticker.Available
    | typeof Sticker.Description
    | typeof Sticker.Format
    | typeof Sticker.Guild
    | typeof Sticker.Name
    | typeof Sticker.RelatedEmoji;

  export namespace Sticker {
    /** The name of a sticker was changed. */
    export type Name = string;
    export const Name = "name";

    /** Availability of a sticker was changed. */
    export type Available = boolean;
    export const Available = "available";

    /** The description for the sticker was changed. */
    export type Description = string;
    export const Description = "description";

    /** The format type of a sticker changed. */
    export type Format = StickerNS.Format;
    export const Format = "format_type";

    /** The guild the sticker is in was changed. */
    export type Guild = Snowflake;
    export const Guild = "guild_id";

    /** The related emoji of a sticker has changed. */
    export type RelatedEmoji = string;
    export const RelatedEmoji = "tags";
  }

  /** A user was been modified/created/deleted. */
  export type User =
    | typeof User.Avatar
    | typeof User.Deaf
    | typeof User.Mute
    | typeof User.Nickname;
  export namespace User {
    /** The avatar of a user was changed. */
    export type Avatar = string;
    export const Avatar = "avatar_hash";

    /** A user was server deafened or undeafened. */
    export type Deaf = boolean;
    export const Deaf = "deaf";

    /** A user was server muted or unmuted. */
    export type Mute = boolean;
    export const Mute = "mute";

    /** The nickname of a user was changed. */
    export type Nickname = string;
    export const Nickname = "nick";
  }

  /** A role was been modified/created/deleted. */
  export type Role =
    | typeof Role.Add
    | typeof Role.AllowChannelPermission
    | typeof Role.Colour
    | typeof Role.DenyChannelPermission
    | typeof Role.Hoist
    | typeof Role.Icon
    | typeof Role.Mentionable
    | typeof Role.Name
    | typeof Role.Permissions
    | typeof Role.Remove
    | typeof Role.UnicodeEmoji;

  export namespace Role {
    /** The name of a role was changed. */
    export type Name = string;
    export const Name = "name";

    /** A role was added to a guild. */
    export type Add = RoleNS.Partial;
    export const Add = "$add";

    /** A role was removed from a guild. */
    export type Remove = RoleNS.Partial;
    export const Remove = "$remove";

    /** A permission on a text or voice channel was allowed for a role. */
    export type AllowChannelPermission = string;
    export const AllowChannelPermission = "allow";

    /** A permission on a text or voice channel was denied for a role. */
    export type DenyChannelPermission = string;
    export const DenyChannelPermission = "deny";

    /** The colour was changed for a role. */
    export type Colour = number;
    export const Colour = "color";

    /** The role was set as either mentionable or unmentionable. */
    export type Mentionable = boolean;
    export const Mentionable = "mentionable";

    /** The role was set to display or no longer display separately from online users. */
    export type Hoist = boolean;
    export const Hoist = "hoist";

    /** The icon changed for a role. */
    export type Icon = string;
    export const Icon = "icon_hash";

    /** The permissions changed for a role. */
    export type Permissions = $TODO<string>;
    export const Permissions = "permissions";

    /** The unicode emoji was changed for a role. */
    export type UnicodeEmoji = string;
    export const UnicodeEmoji = "unicode_emoji";
  }
}
