import { ChannelMention } from "../channels/mention.ts";
import { GuildMember } from "../guilds/member.ts";
import { ISO8601, Snowflake } from "../types/mod.ts";
import { User } from "../users/user.ts";
import { $TODO, Nullable } from "../_internals/utils.ts";

export interface Message {
  id: Snowflake;
  channel_id: Snowflake;
  guild_id?: Snowflake;
  author: User.Partial;
  member?: GuildMember;
  /** The content of the message - 2000 characters long. */
  content: string;
  /** The timestamp (ISO8601) that the message was sent at. */
  timestamp: ISO8601;
  /** When this message was edited - `null` if never. */
  edited_timestamp: Nullable<ISO8601>;
  /** Whether this was a Text-To-Speech (TTS) message. */
  tts: boolean;
  /** Whether this message mentions everyone. */
  mention_everyone: boolean;
  /** Users specifically mentioned in the message - With a partial `member` field if applicable. */
  mentions: (User.Partial & { member: Omit<GuildMember, "user"> })[];
  /** Roles specifically mentioned in this message. */
  mention_roles: Snowflake[];
  /** Channels specifically mentioned in this message. */
  mention_channels: ChannelMention[];
  /** Any attached files. */
  embeds: $TODO[];
  /** Any reactions to the message. */
  reactions?: Reaction
}

export namespace Message {
  export namespace REST {
    export namespace GET {
      export namespace GetChannelMessage {}

      export namespace GetChannelMessages {}

      export namespace GetPinnedMessages {}
    }

    export namespace PATCH {
      export namespace EditMessage {}
    }

    export namespace PUT {
      export namespace PinMessage {}
    }

    export namespace POST {
      export namespace CreateChannelMessage {}

      export namespace CrosspostMessage {}

      export namespace BulkDeleteMessages {}
    }

    export namespace DELETE {
      export namespace DeleteMessage {}

      export namespace UnpinMessage {}
    }
  }

  export namespace Gateway {
    export namespace MessageCreate {
      export type DispatchData = _DispatchData;
    }

    export namespace MessageUpdate {
      export type DispatchData = _DispatchData;
    }

    type _DispatchData = Omit<Message, "member"> & {
      member: Omit<GuildMember, "user">;
    };
  }
}
