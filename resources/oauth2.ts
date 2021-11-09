import { Application } from "../types/application.ts";
import { User } from "./user.ts";

export namespace OAuth2 {
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

  export namespace Scopes {
    export namespace Activities {
      /**
       * Allows your app to fetch data from a user's "Now Playing/Recently Played" list.
       *
       * @remarks
       * Requires Discord approval.
       */
      export type Read = "activities.read";
      export const Read: Read = "activities.read";

      /**
       * Allows your app to update a user's activity.
       *
       * @remarks
       * Requires Discord approval, unless using the GameSDK Activity Manager.
       */
      export type Write = "activities.write";
      export const Write: Write = "activities.write";
    }

    export namespace Applications {
      export namespace Builds {
        /**
         * Allows your app to read build data for a user's applications
         */
        export type Read = "applications.builds.read";
        export const Read: Read = "applications.builds.read";

        export type Write = "applications.builds.write";
        export const Write: Write = "applications.builds.write";
      }

      export namespace Commands {
        export type Commands = "applications.commands";
        export const Commands: Commands = "applications.commands";

        export type Update = "applications.commands.update";
        export const Update: Update = "applications.commands.update";
      }

      export type Entitlements = "applications.entitlements";
      export const Entitlements: Entitlements = "applications.entitlements";

      export namespace Store {
        export type Update = "applications.store.update";
        export const Update: Update = "applications.store.update";
      }
    }

    export type Bot = "bot";
    export const Bot: Bot = "bot";

    export type Connections = "connections";
    export const Connections: Connections = "connections";

    export type Email = "email";
    export const Email: Email = "email";

    export namespace GroupDM {
      export type Join = "gdm.join";
      export const Join: Join = "gdm.join";
    }

    export namespace Guilds {
      export type Guilds = "guilds";
      export const Guilds: Guilds = "guilds";

      export type Join = "guilds.join";
      export const Join: Join = "guilds.join";
    }

    export type Identify = "identify";
    export const Identify: Identify = "identify";

    export namespace Messages {
      export type Read = "messages.read";
      export const Read: Read = "messages.read";
    }

    export namespace Relationships {
      export type Read = "relationships.read";
      export const Read: Read = "relationships.read";
    }

    export namespace RPC {
      export type RPC = "rpc";
      export const RPC: RPC = "rpc";

      export namespace Activities {
        export type Write = "rpc.activities.write";
        export const Write: Write = "rpc.activities.write";
      }

      export namespace Notifications {
        export type Read = "rpc.notifications.read";
        export const Read: Read = "rpc.notifications.read";
      }

      export namespace Voice {
        export type Read = "rpc.voice.read";
        export const Read: Read = "rpc.voice.read";

        export type Write = "rpc.voice.write";
        export const Write: Write = "rpc.voice.write";
      }
    }

    export namespace Webhook {
      export type Incoming = "webhook.incoming";
      export const Incoming: Incoming = "webhook.incoming";
    }
  }

  export namespace REST {
    export namespace GET {
      /**
       * Returns the bot's application object without flags.
       */
      export namespace CurrentBotApplicationInformation {
        export type Route = "/oauth2/applications/@me";
        export const Route: Route = "/oauth2/applications/@me";

        export type Response = Omit<Application.Bot, "flags">;
      }

      /**
       * Returns info about the current authorisation.
       *
       * @remarks
       * Requires authentication with a bearer token.
       */
      export namespace CurrentAuthorisationInformation {
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
          /**
           * The current application.
           */
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

          /**
           * The scopes the user has authorised the application for.
           */
          scopes: Scopes[];

          /**
           * When the access token expires.
           *
           * @remarks
           * Uses ISO 8601 format.
           */
          expires: string;

          /**
           * Te user who has authorised,
           * if the user has authorised with the identify scope
           */
          user?: User.Partial;
        }
      }
    }
  }
}
