import type { User } from "../users/user.ts";
import type { ISO8601, Snowflake } from "../types/mod.ts";
import type { IntegrationAccount } from "./account.ts";
import type { IntegrationExpireBehaviour } from "./expire_behaviour.ts";
import type { IntegrationType } from "./type.ts";
import type { IntegrationApplication } from "./application.ts";

/**
 * An integration for a guild.
 * Integrations can link subscriptions to twitch or YouTube to a guild.
 *
 * https://discord.com/developers/docs/resources/guild#integration-object-integration-structure
 */
export interface Integration extends Integration.Partial {
  /** Whether or not the integration is enabled. */
  enabled: boolean;
  /** Is this integration syncing. */
  syncing?: boolean;
  /** The ID that the integration uses for subscribers. */
  role_id?: Snowflake;
  /** Whether emoticons should be synced for the integration (Twitch only currently). */
  enable_emoticons?: boolean;
  /** The behavior of expiring the integration's subscribers. */
  expire_behavior?: IntegrationExpireBehaviour;
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
  application?: IntegrationApplication;
}

export namespace Integration {
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
    type: IntegrationType;
    /** The account information of the integration. */
    account: IntegrationAccount;
  }

  export namespace REST {
    export namespace GET {
      export namespace GetGuildIntegrations {}
    }

    export namespace DELETE {
      export namespace DeleteGuildIntegration {}
    }
  }
}
