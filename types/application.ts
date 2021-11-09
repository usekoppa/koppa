import { Snowflake } from "../types/snowflake.ts";
import { Nullable } from "../_internals/utils.ts";
import { Team } from "../types/team.ts";
import { User } from "../resources/user.ts";

/**
 * Properties of an application
 */
export interface Application {
  /**
   * The ID of the application.
   */
  id: Snowflake;

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

  /**
   * When `true` the application's bot will only join upon completion of the full OAuth2 code grant flow.
   */
  bot_require_code_grant: boolean;

  /**
   * The URL of the application's Terms of Service.
   */
  terms_of_service_url?: string;

  /**
   * The URL of the application's privacy policy.
   */
  privacy_policy_url?: string;

  /**
   * Information about the owner of the application.
   *
   * @remarks
   * Contains only partial and minimal user information.
   */
  owner?: Omit<User.Partial, "flags">;

  /**
   * If this application is a game sold on Discord,
   * this field will be the summary field for the store page of its primary SKU.
   */
  summary: string;

  /**
   * The hexadecimally encoded key for verification in interactions and the GameSDK's `GetTicket` function.
   */
  verify_key: string;

  /**
   * If the application belongs to a team,
   * this will be a means to access the list of the members of that team.
   */
  team?: Nullable<Pick<Team.Team, "id" | "icon" | "members">>;

  /**
   * If this application is a game sold on Discord,
   * this field will be the ID of the guild to which it has been linked to.
   */
  guild_id?: Snowflake;

  /**
   * If this application is a game sold on Discord,
   * this field will be the ID of the game's Stock Keeping Unit (SKU) that is created.
   */
  primary_sku_id?: Snowflake;

  /**
   * If this application is a game sold on Discord,
   * this field will be the URL slug that links to the store page.
   */
  slug?: string;

  /**
   * The application's default rich presence invite cover image (hash).
   */
  cover_image?: string;

  /**
   * The application's public flags
   */
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

  /**
   * The application structure found exclusively for bots.
   */
  export type Bot = Omit<
    Application,
    | "slug"
    | "primary_sku_id"
    | "guild_id"
    | "summary"
    | "rpc_origins"
    | "cover_image"
  >;

  /**
   * The application structure found both both bots and/or RPC applications.
   */
  export type RPC = Bot & Pick<Application, "rpc_origins" | "cover_image">;
}
