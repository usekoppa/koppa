import { Snowflake } from "../snowflake.ts";
import { Nullable } from "../_internals/utils.ts";
import { Team } from "../models/team.ts";
import { User } from "./user.ts";

export interface Application {
  id: Snowflake;
  name: string;
  icon: Nullable<string>;
  description: string;
  rpc_origins?: string[];
  bot_public: boolean;
  bot_require_code_grant: boolean;
  terms_of_service_url?: string;
  privacy_policy_url?: string;
  owner?: User.Partial;
  summary: string;
  verify_key: string;
  team?: Nullable<Team.Team>;
  guild_id?: Snowflake;
  primary_sku_id?: Snowflake;
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
