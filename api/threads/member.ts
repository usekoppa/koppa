import type { ISO8601, Snowflake } from "../types/mod.ts";
import { $TODO } from "../../utils/type_util.ts";
import { _ThreadMembersRoute } from "./_thread_members_route.ts";

export interface ThreadMember {
  id?: Snowflake;
  user_id?: Snowflake;
  join_timestamp: ISO8601;
  flags: number;
}

export namespace ThreadMember {
  export namespace REST {
    export namespace GET {
      /**
       * Get Thread Member
       * GET `/channels/{channel.id}/thread-members/{user.id}`
       *
       * Returns a thread member object for the specified user if they are a member of the thread,
       * returns a 404 response otherwise.
       *
       * https://discord.com/developers/docs/resources/channel#get-thread-member
       */
      export namespace GetThreadMember {
        export type Route<
          ChannelID extends Snowflake = Snowflake,
          UserID extends Snowflake = Snowflake,
        > = _ThreadMembersRoute<ChannelID, UserID>;

        export const Route = _ThreadMembersRoute;

        export type Intents = $TODO<string>;

        export type Response = Required<ThreadMember>;
      }

      /**
       * List Thread Members
       * GET `/channels/{channel.id}/thread-members`
       *
       * Returns array of thread members objects that are members of the thread.
       *
       * This endpoint is restricted according to whether the `GUILD_MEMBERS` Privileged Intent is enabled for your application.
       *
       * https://discord.com/developers/docs/resources/channel#list-thread-members
       */
      export namespace ListThreadMembers {
        export type Route<
          ChannelID extends Snowflake = Snowflake,
        > = `/channels/${ChannelID}/thread-members`;

        function Route<
          ChannelID extends Snowflake,
        >(
          channelID: ChannelID,
        ): Route<ChannelID> {
          return `/channels/${channelID}/thread-members`;
        }

        export type Response = Required<ThreadMember>[];
      }
    }
  }
}
