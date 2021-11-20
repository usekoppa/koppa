import { Emoji } from "../emojis/emoji.ts";
import { GatewayDispatchEvent } from "../gateway/dispatch_event.ts";
import { GuildMember } from "../guilds/member.ts";
import { Snowflake } from "../types/snowflake.ts";

export interface MessageReaction {
  count: number;
  me: boolean;
  emoji: Emoji.Reaction;
}

export namespace MessageReaction {
  export namespace REST {
    export namespace GET {
      export namespace GetReactions {}
    }

    export namespace POST {
      export namespace CreateReaction {}
    }

    export namespace DELETE {
      export namespace DeleteOwnReaction {}

      export namespace DeleteUserReaction {}

      export namespace DeleteAllReactions {}

      export namespace DeleteAllReactionsForEmoji {}
    }
  }

  export namespace Gateway {
    export namespace MessageReactionAdd {
      export type Event = GatewayDispatchEvent.MessageReactionAdd;
      export type Data = _Data;
    }

    export namespace MessageReactionRemove {
      export type Event = GatewayDispatchEvent.MessageReactionRemove;
      export type Data = Omit<_Data, "member">;
    }

    export namespace MessageReactionRemoveALl {
      
    }

    export interface _Data {
      user_id: Snowflake;
      channel_id: Snowflake;
      message_id: Snowflake;
      guild_id?: Snowflake;
      member?: GuildMember;
      emoji: Emoji.Reaction;
    }
  }
}
