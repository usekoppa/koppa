import { Image, Locale, Snowflake } from "../types/mod.ts";
import { Nullable } from "../_internals/utils.ts";
import { Guild } from "../guilds/mod.ts";
import { UserFlags } from "./flags.ts";
import { UserPremiumType } from "./premium_type.ts";
import { Channel } from "../channels/channel.ts";
import { OAuth2Scopes } from "../OAuth2/mod.ts";
import { SerialisedPermissions } from "../permissions/mod.ts";
import { UserDiscriminator } from "./discriminator.ts";

/**
 * Users in Discord are generally considered the base entity.
 * Users can spawn across the entire platform, be members of guilds, participate in text and voice chat, and much more.
 * Users are separated by a distinction of "bot" vs "normal."
 * Although they are similar, bot users are automated users that are "owned" by another user.
 * Unlike normal users, bot users do not have a limitation on the number of Guilds they can be a part of.
 *
 *  https://discord.com/developers/docs/resources/user#user-object-user-structure
 */
export interface User extends User.Partial {
  bot?: boolean;
  system?: boolean;
  mfa_enabled?: boolean;
  banner?: Nullable<string>;
  accent_color?: Nullable<number>;
  locale?: Locale;
  verified?: boolean;
  email?: Nullable<string>;
  premium_type?: UserPremiumType;
  public_flags?: UserFlags | number;
  flags?: UserFlags | number;
}

export namespace User {
  export interface Partial {
    id: Snowflake;
    username: string;
    discriminator: UserDiscriminator;
    avatar: Nullable<string>;
  }

  export namespace REST {
    export namespace GET {
      export namespace GetCurrentUser {
        export type Route = "/users/@me";
        export const Route: Route = "/users/@me";

        export namespace OAuth2 {
          export type Scopes = [
            OAuth2Scopes.Identify,
            OAuth2Scopes.Email?,
          ];

          export function Scopes(
            withEmail = false,
          ): typeof withEmail extends true ? Required<Scopes> : Scopes {
            const scopes: Scopes = [OAuth2Scopes.Identify];
            if (withEmail) scopes.push(OAuth2Scopes.Email);
            return scopes;
          }
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
          export type Scopes = [OAuth2Scopes.Guilds.Guilds];
          export const Scopes: Scopes = [OAuth2Scopes.Guilds.Guilds];
        }

        export interface Response extends Guild.Partial {
          owner: boolean;
          permissions: SerialisedPermissions;
        }
      }
    }

    export namespace PATCH {
      export namespace ModifyCurrentUser {
        export type Route = "/users/@me";
        export const Route: Route = "/users/@me";

        export interface Body {
          /** If passed, modifies the user's username if available - discriminator may change on success. */
          username?: string;
          /** If passed, modifies the user's avatar. */
          avatar?: Nullable<Image>;
        }

        export type Response = User;
      }
    }

    export namespace POST {
      export namespace CreateDM {
        export type Route = "/users/@me/channels";
        export const Route: Route = "/users/@me/channels";

        export interface Body {
          /** The recipient to open a DM channel with. */
          recipient_id: Snowflake;
        }

        export type Response = Channel.DM;
      }

      export namespace CreateGroupDM {
        export type Route = "/users/@me/channels";
        export const Route: Route = "/users/@me/channels";

        export namespace OAuth2 {
          export type Scopes = [OAuth2Scopes.GroupDM.Join];
          export const Scopes: Scopes = [OAuth2Scopes.GroupDM.Join];
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

        export type Response = Channel.DM.Group;
      }
    }

    export namespace DELETE {
      export namespace LeaveGuild {
        export type Route<GuildID extends Snowflake = Snowflake> =
          `/users/@me/guilds/${GuildID}`;

        export function Route<GuildID extends Snowflake>(
          guildID: GuildID,
        ): Route<GuildID> {
          return `/users/@me/guilds/${guildID}`;
        }
      }
    }
  }
}
