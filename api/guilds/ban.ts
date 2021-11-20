import type { Snowflake } from "../types/snowflake.ts";
import type { User } from "../users/user.ts";
import type { Nullable } from "../_internals/utils.ts";

/** https://discord.com/developers/docs/resources/guild#ban-object-ban-structure */
export interface GuildBan {
  /** The reason for the ban. */
  reason: Nullable<string>;
  /** The banned user. */
  user: User.Partial & Pick<User, "public_flags">;
}

export namespace GuildBan {
  export namespace REST {
    export namespace GET {
      /**
       * Get Guild Bans
       * GET `/guilds/${guild.id}/bans`
       *
       * Returns a list of ban objects for the users banned from this guild.
       * Requires the `BAN_MEMBERS` permission.
       *
       * https://discord.com/developers/docs/resources/guild#get-guild-bans
       */
      export namespace GetGuildBans {
        export type Route<GuildID extends Snowflake = Snowflake> =
          `/guilds/${GuildID}/bans`;

        export function Route<GuildID extends Snowflake>(
          guildID: GuildID,
        ): Route<GuildID> {
          return `/guilds/${guildID}/bans`;
        }
      }

      export namespace GetGuildBan {
        export type Route<
          GuildID extends Snowflake = Snowflake,
          UserID extends Snowflake = Snowflake,
        > = _GuildBanRoute<GuildID, UserID>;

        export const Route = _GuildBanRoute;

        export type Response = GuildBan;
      }
    }

    type _GuildBanRoute<
      GuildID extends Snowflake = Snowflake,
      UserID extends Snowflake = Snowflake,
    > = `/guilds/${GuildID}/bans/${UserID}`;

    function _GuildBanRoute<
      GuildID extends Snowflake,
      UserID extends Snowflake,
    >(guildID: GuildID, userID: UserID): _GuildBanRoute<GuildID, UserID> {
      return `/guilds/${guildID}/bans/${userID}`;
    }
  }
}
