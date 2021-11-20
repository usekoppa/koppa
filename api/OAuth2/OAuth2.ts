import type { Application } from "../application/application.ts";
import type { ISO8601 } from "../types/ISO8601.ts";
import type { User } from "../users/user.ts";
import type { OAuth2Scopes } from "./scopes.ts";

/**
 * OAuth2 Resource
 *
 * OAuth2 enables application developers to build applications that utilise authentication and data from the Discord API.
 * Within Discord, there are multiple types of OAuth2 authentication.
 * We support the authorization code grant, the implicit grant, client credentials,
 * and some modified special-for-Discord flows for Bots and Webhooks.
 *
 * https://discord.com/developers/docs/topics/oauth2#oauth2
 */
export namespace OAuth2 {
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

      /**
       * Get Current Authorization Information
       * GET `/oauth2/@me`
       *
       * Returns info about the current authorisation.
       * Requires authentication with a bearer token.
       * https://discord.com/developers/docs/topics/oauth2#get-current-authorization-information
       */
      export namespace GetCurrentAuthorisationInformation {
        export type Route = "/oauth2/@me";
        export function Route(): Route {
          return "/oauth2/@me";
        }

        export interface Headers<Token extends string = string> {
          Authorization: `Bearer ${Token}`;
        }

        export function Headers<Token extends string>(
          token: Token,
        ): Headers<Token> {
          return {
            Authorization: `Bearer ${token}`,
          };
        }

        export interface Response {
          /** The current application. */
          application: Pick<
            Application,
            | "id"
            | "name"
            | "icon"
            | "description"
            | "summary"
            | "bot_public"
            | "bot_require_code_grant"
            | "verify_key"
          >;

          /** When the access token expires. (IS08601 timestamp). */
          expires: ISO8601;
          /** The scopes the user has authorised the application for. */
          scopes: OAuth2Scopes[];
          /** The user who has authorised, if the user has authorised with the `identify` scope. */
          user?: User.Partial & Pick<User, "flags">;
        }
      }
    }
  }
}
