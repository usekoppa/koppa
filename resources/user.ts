import { OAuth2 as OAuth2NS } from "../oauth2.ts";
import { Snowflake } from "../snowflake.ts";
import { Nullable, ZeroToNine } from "../_internals/utils.ts";
import { Channel } from "./channel.ts";
import { Guild } from "./guild.ts";

export namespace User {
  export type Discriminator =
    `${ZeroToNine}${ZeroToNine}${ZeroToNine}${ZeroToNine}`;

  export const enum Premium {
    None,
    NitroClassic,
    Nitro,
  }

  export const enum Flags {
    None = 0,
    Staff = 1 << 0,
    Partner = 1 << 1,
    HypeSquad = 1 << 2,
    BugHunterLevel1 = 1 << 3,
    HypeSquadOnlineHouse1 = 1 << 6,
    HypeSquadOnlineHouse2 = 1 << 7,
    HypeSquadOnlineHouse3 = 1 << 8,
    PremiumEarlySupporter = 1 << 9,
    TeamPseudoUser = 1 << 10,
    BugHunterLevel2 = 1 << 14,
    VerifiedBot = 1 << 16,
    VerifiedDeveloper = 1 << 17,
    CertifiedModerator = 1 << 18,
    BotHTTPInteractions = 1 << 19,
  }

  export interface Partial {
    id: Snowflake;
    username: string;
    discriminator: Discriminator;
    avatar: Nullable<string>;
  }

  export interface User extends Partial {
    bot?: boolean;
    system?: boolean;
    mfa_enabled?: boolean;
    banner?: Nullable<string>;
    accent_color?: Nullable<number>;
    locale?: string;
    verified?: boolean;
    email?: Nullable<string>;
    flags?: Flags | number;
    premium_type?: Premium;
    public_flags?: Flags | number;
  }

  export namespace Connection {
    export const enum Visibility {
      None = 0,
      Everyone = 1,
    }

    export interface Connection {
      id: Snowflake;
      name: string;
      type: string;
      revoked?: boolean;
      integrations?: Guild.Integration[];
      verified: boolean;
      friend_sync: boolean;
      show_activity: boolean;
      visibility: Visibility;
    }
  }

  export namespace REST {
    export namespace GET {
      export namespace CurrentUser {
        export type Route = "/users/@me";
        export const Route: Route = "/users/@me";

        export namespace OAuth2 {
          export type Scopes = [
            OAuth2NS.Scopes.Identify,
            OAuth2NS.Scopes.Email?,
          ];

          export const Scopes: Scopes = [OAuth2NS.Scopes.Identify];
        }

        export namespace Response {
          export type Data = User & Required<Pick<User, "email">>;
        }
      }

      export namespace User {
        export type Route<ID extends Snowflake = Snowflake> = `/users/${ID}`;
        export function Route<ID extends Snowflake = Snowflake>(
          ID: ID,
        ): Route<ID> {
          return `/users/${ID}`;
        }

        export namespace Response {
          export type Data = User;
        }
      }

      export namespace CurrentUserGuilds {
        export type Route = "/users/@me/guilds";
        export const Route: Route = "/users/@me/guilds";

        export interface Query {
          before: Snowflake;
          after: Snowflake;
          limit: number;
        }

        export namespace OAuth2 {
          export type Scopes = [OAuth2NS.Scopes.Guilds.Guilds];
          export const Scopes: Scopes = [OAuth2NS.Scopes.Guilds.Guilds];
        }

        export namespace Response {
          export interface Data extends Guild.Partial {
            owner: boolean;
            permissions: string;
          }
        }
      }

      export namespace UserConnections {
        export type Route = "/users/@me/connections";
        export const Route: Route = "/users/@me/connections";

        export namespace OAuth2 {
          export type Scopes = [OAuth2NS.Scopes.Guilds.Guilds];
          export const Scopes: Scopes = [OAuth2NS.Scopes.Guilds.Guilds];
        }

        export namespace Response {
          export type Data = Connection.Connection[];
        }
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

          /**
           * If passed, modifies the user's avatar.
           */
          avatar?: Nullable<string>;
        }

        export namespace Response {
          export type Data = User;
        }
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

        export namespace Response {
          export type Data = Channel.DM.Channel;
        }
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

          /**
           * A dictionary of user IDs to their respective nicknames.
           */
          nicks: {
            [userID: Snowflake]: string;
          };
        }

        export namespace Response {
          export type Data = Channel.DM.GroupDM;
        }
      }
    }

    export namespace DELETE {
      export namespace LeaveGuild {
        export type Route<ID extends Snowflake = Snowflake> =
          `/users/@me/guilds/${ID}`;

        export function Route<ID extends Snowflake = Snowflake>(
          ID: ID,
        ): Route<ID> {
          return `/users/@me/guilds/${ID}`;
        }

        export namespace Response {
          export type Status = 204;
          export const Status: Status = 204;

          export type Data = never;
        }
      }
    }
  }
}
