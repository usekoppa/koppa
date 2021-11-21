import type { Snowflake } from "../types/snowflake.ts";
import type { Nullable } from "../../utils/type_util.ts";
import type { Team } from "../teams/team.ts";
import type { User } from "../users/user.ts";
import type { ApplicationFlags } from "./flags.ts";

/** Properties of an application */
export interface Application {
  /** The ID of the application. */
  id: Snowflake;
  /** The name of the application. */
  name: string;
  /** The icon (hash) of the application. */
  icon: Nullable<string>;
  /** The description of the application. */
  description: string;
  /** An array of RPC origin URLs, if RPC is enabled. */
  rpc_origins?: string[];
  /** Whether or not anyone can add the application's bot to a guild - Only the owner can add the bot if set to `false`. */
  bot_public: boolean;
  /** When `true` the application's bot will only join upon completion of the full OAuth2 code grant flow. */
  bot_require_code_grant: boolean;
  /** The URL of the application's Terms of Service. */
  terms_of_service_url?: string;
  /** The URL of the application's privacy policy. */
  privacy_policy_url?: string;
  /** Information about the owner of the application. */
  owner?: User.Partial;
  /** The summary field for the store page of its primary SKU - Only for for games sold on Discord. */
  summary: string;
  /** The hexadecimally encoded key for verification in interactions and the GameSDK's `GetTicket` function. */
  verify_key: string;
  /** If the application belongs to a team, this will be a means to access the list of the members of that team. */
  team?: Nullable<Pick<Team, "id" | "icon" | "members">>;

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
  /** The application's default rich presence invite cover image (hash). */
  cover_image?: string;
  /** The application's public flags. */
  flags?: ApplicationFlags | number;
}

/**
 * Application resource
 *
 * https://discord.com/developers/docs/resources/application
 */
export namespace Application {
  /** The application structure found exclusively for bots. */
  export type Bot = Omit<
    Application,
    | "slug"
    | "primary_sku_id"
    | "guild_id"
    | "summary"
    | "rpc_origins"
    | "cover_image"
  >;

  /** The application structure found both both bots and/or RPC applications. */
  export type RPC = Bot & Pick<Application, "rpc_origins" | "cover_image">;

  export namespace REST {
    export namespace GET {
      /**
       * Get Current Bot Application Information
       * GET `/oauth2/applications/@me`
       *
       * Returns the bot's application object without `flags`.
       * https://discord.com/developers/docs/topics/oauth2#get-current-authorization-information
       */
      export namespace GetCurrentBotApplicationInformation {
        export type Route = "/oauth2/applications/@me";
        export function Route(): Route {
          return "/oauth2/applications/@me";
        }

        export type Response = Omit<Application.Bot, "flags">;
      }
    }
  }
}
