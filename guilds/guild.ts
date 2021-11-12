import { Snowflake } from "../types/mod.ts";
import { Nullable } from "../_internals/utils.ts";

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

  export namespace REST {
    export namespace GET {
    }
  }

  export namespace WS {
    export namespace GuildCreate {}
  }
}
