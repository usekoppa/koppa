import { Snowflake } from "../../types/snowflake.ts";
import { $TODO, Nullable } from "../../_internals/utils.ts";
import { Application } from "../application.ts";
import { User } from "../user.ts";

/**
 * A guild object.
 *
 * @see {@link https://discord.com/developers/docs/resources/guild#guild-object-guild-structure | Guild Object}
 */
export interface Guild extends Guild.Partial {
  // icon_hash?: Nullable<string>;

  /**
   * The splash image hash.
   */
  splash: Nullable<string>;

  /**
   * Discovery splash image hash.
   *
   * @remarks
   * Only present for guilds with the {@link Guild.Features | "DISCOVERABLE"} feature
   */
  discovery_splash: Nullable<string>;
}

/**
 * Guilds in Discord represent an isolated collection of users and channels,
 * and are often referred to as "servers" in the UI.
 *
 * @see {@link https://discord.com/developers/docs/resources/guild | Guilds Resource}
 */
export namespace Guild {
  export const enum Features {
    Discoverable = "DISCOVERABLE",
  }

  /**
   * Determines the default setting for the amount of notifications a user
   * will receive on the basis of specific properties of messages.
   *
   * @see {@link https://discord.com/developers/docs/resources/guild#guild-object-default-message-notification-level | Default Message Notification Level}
   */
  export const enum DefaultMessageNotificationLevel {
    /**
     * Members will receive notifications for all messages by default.
     */
    AllMessages = 0,

    /**
     * Members will receive notifications for messages that @mention them by default.
     */
    OnlyMentions = 1,
  }

  /**
   * Specifies whose messages will be scanned for explicit media
   * or if the feature is disabled.
   *
   * @see {@link https://discord.com/developers/docs/resources/guild#guild-object-explicit-content-filter-level | Explicit Content Filter Level}
   */
  export const enum ExplicitContentFilterLevel {
    /**
     * All media sent will not be scanned.
     */
    Disabled = 0,

    /**
     * Media sent by members without a role will be scanned.
     */
    MembersWithoutRoles = 1,

    /**
     * Media sent by any member of the server will be scanned.
     */
    AllMembers = 2,
  }

  /**
   * Two-factor authentication requirement for moderation actions.
   *
   * @see {@link https://discord.com/developers/docs/resources/guild#guild-object-mfa-level | MFA Level}
   */
  export const enum MFARequirement {
    /**
     * Guild has no MFA/2FA requirement for moderation actions
     */
    None = 0,

    /**
     * Guild has a MFA/2FA requirement for moderation actions.
     */
    Elevated = 1,
  }

  /**
   * A guild object with the the bare minimum of properties to still qualify as a form of guild.
   *
   * @see {@link https://discord.com/developers/docs/resources/guild#guild-object-guild-structure | Guild Structure}
   */
  export interface Partial {
    /**
     * The ID of the guild.
     */
    id: Snowflake.Raw;

    /**
     * The name of the guild.
     */
    name: string;

    /**
     * The icon (hash) of the guild.
     */
    icon: Nullable<string>;
  }

  /**
   * An integration for a guild.
   * Integrations can link subscriptions to twitch or YouTube to a guild.
   *
   * @see {@link https://discord.com/developers/docs/resources/guild#integration-object-integration-structure | Integration Structure}
   */
  export interface Integration extends Integration.Partial {
    /**
     * Is this integration syncing.
     */
    syncing?: boolean;

    /**
     * The ID that the integration uses for "subscribers."
     */
    role_id?: Snowflake;

    /**
     * Whether emoticons should be synced for the integration
     *
     * @remarks
     * Twitch only currently.
     */
    enable_emoticons?: boolean;

    /**
     * The behavior of expiring the integration's subscribers.
     */
    expire_behavior?: Integration.ExpireBehaviour;

    /**
     * The grace period before expiring the integration's subscribers.
     *
     * @remarks
     * The data is represented as a number of days.
     */
    expire_grace_period?: number;

    /**
     * The user for the integration.
     */
    user?: User;

    /**
     * When the integration was last synced.
     *
     * @remarks
     * The data is represented as an ISO8601 timestamp
     */
    synced_at?: string;

    /**
     * How many subscribers the integration has.
     */
    subscriber_count?: number;

    /**
     * Has the integration been revoked.
     */
    revoked?: boolean;

    /**
     * The bot/OAuth2 application for discord integrations.
     */
    application?: Application;
  }

  export namespace Integration {
    /**
     * The behavior of expiring subscribers.
     *
     * @see {@link https://discord.com/developers/docs/resources/guild#integration-object-integration-structure | Integration Expire Behaviours}
     */
    export const enum ExpireBehaviour {
      /**
       * Remove the integration role when the subscription expires.
       */
      RemoveRole = 0,

      /** */
      Kick = 1,
    }

    /**
     * The type of integration.
     */
    export const enum Type {
      Twitch = "twitch",
      YouTube = "youtube",
      Discord = "discord",
    }

    /**
     * The bare minimum amount of data for an integration.
     *
     * @see {@link https://discord.com/developers/docs/resources/guild#integration-object-integration-structure | Integration Structure}
     */
    export interface Partial {
      /**
       * The ID of the integration.
       */
      id: Snowflake.Raw;

      /**
       * The name of the integration.
       */
      name: string;

      /**
       * The type of integration.
       */
      type: Type;

      /**
       * The account information of the integration.
       */
      account: Account;

      /**
       * Whether or not the integration is enabled.
       */
      enabled: boolean;
    }

    /**
     * The account information of an integration.
     *
     * @see {@link https://discord.com/developers/docs/resources/guild#integration-account-object | Integration Account Structure}
     */
    export interface Account {
      /**
       * The ID of the account.
       */
      id: string;

      /**
       * The name of the account.
       */
      name: string;
    }
  }

  export type Role = Role.Partial;
  export namespace Role {
    export type Partial = $TODO;
  }

  export namespace WS {
    export namespace GuildCreate {}
  }
}
