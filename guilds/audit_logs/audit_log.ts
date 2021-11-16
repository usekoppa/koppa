import { encodeQueryString } from "../../_internals/encode_query_string.ts";
import type { Snowflake } from "./../../types/snowflake.ts";
import type { GuildIntegration } from "../integrations/integration.ts";
import type { AuditLogEntry } from "./entry.ts";
import type { Webhook } from "../../webhooks/webhook.ts";
import type { User } from "../../users/user.ts";
import type { Thread } from "../../threads/thread.ts";

/**
 * An audit log object associated with a guild.
 *
 * https://discord.com/developers/docs/resources/audit-log#audit-log-object-audit-log-structure
 */
export interface AuditLog {
  /** The entries of a guild's Audit Log. */
  audit_log_entries: AuditLogEntry[];
  /** The users found in a guild's Audit Log. */
  users: User[];
  /** The webhooks found in a guild's Audit Log. */
  webhooks: Webhook[];
  /** The integrations found in a guild's Audit Log. */
  integrations: Omit<GuildIntegration.Partial, "enabled">[];

  /**
   * The threads found in a guild's Audit Log.
   *
   * Threads referenced in `THREAD_CREATE` and `THREAD_UPDATE`
   * events are included in the threads map, since archived threads might not be kept in memory by clients.
   */
  threads: Thread[];
}

/**
 * Whenever an admin action is performed on the API, an entry is added to the respective guild's audit log.
 *
 * You can specify the reason by attaching the `X-Audit-Log-Reason` request header.
 * This header supports URL encoded UTF-8 characters.
 *
 * https://discord.com/developers/docs/resources/audit-log
 */
export namespace AuditLog {
  export namespace REST {
    export namespace GET {
      /**
       * Get Guild Audit Log
       * GET `/guilds/{guild.id}/audit-logs`
       *
       * Returns an Audit Log object for the guild. Requires the `VIEW_AUDIT_LOG` permission.
       * https://discord.com/developers/docs/resources/audit-log#get-guild-audit-log
       */
      export namespace GetGuildAuditLog {
        export type Route<ID extends Snowflake = Snowflake> =
          `/guilds/${ID}/audit-logs`;

        export function Route<ID extends Snowflake = Snowflake>(
          guildID: ID,
        ): Route<ID> {
          return `/guilds/${guildID}/audit-logs`;
        }

        export interface QueryString {
          /** Filter the log for actions made by a user. */
          user_id?: Snowflake;
          /** The type of Audit Log event. */
          action_type?: Event;
          /** Filter the log before a certain entry ID. */
          before?: Snowflake;
          /** How many entries are returned (default 50, minimum 1, maximum 100). */
          limit?: number;
        }

        export function QueryString(query: QueryString) {
          return encodeQueryString(query);
        }

        export type Response = AuditLog;
      }
    }
  }
}
