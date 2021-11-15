import { Snowflake } from "../types/snowflake.ts";
import { AuditLogReasonHeaders } from "../_internals/audit_log_reason_headers.ts";
import { StageInstancePrivacyLevel } from "./privacy_level.ts";

/**
 * A Stage Instance holds information about a live stage.
 *
 * https://discord.com/developers/docs/resources/stage-instance#stage-instance-object-stage-instance-structure
 */
export interface StageInstance {
  /** The ID of this Stage instance. */
  id: Snowflake;
  /** The ID of the guild associated with the Stage channel. */
  guild_id: Snowflake;
  /** The ID of the associated Stage channel. */
  channel_id: Snowflake;
  /** The topic (1-120 characters) of the Stage instance. */
  topic: string;
  /** The privacy level of the Stage instance. */
  privacy_level: StageInstancePrivacyLevel;
  /** Whether or not Stage Discovery is disabled. */
  discoverable_disabled: boolean;
}

/**
 * The Stage Instance Resource.
 *
 * https://discord.com/developers/docs/resources/stage-instance
 */
export namespace StageInstance {
  export namespace REST {
    export namespace GET {
      export namespace GetStageInstance {
        export type Route<StageChannelID extends Snowflake = Snowflake> =
          _StageInstanceRoute<StageChannelID>;

        export const Route = _StageInstanceRoute;

        export type Response = StageInstance;
      }
    }

    export namespace PATCH {
      /**
       * Modify Stage Instance
       * PATCH `/stage-instances/{channel.id}`
       *
       * Updates fields of an existing Stage instance.
       * Requires the user to be a moderator of the Stage channel.
       *
       * This endpoint supports the `X-Audit-Log-Reason` header.
       *
       * https://discord.com/developers/docs/resources/stage-instance#modify-stage-instance
       */
      export namespace ModifyStageInstance {
        export type Route<StageChannelID extends Snowflake = Snowflake> =
          _StageInstanceRoute<StageChannelID>;

        export const Route = _StageInstanceRoute;

        export type Headers = AuditLogReasonHeaders;
        export const Headers = AuditLogReasonHeaders;

        export interface Body {
          /** The topic of the Stage instance (1-120 characters). */
          topic?: string;
          /** The privacy level of the Stage instance. */
          privacy_level?: StageInstancePrivacyLevel;
        }

        export type Response = StageInstance;
      }
    }

    export namespace POST {
      /**
       * Create Stage Instance
       * POST `/stage-instances`
       *
       * Creates a new Stage instance associated to a Stage channel.
       * Requires the user to be a moderator of the Stage channel.
       * This endpoint supports the X-Audit-Log-Reason header.
       */
      export namespace CreateStageInstance {
        export type Route = `/stage-instances`;
        export const Route: Route = `/stage-instances`;

        export type Headers = AuditLogReasonHeaders;
        export const Headers = AuditLogReasonHeaders;

        export interface Body {
          /** The ID of the Stage channel. */
          channel_id: Snowflake;
          /** The topic of the Stage instance (1-120 characters). */
          topic: string;
          /** The privacy level of the Stage instance (default `GUILD_ONLY`). */
          privacy_level?: StageInstancePrivacyLevel;
        }

        export type Response = StageInstance;
      }
    }

    export namespace DELETE {
      export namespace DeleteStageInstance {
        export type Route<StageChannelID extends Snowflake = Snowflake> =
          _StageInstanceRoute<StageChannelID>;

        export const Route = _StageInstanceRoute;

        export type Headers = AuditLogReasonHeaders;
        export const Headers = AuditLogReasonHeaders;
      }
    }

    type _StageInstanceRoute<StageChannelID extends Snowflake = Snowflake> =
      `/stage-instances/${StageChannelID}`;

    function _StageInstanceRoute<StageChannelID extends Snowflake>(
      stageChannelID: StageChannelID,
    ): _StageInstanceRoute<StageChannelID> {
      return `/stage-instances/${stageChannelID}`;
    }
  }
}
