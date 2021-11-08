import { Snowflake } from "../types/snowflake.ts";
import { Nullable } from "../_internals/utils.ts";
import { Team } from "../types/team.ts";
import { User } from "../resources/user.ts";

export interface Application {
  /**
   * The ID of the application.
   */
  id: Snowflake.Raw;

  /**
   * The name of the application.
   */
  name: string;

  /**
   * The icon (hash) of the application.
   */
  icon: Nullable<string>;

  /**
   * The description of the application.
   */
  description: string;

  /**
   * An array of RPC origin URLs, if RPC is enabled.
   */
  rpc_origins?: string[];

  /**
   * Whether or not anyone can add the application's bot to a guild.
   *
   * @remarks
   * Only the owner can add the bot if set to `false`;
   */
  bot_public: boolean;
  bot_require_code_grant: boolean;
  terms_of_service_url?: string;
  privacy_policy_url?: string;
  owner?: Omit<User.Partial, "flags">;
  summary: string;
  verify_key: string;
  team?: Nullable<Team.Team>;
  guild_id?: Snowflake.Raw;
  primary_sku_id?: Snowflake.Raw;
  slug?: string;
  cover_image?: string;
  flags?: Application.Flags | number;
}

export namespace Application {
  export const enum Flags {
    GatewayPresence = 1 << 12,
    GatewayPresenceLimited = 1 << 13,
    GatewayGuildMembers = 1 << 14,
    GatewayGuildMembersLimited = 1 << 15,
    VerificationPendingGuildLimit = 1 << 16,
    Embedded = 1 << 17,
    GatewayMessageContent = 1 << 18,
    GatewayMessageContentLimited = 1 << 19,
  }
}
