import { Snowflake } from "../types/snowflake.ts";

/**
 * A Stage Instance holds information about a live stage.
 *
 * @example
 * ```json
 * {
 *   "id": "840647391636226060",
 *   "guild_id": "197038439483310086",
 *   "channel_id": "733488538393510049",
 *   "topic": "Testing Testing, 123",
 *   "privacy_level": 1,
 *   "discoverable_disabled": false
 * }
 * ```
 *
 * @see {@link https://discord.com/developers/docs/resources/stage-instance#stage-instance-object-stage-instance-structure | Stage Instance Structure}
 */
export interface StageInstance {
  /**
   * The ID of this Stage instance.
   */
  id: Snowflake;

  /**
   * The ID of the guild associated with the Stage channel.
   */
  guild_id: Snowflake;

  /**
   * The ID of the associated Stage channel.
   */
  channel_id: Snowflake;

  /**
   * The topic of the Stage instance.
   *
   * @remarks
   * The topic should be 1-120 characters long.
   */
  topic: string;

  /**
   * The privacy level of the Stage instance.
   */
  privacy_level: StageInstance.PrivacyLevel;

  /**
   * Whether or not Stage Discovery is disabled.
   */
  discoverable_disabled: boolean;
}

/**
 * The Stage Instance Resource.
 *
 * @see {@link https://discord.com/developers/docs/resources/stage-instance | Stage Instance Resource}
 */
export namespace StageInstance {
  /**
   * The visibility of the Stage to the public.
   */
  export const enum PrivacyLevel {
    /**
     * The Stage instance is visible publicly, such as on Stage Discovery.
     */
    Public = 1,

    /**
     * The Stage instance is visible to guild members only.
     */
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
      export namespace ModifyStageInstance {
        export type Route<StageChannelID extends Snowflake = Snowflake> =
          _StageInstanceRoute<StageChannelID>;

        export const Route = _StageInstanceRoute;

        export interface Headers {
          "X-Audit-Log-Reason"?: string;
        }

        export interface Body {
          /**
           * The topic of the Stage instance (1-120 characters)
           */
          topic?: string;

          /**
           * The {@link privacy level | StageInstance.PrivacyLevel} of the Stage instance.
           */
          privacy_level?: PrivacyLevel;
        }

        export type Response = StageInstance;
      }
    }

    export namespace POST {
      export type Route = `/stage-instances`;
      export const Route: Route = `/stage-instances`;

      export interface Headers {
        "X-Audit-Log-Reason"?: string;
      }

      export interface Body {
        /**
         * The ID of the Stage channel.
         */
        channel_id: Snowflake;

        /**
         * The topic of the Stage instance (1-120 characters)
         */
        topic: string;

        /**
         * The {@link privacy level | StageInstance.PrivacyLevel} of the Stage instance (default GUILD_ONLY)
         */
        privacy_level?: PrivacyLevel;
      }

      export type Response = StageInstance;
    }

    export namespace DELETE {
      export namespace DeleteStageInstance {
        export type Route<StageChannelID extends Snowflake = Snowflake> =
          _StageInstanceRoute<StageChannelID>;

        export const Route = _StageInstanceRoute;

        export interface Headers {
          "X-Audit-Log-Reason"?: string;
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
