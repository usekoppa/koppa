import { Application } from "../types/application.ts";
import { ISO8601 } from "../types/ISO8601.ts";
import { User } from "./user.ts";

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
  /** All OAuth2 scopes that Discord supports. */
  export type Scopes =
    | Scopes.Activities.Read
    | Scopes.Activities.Write
    | Scopes.Applications.Builds.Read
    | Scopes.Applications.Builds.Write
    | Scopes.Applications.Commands.Commands
    | Scopes.Applications.Commands.Update
    | Scopes.Bot
    | Scopes.Connections
    | Scopes.Email
    | Scopes.GroupDM.Join
    | Scopes.Guilds.Guilds
    | Scopes.Guilds.Join
    | Scopes.Identify
    | Scopes.Messages.Read
    | Scopes.Relationships.Read
    | Scopes.RPC.RPC
    | Scopes.RPC.Activities.Write
    | Scopes.RPC.Notifications.Read
    | Scopes.RPC.Voice.Read
    | Scopes.RPC.Voice.Write;

  /**
   * These are a list of all the OAuth2 scopes that Discord supports.
   * Some scopes require approval from Discord to use.
   * Requesting them from a user without approval from Discord may cause errors or undocumented behavior in the OAuth2 flow.
   * https://discord.com/developers/docs/topics/oauth2#shared-resources-oauth2-scopes
   */
  export namespace Scopes {
    export namespace Activities {
      /** Allows your app to fetch data from a user's "Now Playing/Recently Played" list - Requires Discord approval. */
      export type Read = "activities.read";
      export const Read: Read = "activities.read";

      /** Allows your app to update a user's activity - Requires Discord approval, unless using the GameSDK Activity Manager. */
      export type Write = "activities.write";
      export const Write: Write = "activities.write";
    }

    export namespace Applications {
      export namespace Builds {
        /** Allows your app to read build data for a user's applications. */
        export type Read = "applications.builds.read";
        export const Read: Read = "applications.builds.read";

        /** Allows your app to upload/update builds for a user's applications - Requires Discord approval. */
        export type Write = "applications.builds.write";
        export const Write: Write = "applications.builds.write";
      }

      export namespace Commands {
        /** Allows your app to use commands in a guild. */
        export type Commands = "applications.commands";
        export const Commands: Commands = "applications.commands";

        /** Allows your app to update its commands via this bearer token - Client credentials grant only. */
        export type Update = "applications.commands.update";
        export const Update: Update = "applications.commands.update";
      }

      /** Allows your app to read entitlements for a user's applications. */
      export type Entitlements = "applications.entitlements";
      export const Entitlements: Entitlements = "applications.entitlements";

      export namespace Store {
        /** Allows your app to read and update store data (SKUs, store listings, achievements, etc.) for a user's applications. */
        export type Update = "applications.store.update";
        export const Update: Update = "applications.store.update";
      }
    }

    /** For oauth2 bots, this puts the bot in the user's selected guild by default. */
    export type Bot = "bot";
    export const Bot: Bot = "bot";

    /** Allows `/users/@me/connections` to return linked third-party accounts. */
    export type Connections = "connections";
    export const Connections: Connections = "connections";

    /** Enables `/users/@me` to return an `email` */
    export type Email = "email";
    export const Email: Email = "email";

    export namespace GroupDM {
      /** Allows your app to join users to a group DM. */
      export type Join = "gdm.join";
      export const Join: Join = "gdm.join";
    }

    export namespace Guilds {
      /** Allows `/users/@me/guilds` to return basic information about all of a user's guilds. */
      export type Guilds = "guilds";
      export const Guilds: Guilds = "guilds";

      /** Allows `/guilds/{guild.id}/members/{user.id}` to be used for joining users to a guild. */
      export type Join = "guilds.join";
      export const Join: Join = "guilds.join";
    }

    /** Allows `/users/@me` without `email`. */
    export type Identify = "identify";
    export const Identify: Identify = "identify";

    export namespace Messages {
      /**
       * For local rpc server api access,
       * this allows you to read messages from all client channels (otherwise restricted to channels/guilds your app creates).
       */
      export type Read = "messages.read";
      export const Read: Read = "messages.read";
    }

    export namespace Relationships {
      /** Allows your app to know a user's friends and implicit relationships - Requires Discord approval. */
      export type Read = "relationships.read";
      export const Read: Read = "relationships.read";
    }

    export namespace RPC {
      /** For local rpc server access, this allows you to control a user's local Discord client - Requires Discord approval. */
      export type RPC = "rpc";
      export const RPC: RPC = "rpc";

      export namespace Activities {
        /** For local rpc server access, this allows you to update a user's activity - Requires Discord approval. */
        export type Write = "rpc.activities.write";
        export const Write: Write = "rpc.activities.write";
      }

      export namespace Notifications {
        /** For local rpc server access, this allows you to receive notifications pushed out to the user - Requires Discord approval. */
        export type Read = "rpc.notifications.read";
        export const Read: Read = "rpc.notifications.read";
      }

      export namespace Voice {
        /** For local rpc server access, this allows you to read a user's voice settings and listen for voice events - Requires Discord approval. */
        export type Read = "rpc.voice.read";
        export const Read: Read = "rpc.voice.read";

        /** For local rpc server access, this allows you to update a user's voice settings - Requires Discord approval. */
        export type Write = "rpc.voice.write";
        export const Write: Write = "rpc.voice.write";
      }
    }

    export namespace Webhook {
      /** This generates a webhook that is returned in the OAuth2 token response for authorisation code grants. */
      export type Incoming = "webhook.incoming";
      export const Incoming: Incoming = "webhook.incoming";
    }
  }

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
        export const Route: Route = "/oauth2/applications/@me";

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
        export const Route: Route = "/oauth2/@me";

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
          scopes: Scopes[];
          /** The user who has authorised, if the user has authorised with the `identify` scope. */
          user?: User.Partial;
        }
      }
    }
  }
}
