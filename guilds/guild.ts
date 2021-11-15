import type { ISO8601, Locale, Snowflake } from "../types/mod.ts";
import type { $TODO, Nullable } from "../_internals/utils.ts";
import type { SerialisedPermissions } from "../permissions/serialised.ts";
import type { GuildVerificationLevel } from "./verification_level.ts";
import type { GuildDefaultMessageNotificationLevel } from "./default_message_notification_level.ts";
import type { GuildExplicitContentFilterLevel } from "./explicit_content_filter_level.ts";
import type { Role } from "./roles/role.ts";
import type { GuildFeature } from "./feature.ts";
import type { SystemChannelFlags } from "./system_channel_flags.ts";
import type { Channel, Thread } from "../channels/mod.ts";
import type { GuildPremiumTier } from "./premium_tier.ts";
import type { GuildMFALevel } from "./mfa_level.ts";
import type { GuildNSFWLevel } from "./nsfw_level.ts";
import type { StageInstance } from "../stage_instance/stage_instance.ts";
import type { Sticker } from "../stickers/sticker.ts";
import type { GuildWelcomeScreen } from "./welcome_screen/welcome_screen.ts";

/**
 * A guild object.
 *
 * https://discord.com/developers/docs/resources/guild#guild-object-guild-structure
 */
export interface Guild extends Guild.Partial {
  /**
   * The voice region ID.
   *
   * @deprecated
   * This field is deprecated and is replaced by `channel.rtc_region`.
   */
  region?: Nullable<string>;
  /** Icon hash if the guild object is a snapshot in a template. */
  icon_hash?: Nullable<string>;
  /** The splash image (hash). */
  splash: Nullable<string>;
  /** Discovery splash image (hash). (Only present for guilds with the `DISCOVERABLE` feature enabled). */
  discovery_splash: Nullable<string>;
  /** Whether or not the current user owns the guild. */
  owner?: boolean;
  /** The ID of the user who owns the guild */
  owner_id: Snowflake;
  /** The permissions (excluding overwrites) for the current user. */
  permissions?: SerialisedPermissions;
  /** ID of the AFK channel. */
  afk_channel_id: Nullable<Snowflake>;
  /** AFK timeout in seconds. */
  afk_timeout: number;
  /** Whether or not the guild widget is enabled. */
  widget_enabled?: boolean;
  /** The channel the widget will generate an invite to, or `null` if set to no invite. */
  widget_channel_id?: Nullable<Snowflake>;
  /** The verification level required for the guild. */
  verification_level: GuildVerificationLevel;
  /** The default notification level for the guild. */
  default_message_notifications: GuildDefaultMessageNotificationLevel;
  /** Specifies the criterion of what type of user will have their messages scan for explicit content. */
  explicit_content_filter: GuildExplicitContentFilterLevel;
  /** The roles in the guild. */
  roles: Role[];
  /** The custom emojis in the guild. */
  emojis: $TODO[];
  /** Enabled guild features. */
  features: GuildFeature[];
  /** The MFA requirement for moderation actions on the guild. */
  mfa_level: GuildMFALevel;
  /** Application ID of the guild owner if it is bot-created. */
  application_id: Nullable<Snowflake>;
  /** The ID of the channel where guild notices such as welcome msgs and boost notifs are posted. */
  system_channel_id: Nullable<Snowflake>;
  /** The flags for the system channel. */
  system_channel_flags: Nullable<SystemChannelFlags | number>;
  /** The ID of the rules channel of the guild. */
  rules_channel_id: Nullable<Snowflake>;
  /** When (ISO8601) the current user joined the guild. */
  joined_at?: ISO8601;
  /** If Discord considers this guild as large. */
  large?: boolean;
  /** Whether the guild is unavailable due to an outage or is not yet available to the application. */
  unavailable?: boolean;
  /** Total number of members in the guild. */
  member_count?: number;
  /** States of the members currently in voice channels - lacks the `guild_id` key. */
  voice_states?: $TODO[];
  /** Users in the guild. */
  members?: $TODO[];
  /** Channels in the guild. */
  channels?: Channel[];
  /** All active threads in the guild that the user has permission to view. */
  threads?: Thread[];
  /** Presences of the members in the guild, will only include non-offline members if the size is > `large threshold`. */
  presences?: $TODO[];
  /** The maximum number of presences for the guild - `null` is always returned, apart from the largest of guilds. */
  max_presences?: Nullable<number>;
  /** The maximum number of members for the guild. */
  max_members?: number;
  /** The vanity URL code for the guild. */
  vanity_url_code: Nullable<string>;
  /** The description of a community guild. */
  description: Nullable<string>;
  /** The banner (hash). */
  banner: Nullable<string>;
  /** The premium tier (Server Boost level) of the guild. */
  premium_tier: GuildPremiumTier;
  /** The number of boosts this guild has. */
  premium_subscription_count?: number;
  /** The preferred locale of a Community guild; used in server discovery and notices from Discord - defaults to `en-US`. */
  preferred_locale: Locale;
  /** The ID of the channel where admins and moderators of Community guilds receive notices from Discord. */
  public_updates_channel_id: Nullable<Snowflake>;
  /** The maximum amount of users in a video channel. */
  max_video_channel_users?: number;
  /** Approximate number of members in this guild - returned from the GET `/guilds/<id>` endpoint when `with_counts` is `true`. */
  approximate_member_count?: number;
  /** Approximate number of non-offline members in this guild - returned from the GET `/guilds/<id>` endpoint when `with_counts` is `true`. */
  approximate_presence_count?: number;
  /** The welcome screen of a Community guild, shown to new members, returned in an Invite's guild object. */
  welcome_screen?: GuildWelcomeScreen;
  /** The guild's NSFW level. */
  nsfw_level: GuildNSFWLevel;
  /** The Stage Instances in the guild. */
  stage_instances?: StageInstance[];
  /** The guild's custom stickers. */
  stickers?: Sticker.Guild[];
}

/**
 * Guilds in Discord represent an isolated collection of users and channels,
 * and are often referred to as "servers" in the UI.
 *
 * https://discord.com/developers/docs/resources/guild
 */
export namespace Guild {
  /**
   * A partial guild.
   *
   * https://discord.com/developers/docs/resources/guild#guild-object-guild-structure
   */
  export interface Partial {
    /** The ID of the guild. */
    id: Snowflake;
    /** The name of the guild (2-100 characters). */
    name: string;
    /** The icon (hash) of the guild. */
    icon: Nullable<string>;
  }

  /** https://discord.com/developers/docs/resources/guild#guild-preview-object-guild-preview-structure */
  export type Preview = Required<
    Pick<
      Guild,
      | "id"
      | "name"
      | "icon"
      | "splash"
      | "discovery_splash"
      | "emojis"
      | "features"
      | "approximate_member_count"
      | "approximate_presence_count"
      | "description"
    >
  >;

  /**
   * A partial guild object.
   * Represents an Offline Guild, or a Guild whose information has not been
   * provided through `GUILD_CREATE` events during the Gateway connect.
   *
   * https://discord.com/developers/docs/resources/guild#unavailable-guild-object
   */
  export interface Unavailable {
    id: Snowflake;
    unavailable: true;
  }

  export namespace REST {
    export namespace GET {
      export namespace GetGuild {}

      export namespace GetGuildPreview {}
    }

    export namespace PATCH {
      export namespace ModifyGuild {}
    }

    export namespace POST {
      export namespace CreateGuild {}
    }

    export namespace DELETE {
      export namespace DeleteGuild {}
    }
  }
}
