import type { Nullable } from "../_internals/utils.ts";
import type { Snowflake } from "../types/snowflake.ts";
import type { User } from "../users/user.ts";
import { AuditLogReasonHeaders } from "../_internals/audit_log_reason_headers.ts";

export interface GuildWidget {
  /** Whether or not the guild widget is enabled. */
  enabled: boolean;
  /** The channel the widget will generate an invite to, or `null` if set to no invite. */
  channel_id: Nullable<Snowflake>;
}

export namespace GuildWidget {
  export namespace REST {
    export namespace GET {
      /**
       * Get Guild Widget Settings
       * GET `/guilds/{guild.id}/widget`
       *
       * Returns a guild widget object.
       * Requires the `MANAGE_GUILD` permission.
       *
       * https://discord.com/developers/docs/resources/guild#get-guild-widget-settings
       */
      export namespace GetGuildWidgetSettings {
        export type Route<GuildID extends Snowflake = Snowflake> =
          _GuildWidgetRoute<GuildID>;

        export const Route = _GuildWidgetRoute;

        export type Response = GuildWidget;
      }

      /**
       * Get Guild Widget
       * GET `/guilds/{guild.id}/widget.json`
       *
       * Returns the widget for the guild.
       *
       * https://discord.com/developers/docs/resources/guild#get-guild-widget
       */
      export namespace GetGuildWidget {
        export type Route<GuildID extends Snowflake = Snowflake> =
          `/guilds/${GuildID}/widget.json`;

        export function Route<GuildID extends Snowflake>(
          guildID: GuildID,
        ): Route<GuildID> {
          return `/guilds/${guildID}/widget.json`;
        }

        /** https://discord.com/developers/docs/resources/guild#get-guild-widget-example-get-guild-widget */
        export interface Response {
          id: Snowflake;
          name: string;
          instant_invite: `https://discord.com/invite/${string}`;
          channels: { id: Snowflake; name: string; position: number }[];
          members: Omit<User.Partial, "flags"> & {
            status: "online" | "idle" | "dnd";
            avatar_url:
              `https://cdn.discordapp.com/widget-avatars/${string}/${string}`;
          };
          presence_count: number;
        }
      }
    }

    export namespace PATCH {
      /**
       * Modify Guild Widget
       * PATCH `/guilds/{guild.id}/widget`
       *
       * Modify a guild widget object for the guild.
       * All attributes may be passed in with JSON and modified.
       * Requires the `MANAGE_GUILD` permission.
       * Returns the updated guild widget object.
       *
       * This endpoint supports the `X-Audit-Log-Reason` header.
       *
       * https://discord.com/developers/docs/resources/guild#modify-guild-widget
       */
      export namespace ModifyGuildWidget {
        export type Route<GuildID extends Snowflake = Snowflake> =
          _GuildWidgetRoute<GuildID>;

        export const Route = _GuildWidgetRoute;

        export type Headers = AuditLogReasonHeaders;
        export const Headers = AuditLogReasonHeaders;

        export type Body = Partial<GuildWidget>;

        export type Response = GuildWidget;
      }
    }

    type _GuildWidgetRoute<GuildID extends Snowflake = Snowflake> =
      `/guilds/${GuildID}/widget`;

    function _GuildWidgetRoute<GuildID extends Snowflake>(
      guildID: GuildID,
    ): _GuildWidgetRoute<GuildID> {
      return `/guilds/${guildID}/widget`;
    }
  }
}
