import { Snowflake } from "../snowflake.ts";
import { $TODO, Nullable } from "../_internals/utils.ts";
import { Channel } from "./channel.ts";
import { Guild as GuildNS } from "./guild.ts";
import { User } from "./user.ts";
import { Webhook } from "./webhook.ts";

export interface AuditLog {
  audit_log_entries: AuditLog.Entry[];
  integrations: GuildNS.Integration[];
  threads: Channel.Thread[];
  users: User[];
  webhooks: Webhook;
}

export namespace AuditLog {
  export const enum Event {
    GuildUpdate = 1,
    ChannelCreate = 10,
    ChannelUpdate = 11,
    ChannelDelete = 12,
    ChannelOverwriteCreate = 13,
    ChannelOverwriteUpdate = 14,
    ChannelOverwriteDelete = 15,
    MemberKick = 20,
    MemberPrune = 21,
    MemberBanAdd = 22,
    MemberBanRemove = 23,
    MemberUpdate = 24,
    MemberRoleUpdate = 25,
    MemberMove = 26,
    MemberDisconnect = 27,
    BotAdd = 28,
    RoleCreate = 30,
    RoleUpdate = 31,
    RoleDelete = 32,
    InviteCreate = 40,
    InviteUpdate = 41,
    InviteDelete = 42,
    WebhookCreate = 50,
    WebhookUpdate = 51,
    WebhookDelete = 52,
    EmojiCreate = 60,
    EmojiUpdate = 61,
    EmojiDelete = 62,
    MessageDelete = 72,
    MessageBulkDelete = 73,
    MessagePin = 74,
    MessageUnpin = 75,
    IntegrationCreate = 80,
    IntegrationUpdate = 81,
    IntegrationDelete = 82,
    StageInstanceCreate = 83,
    StageInstanceUpdate = 84,
    StageInstanceDelete = 85,
    StickerCreate = 90,
    StickerUpdate = 91,
    StickerDelete = 92,
    ThreadCreate = 110,
    ThreadUpdate = 111,
    ThreadDelete = 112,
  }

  interface _Entry<Type extends Event = Event> {
    target_id: Nullable<Snowflake>;
    changes?: Change[];
    user_id: Nullable<Snowflake>;
    id: Snowflake;
    action_type: Type;
    options?: Type extends keyof _OptionsMapper ? _OptionsMapper[Type]
      : Options;
    reason?: string;
  }

  export type Entry<Type = unknown> = Type extends Event ? 
    & _Entry<Type>
    & (Type extends keyof _OptionsMapper
      ? Required<Pick<_Entry<Type>, "options">>
      : never)
    : _Entry<Event>;

  interface _OptionsMapper {
    [Event.ChannelOverwriteCreate]: Options.ChannelOverwrite;
    [Event.ChannelOverwriteDelete]: Options.ChannelOverwrite;
    [Event.ChannelOverwriteUpdate]: Options.ChannelOverwrite;
    [Event.MemberDisconnect]: Options.MemberDisconnect;
    [Event.MemberMove]: Options.MemberMove;
    [Event.MemberPrune]: Options.MemberPrune;
    [Event.MessageBulkDelete]: Options.MessageBulkDelete;
    [Event.MessageDelete]: Options.MessageBulkDelete;
    [Event.MessagePin]: Options.MessagePinAndUnpin;
    [Event.MessageUnpin]: Options.MessagePinAndUnpin;
    [Event.StageInstanceCreate]: Options.StageInstanceAction;
    [Event.StageInstanceDelete]: Options.StageInstanceAction;
    [Event.StageInstanceUpdate]: Options.StageInstanceAction;
  }

  export interface Options {
    channel_id: Snowflake;
    count: string;
    delete_member_days: string;
    id: Snowflake;
    members_removed: string;
    message_id: Snowflake;
    role_name?: string;
    type?: Options.ChannelOverwrite.OverwrittenEntityType;
  }

  export namespace Options {
    export type ChannelOverwrite =
      | ChannelOverwrite.RoleChannelOverwrite
      | ChannelOverwrite.MemberChannelOverwrite;

    export namespace ChannelOverwrite {
      export const enum OverwrittenEntityType {
        Role = "0",
        Member = "1",
      }

      export type RoleChannelOverwrite = _ChannelOverwrite<
        OverwrittenEntityType.Role
      >;

      export type MemberChannelOverwrite = Omit<
        _ChannelOverwrite<OverwrittenEntityType.Member>,
        "role_name"
      >;

      type _ChannelOverwrite<
        Type extends OverwrittenEntityType = OverwrittenEntityType,
      > =
        & Omit<
          Required<
            Pick<
              Options,
              "id" | "channel_id" | "role_name" | "type"
            >
          >,
          "type"
        >
        & {
          type: Type;
        };
    }

    export type MemberDisconnect = Required<Pick<Options, "count">>;
    export type MemberMove = Required<Pick<Options, "channel_id" | "count">>;
    export type MemberPrune = Required<
      Pick<Options, "delete_member_days" | "members_removed">
    >;

    export type MessageBulkDelete = Required<Pick<Options, "count">>;
    export type MessageDelete = Required<Pick<Options, "channel_id" | "count">>;
    export type MessagePinAndUnpin = Required<
      Pick<Options, "channel_id" | "message_id">
    >;

    export type StageInstanceAction = Required<Pick<Options, "channel_id">>;
  }

  export interface Change {
    new_value?: $TODO;
    old_value?: $TODO;
    key: string;
  }

  export namespace Change {
    export namespace Key {
      export namespace Guild {
        export namespace AFK {
          /**
           * AFK channel changed.
           */
          export type Channel = Snowflake;
          export const Channel = "afk_channel_id";

          /**
           * AFK timeout duration changed.
           */
          export type Timeout = number;
          export const Timeout = "afk_timeout";
        }
      }

      export namespace Role {
        export type Name = string;
        export const Name = "name";
        /**
         * New role added.
         */
        export type Add = GuildNS.Role.Partial;
        export const Add = "$add";

        /**
         * Role removed.
         */
        export type Remove = GuildNS.Role.Partial;
        export const Remove = "$remove";

        /**
         * A permission on a text or voice channel was allowed for a role
         */
        export type AllowPermission = string;
        export const AllowPermission = "allow";

        /**
         * A permission on a text or voice channel was denied for a role
         */
        export type DenyPermission = string;
        export const DenyPermission = "deny";

        /**
         * The color of the role changed.
         */
        export type Color = number;
        export const Color = "color";

        /**
         * The colour of the role changed.
         */
        export type Colour = Color;
        export const Colour = Color;

        /**
         * Role unicode emoji changed.
         */
        export type UnicodeEmoji = string;
        export const UnicodeEmoji = "unicode_emoji";
      }
    }
  }
}
