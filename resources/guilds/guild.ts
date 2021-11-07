import { Snowflake } from "../../types/snowflake.ts";
import { $TODO, Nullable } from "../../_internals/utils.ts";

export interface Guild extends Guild.Partial {
  icon_hash?: Nullable<string>;
  splash: Nullable<string>;
  discovery_splash: Nullable<string>;
}

export namespace Guild {
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

  export interface Partial {
    id: Snowflake.Raw;
    name: string;
    icon: Nullable<string>;
  }

  export type Integration = $TODO;

  export type Role = Role.Partial;
  export namespace Role {
    export type Partial = $TODO;
  }

  export namespace WS {
    export namespace GuildCreate {}
  }
}
