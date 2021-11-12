import { Snowflake } from "../types/snowflake.ts";
import { Nullable, ZeroToNine } from "../_internals/utils.ts";
import { Guild } from "../guilds/mod.ts";

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
}
