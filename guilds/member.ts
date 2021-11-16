import type { SerialisedPermissions } from "../permissions/serialised.ts";
import type { ISO8601, Snowflake } from "../types/mod.ts";
import type { User } from "../users/user.ts";
import type { Nullable } from "../_internals/utils.ts";

/**
 * Guild Member Object
 *
 * The field `user` won't be included in the member object attached to `MESSAGE_CREATE` and `MESSAGE_UPDATE` gateway events.
 * In `GUILD_` events, `pending` will always be included as `true` or `false`.
 * In non `GUILD_` events which can only be triggered by non-`pending` users, `pending` will not be included.
 *
 * https://discord.com/developers/docs/resources/guild#guild-member-object
 */
export interface GuildMember {
  user?: User;
  nick?: Nullable<string>;
  avatar?: Nullable<string>;
  roles: Snowflake[];
  joined_at: ISO8601;
  premium_since?: Nullable<ISO8601>;
  deaf: boolean;
  mute: boolean;
  /** Whether the user has not yet passed the guild's Membership Screening requirements. */
  pending?: boolean;
  /** Total permissions of the member in the channel, including overwrites - returned when in the interaction object. */
  permissions?: SerialisedPermissions;
}

export namespace GuildMember {
  export namespace REST {
    export namespace GET {
      export namespace GetGuildMember {}

      export namespace ListGuildMembers {}

      export namespace SearchGuildMembers {}
    }

    export namespace PATCH {
      export namespace ModifyGuildMember {}

      export namespace ModifyCurrentMember {}

      /** @deprecated */
      export namespace ModifyCurrentUserNick {}
    }

    export namespace PUT {
      export namespace AddGuildMember {}

      export namespace AddGuildMemberRole {}
    }

    export namespace DELETE {
      export namespace RemoveGuildMemberRole {}

      export namespace RemoveGuildMember {}
    }
  }
}
