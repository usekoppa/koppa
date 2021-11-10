import { OAuth2 as OAuth2NS } from "./oauth2.ts";
import { Snowflake } from "../types/snowflake.ts";
import { Nullable, ZeroToNine } from "../_internals/utils.ts";
import { Channel } from "./channel.ts";
import { Guild } from "./guild.ts";

/**
 * Users in Discord are generally considered the base entity.
 * Users can spawn across the entire platform, be members of guilds, participate in text and voice chat, and much more.
 * Users are separated by a distinction of "bot" vs "normal."
 * Although they are similar, bot users are automated users that are "owned" by another user.
 * Unlike normal users, bot users do not have a limitation on the number of Guilds they can be a part of.
 *
 * @see {@link https://discord.com/developers/docs/resources/user#user-object-user-structure | User Structure}
 */
export interface User extends User.Partial {
  bot?: boolean;
  system?: boolean;
  mfa_enabled?: boolean;
  banner?: Nullable<string>;
  accent_color?: Nullable<number>;
  locale?: string;
  verified?: boolean;
  email?: Nullable<string>;
  premium_type?: User.Premium;
  public_flags?: User.Flags | number;
}

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
    flags?: User.Flags | number;
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
    visibility: Connection.Visibility;
  }

  export namespace Connection {
    export const enum Visibility {
      None = 0,
      Everyone = 1,
    }
  }

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
        export type Route<UserID extends Snowflake = Snowflake> = `/users/${UserID}`;
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

          /**
           * If passed, modifies the user's avatar.
           */
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

          /**
           * A dictionary of user IDs to their respective nicknames.
           */
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
}

User.REST.GET.GetCurrentUser.Route