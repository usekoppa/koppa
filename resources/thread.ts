import { Snowflake } from "../types/snowflake.ts";
import { Channel } from "./channel.ts";

export type Thread<Type extends Thread.Type = Channel.Type.GuildPublicThread> =
  & Required<
    Pick<
      Channel,
      | "name"
      | "last_message_id"
      | "last_pin_timestamp"
      | "rate_limit_per_user"
      | "owner_id"
      | "parent_id"
      | "guild_id"
      | "member"
      | "message_count"
      | "member_count"
    >
  >
  & Channel.Partial<Type>
  & { thread_metadata: Thread.Metadata<Type> };

export namespace Thread {
  export type Type =
    | Channel.Type.GuildPublicThread
    | Channel.Type.GuildPrivateThread
    | Channel.Type.GuildNewsThread;

  export type Public = Thread<Channel.Type.GuildPublicThread>;
  export type Private = Thread<Channel.Type.GuildPrivateThread>;

  export interface Metadata<
    Type extends Thread.Type = Channel.Type.GuildPublicThread,
  > {
    archived: boolean;
    auto_archive_duration: number;
    archive_timestamp: string;
    locked: Type extends Channel.Type.GuildPrivateThread ? boolean : false;
  }

  export interface Member {
    id?: Snowflake;
    user_id?: Snowflake;
    join_timestamp: string;
    flags: number;
  }

  export namespace REST {
    export namespace GET {
      export namespace GetThreadMember {
        export type Route<
          ChannelID extends Snowflake = Snowflake,
          UserID extends Snowflake = Snowflake,
        > = _ThreadMembersRoute<ChannelID, UserID>;

        export const Route = _ThreadMembersRoute;

        export type Response = Required<Member>;
      }

      export namespace ListThreadMember {
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

        export type Response = Required<Member>[];
      }

      export namespace ListPublicArchivedThreads {
        export type Route<ChannelID extends Snowflake = Snowflake> =
          `/channels/${ChannelID}/threads/archived/public`;

        export function Route<ChannelID extends Snowflake>(
          channelID: ChannelID,
        ): Route<ChannelID> {
          return `/channels/${channelID}/threads/archived/public`;
        }
      }

      export namespace ListPrivateArchivedThreads {}

      export namespace ListJoinedPrivateArchivedThreads {}
    }

    type _ThreadMembersRoute<
      ChannelID extends Snowflake = Snowflake,
      UserID extends Snowflake = Snowflake,
    > = `/channels/${ChannelID}/thread-members/${UserID}`;

    function _ThreadMembersRoute<
      ChannelID extends Snowflake,
      UserID extends Snowflake,
    >(
      channelID: ChannelID,
      userID: UserID,
    ): _ThreadMembersRoute<ChannelID, UserID> {
      return `/channels/${channelID}/thread-members/${userID}`;
    }
  }
}
