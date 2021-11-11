import { Snowflake } from "../types/snowflake.ts";

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
  privacy_level: StageInstance.PrivacyLevel;
  /** Whether or not Stage Discovery is disabled. */
  discoverable_disabled: boolean;
}

/**
 * The Stage Instance Resource.
 * 
 * https://discord.com/developers/docs/resources/stage-instance
 */
export namespace StageInstance {
  /** The visibility of the Stage to the public. */
  export const enum PrivacyLevel {
    /** The Stage instance is visible publicly, such as on Stage Discovery. */
    Public = 1,
    /** The Stage instance is visible to guild members only. */
    GuildOnly = 2,
  }

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

        export interface Headers {
          "X-Audit-Log-Reason"?: string;
        }

        export function Headers(reason?: string) {
          if (reason) return { "X-Audit-Log-Reason": reason } as Headers;
        }

        export interface Body {
          /** The topic of the Stage instance (1-120 characters). */
          topic?: string;
          /** The privacy level of the Stage instance. */
          privacy_level?: PrivacyLevel;
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

        export interface Headers {
          "X-Audit-Log-Reason"?: string;
        }

        export function Headers(reason?: string) {
          if (reason) return { "X-Audit-Log-Reason": reason } as Headers;
        }

        export interface Body {
          /** The ID of the Stage channel. */
          channel_id: Snowflake;
          /** The topic of the Stage instance (1-120 characters). */
          topic: string;
          /** The privacy level of the Stage instance (default `GUILD_ONLY`). */
          privacy_level?: PrivacyLevel;
        }

        export type Response = StageInstance;
      }
    }

    export namespace DELETE {
      export namespace DeleteStageInstance {
        export type Route<StageChannelID extends Snowflake = Snowflake> =
          _StageInstanceRoute<StageChannelID>;

        export const Route = _StageInstanceRoute;

        export interface Headers {
          "X-Audit-Log-Reason"?: string;
        }

        export function Headers(reason?: string) {
          if (reason) return { "X-Audit-Log-Reason": reason } as Headers;
        }
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
