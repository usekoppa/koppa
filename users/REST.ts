import { OAuth2 as OAuth2NS } from "../OAuth2/mod.ts";
import { Channel } from "../channels/mod.ts";
import { User } from "./user.ts";
import { Snowflake } from "../types/snowflake.ts";
import { Nullable } from "../_internals/utils.ts";

export namespace REST {
  export namespace GET {
    export namespace GetCurrentUser {
      export type Route = "/users/@me";
      export const Route: Route = "/users/@me";

      export namespace OAuth2 {
        export type Scopes = [
          OAuth2NS.Scopes.Identify,
          OAuth2NS.Scopes.Email?,
        ];

        export const Scopes: Scopes = [OAuth2NS.Scopes.Identify];
      }

      export type Response = User;
    }

    export namespace GetUser {
      export type Route<UserID extends Snowflake = Snowflake> =
        `/users/${UserID}`;
      export function Route<UserID extends Snowflake>(
        userID: UserID,
      ): Route<UserID> {
        return `/users/${userID}`;
      }

      export type Response = User;
    }

    export namespace GetCurrentUserGuilds {
      export type Route = "/users/@me/guilds";
      export const Route: Route = "/users/@me/guilds";

      export interface QueryString {
        before: Snowflake;
        after: Snowflake;
        limit: number;
      }

      export namespace OAuth2 {
        export type Scopes = [OAuth2NS.Scopes.Guilds.Guilds];
        export const Scopes: Scopes = [OAuth2NS.Scopes.Guilds.Guilds];
      }

      export interface Response extends Guild.Partial {
        owner: boolean;
        permissions: string;
      }
    }

    export namespace GetUserConnections {
      export type Route = "/users/@me/connections";
      export const Route: Route = "/users/@me/connections";

      export namespace OAuth2 {
        export type Scopes = [OAuth2NS.Scopes.Guilds.Guilds];
        export const Scopes: Scopes = [OAuth2NS.Scopes.Guilds.Guilds];
      }

      export type Response = Connection[];
    }
  }

  export namespace PATCH {
    export namespace ModifyCurrentUser {
      export type Route = "/users/@me";
      export const Route: Route = "/users/@me";

      export interface Body {
        /**
         * If passed, modifies the user's username if available.
         * If the username is successfully changed,
         * it may cause the user's discriminator to be randomized.
         */
        username?: string;

        /** If passed, modifies the user's avatar. */
        avatar?: Nullable<string>;
      }

      export type Response = User;
    }
  }

  export namespace POST {
    export namespace CreateDM {
      export type Route = "/users/@me/channels";
      export const Route: Route = "/users/@me/channels";

      export interface Body {
        /**
         * The recipient to open a DM channel with.
         */
        recipient_id: Snowflake;
      }

      export type Response = Channel.DM.Channel;
    }

    export namespace CreateGroupDM {
      export type Route = "/users/@me/channels";
      export const Route: Route = "/users/@me/channels";

      export namespace OAuth2 {
        export type Scopes = [OAuth2NS.Scopes.GroupDM.Join];
        export const Scopes: Scopes = [OAuth2NS.Scopes.GroupDM.Join];
      }

      export interface Body {
        /**
         * Access tokens of users that have
         * granted the application the `gdm.join` OAuth2 scope.
         */
        access_tokens: string[];

        /** A dictionary of user IDs to their respective nicknames. */
        nicks: {
          [userID: Snowflake]: string;
        };
      }

      export type Response = Channel.DM.GroupDM;
    }
  }

  export namespace DELETE {
    export namespace LeaveGuild {
      export type Route<UserID extends Snowflake = Snowflake> =
        `/users/@me/guilds/${UserID}`;

      export function Route<UserID extends Snowflake>(
        userID: UserID,
      ): Route<UserID> {
        return `/users/@me/guilds/${userID}`;
      }
    }
  }
}
