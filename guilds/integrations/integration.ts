import type { User } from "../../users/mod.ts";
import type { ISO8601, Snowflake } from "../../types/mod.ts";
import type { GuildIntegrationAccount } from "./account.ts";
import type { GuildIntegrationExpireBehaviour } from "./expiry_behaviour.ts";
import type { GuildIntegrationType } from "./type.ts";
import type { GuildIntegrationApplication } from "./application.ts";

/**
 * An integration for a guild.
 * Integrations can link subscriptions to twitch or YouTube to a guild.
 *
 * https://discord.com/developers/docs/resources/guild#integration-object-integration-structure
 */
export interface GuildIntegration extends GuildIntegration.Partial {
  /** Is this integration syncing. */
  syncing?: boolean;
  /** The ID that the integration uses for subscribers. */
  role_id?: Snowflake;
  /** Whether emoticons should be synced for the integration (Twitch only currently). */
  enable_emoticons?: boolean;
  /** The behavior of expiring the integration's subscribers. */
  expire_behavior?: GuildIntegrationExpireBehaviour;
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
  application?: GuildIntegrationApplication;
}

export namespace GuildIntegration {
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
    type: GuildIntegrationType;
    /** The account information of the integration. */
    account: GuildIntegrationAccount;
    /** Whether or not the integration is enabled. */
    enabled: boolean;
  }
}
