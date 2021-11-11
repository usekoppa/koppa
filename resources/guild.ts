import { Snowflake } from "../types/snowflake.ts";
import { $TODO, Nullable } from "../_internals/utils.ts";
import { Application } from "../types/application.ts";
import { User } from "./user.ts";
import { Thread } from "./thread.ts";
import { ISO8601 } from "../types/ISO8601.ts";

/**
 * A guild object.
 *
 * https://discord.com/developers/docs/resources/guild#guild-object-guild-structure
 */
export interface Guild extends Guild.Partial {
  icon_hash?: Nullable<string>;
  /** The splash image (hash). */
  splash: Nullable<string>;
  /** Discovery splash image (hash). (Only present for guilds with the `DISCOVERABLE` feature enabled). */
  discovery_splash: Nullable<string>;
}

/**
 * Guilds in Discord represent an isolated collection of users and channels,
 * and are often referred to as "servers" in the UI.
 *
 * https://discord.com/developers/docs/resources/guild
 */
export namespace Guild {
  export const enum Features {
    Discoverable = "DISCOVERABLE",
  }

  export const enum VerificationLevel {
    None = 0,
    Low = 1,
    Medium = 2,
    High = 3,
    VeryHigh = 4,
  }

  /**
   * Determines the default setting for the amount of notifications a user
   * will receive on the basis of specific properties of messages.
   *
   * https://discord.com/developers/docs/resources/guild#guild-object-default-message-notification-level
   */
  export const enum DefaultMessageNotificationLevel {
    /** Members will receive notifications for all messages by default. */
    AllMessages = 0,

    /**
     * Members will receive notifications for messages that `@mention` them by default.
     */
    OnlyMentions = 1,
  }

  /**
   * Specifies whose messages will be scanned for explicit media
   * or if the feature is disabled.
   *
   * https://discord.com/developers/docs/resources/guild#guild-object-explicit-content-filter-level
   */
  export const enum ExplicitContentFilterLevel {
    /** All media sent will not be scanned. */
    Disabled = 0,
    /** Media sent by members without a role will be scanned. */
    MembersWithoutRoles = 1,
    /** Media sent by any member of the server will be scanned. */
    AllMembers = 2,
  }

  /**
   * Two-factor authentication requirement for moderation actions.
   *
   * https://discord.com/developers/docs/resources/guild#guild-object-mfa-level
   */
  export const enum MFARequirement {
    /** Guild has no MFA/2FA requirement for moderation actions. */
    None = 0,
    /** Guild has a MFA/2FA requirement for moderation actions. */
    Elevated = 1,
  }

  /**
   * A partial guild.
   *
   * https://discord.com/developers/docs/resources/guild#guild-object-guild-structure
   */
  export interface Partial {
    /** The ID of the guild. */
    id: Snowflake;

    /** The name of the guild. */
    name: string;

    /** The icon (hash) of the guild. */
    icon: Nullable<string>;
  }

  /**
   * An integration for a guild.
   * Integrations can link subscriptions to twitch or YouTube to a guild.
   *
   * https://discord.com/developers/docs/resources/guild#integration-object-integration-structure
   */
  export interface Integration extends Integration.Partial {
    /** Is this integration syncing. */
    syncing?: boolean;
    /** The ID that the integration uses for subscribers. */
    role_id?: Snowflake;
    /** Whether emoticons should be synced for the integration (Twitch only currently). */
    enable_emoticons?: boolean;
    /** The behavior of expiring the integration's subscribers. */
    expire_behavior?: Integration.ExpireBehaviour;
    /** The grace period (in days) before expiring the integration's subscribers. */
    expire_grace_period?: number;
    /** The user for the integration. */
    user?: User;
    /** The (ISO8601) timestamp integration was last synced. */
    synced_at?: ISO8601;
    /** How many subscribers the integration has. */
    subscriber_count?: number;
    /** Has the integration been revoked. */
    revoked?: boolean;
    /** The bot/OAuth2 application for discord integrations. */
    application?: Application;
  }

  export namespace Integration {
    /**
     * The behavior of expiring subscribers.
     *
     * https://discord.com/developers/docs/resources/guild#integration-object-integration-structure
     */
    export const enum ExpireBehaviour {
      /** Remove the integration role when the subscription expires. */
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
     * https://discord.com/developers/docs/resources/guild#integration-object-integration-structure
     */
    export interface Partial {
      /** The ID of the integration. */
      id: Snowflake;
      /** The name of the integration. */
      name: string;
      /** The type of integration. */
      type: Type;
      /** The account information of the integration. */
      account: Account;
      /** Whether or not the integration is enabled. */
      enabled: boolean;
    }

    /**
     * The account information of an integration.
     *
     * https://discord.com/developers/docs/resources/guild#integration-account-object
     */
    export interface Account {
      /** The ID of the account. */
      id: string;
      /** The name of the account. */
      name: string;
    }
  }

  export type Role = Role.Partial;
  export namespace Role {
    export type Partial = $TODO;
  }

  export namespace REST {
    export namespace GET {
      /**
       * List Active Threads
       * GET `/guilds/{guild.id}/threads/active`
       *
       * Returns all active threads in the guild, including public and private threads.
       * Threads are ordered by their ID, in descending order.
       *
       * https://discord.com/developers/docs/resources/guild#list-active-threads
       */
      export namespace ListActiveThreads {
        export type Route<
          GuildID extends Snowflake = Snowflake,
        > = `/guilds/${GuildID}/threads/active`;

        function Route<
          ChannelID extends Snowflake,
        >(
          guildID: ChannelID,
        ): Route<ChannelID> {
          return `/guilds/${guildID}/threads/active`;
        }

        export interface Response {
          /**	The active threads. */
          threads: Thread[];
          /**	A thread member object for each returned thread the current user has joined. */
          members: Thread.Member[];
        }
      }
    }
  }

  export namespace WS {
    export namespace GuildCreate {}
  }
}
