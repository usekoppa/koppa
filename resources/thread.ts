import { ISO8601 } from "../types/ISO8601.ts";
import { Snowflake } from "../types/snowflake.ts";
import { encodeQueryString } from "../_internals/encode_query_string.ts";
import { $TODO } from "../_internals/utils.ts";
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
    archive_timestamp: ISO8601;
    locked: Type extends Channel.Type.GuildPrivateThread ? boolean : false;
  }

  export interface Member {
    id?: Snowflake;
    user_id?: Snowflake;
    join_timestamp: ISO8601;
    flags: number;
  }

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

        export type Response = Required<Member>;
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

      /**
       * List Public Archived Threads
       * GET `/channels/{channel.id}/threads/archived/public`
       *
       * Returns archived threads in the channel that are public.
       * When called on a `GUILD_TEXT` channel, returns threads of type `GUILD_PUBLIC_THREAD`.
       * When called on a `GUILD_NEWS` channel returns threads of type `GUILD_NEWS_THREAD`.
       * Threads are ordered by `archive_timestamp`, in descending order.
       *
       * Requires the `READ_MESSAGE_HISTORY` permission.
       * 
       * https://discord.com/developers/docs/resources/channel#list-public-archived-threads
       */
      export namespace ListPublicArchivedThreads {
        export type Route<ChannelID extends Snowflake = Snowflake> =
          `/channels/${ChannelID}/threads/archived/public`;

        export function Route<ChannelID extends Snowflake>(
          channelID: ChannelID,
        ): Route<ChannelID> {
          return `/channels/${channelID}/threads/archived/public`;
        }

        export interface QueryString {
          /* Returns threads before this (ISO8601) timestamp. */
          before?: ISO8601;
          /**	Optional maximum number of threads to return. */
          limit?: number;
        }

        export function QueryString(query: QueryString) {
          return encodeQueryString(query);
        }

        export type Permissions = $TODO<string>;

        export interface Response {
          /** The public, archived threads. */
          threads: Thread[];
          /** A thread member object for each returned thread the current user has joined. */
          members: Member[];
          /** Whether there are potentially additional threads that could be returned on a subsequent call. */
          has_more: boolean;
        }
      }

      /**
       * List Private Archived Threads
       * GET `/channels/{channel.id}/threads/archived/private`
       *
       * Returns archived threads in the channel that are of type `GUILD_PRIVATE_THREAD`.
       * Threads are ordered by `archive_timestamp`, in descending order.
       *
       * Requires both the `READ_MESSAGE_HISTORY` and `MANAGE_THREADS` permissions.
       * 
       * https://discord.com/developers/docs/resources/channel#list-private-archived-threads
       */
      export namespace ListPrivateArchivedThreads {
        export type Route<ChannelID extends Snowflake = Snowflake> =
          `/channels/${ChannelID}/threads/archived/private`;

        export function Route<ChannelID extends Snowflake>(
          channelID: ChannelID,
        ): Route<ChannelID> {
          return `/channels/${channelID}/threads/archived/private`;
        }

        export interface QueryString {
          /* Returns threads before this (ISO8601) timestamp. */
          before?: ISO8601;
          /** Optional maximum number of threads to return. */
          limit?: number;
        }

        export function QueryString(query: QueryString) {
          return encodeQueryString(query);
        }

        export type Permissions = $TODO<string>;

        export interface Response {
          /** The private, archived threads. */
          threads: Thread[];
          /**	A thread member object for each returned thread the current user has joined. */
          members: Member[];
          /** Whether there are potentially additional threads that could be returned on a subsequent call. */
          has_more: boolean;
        }
      }

      /**
       * List Joined Private Archived Threads
       * GET `/channels/{channel.id}/users/@me/threads/archived/private`
       *
       * Returns archived threads in the channel that are of type `GUILD_PRIVATE_THREAD`, and the user has joined.
       * Threads are ordered by their ID, in descending order.
       *
       * Requires the `READ_MESSAGE_HISTORY` permission.
       * 
       * https://discord.com/developers/docs/resources/channel#list-joined-private-archived-threads
       */
      export namespace ListJoinedPrivateArchivedThreads {
        export type Route<ChannelID extends Snowflake = Snowflake> =
          `/channels/${ChannelID}/users/@me/threads/archived/private`;

        export function Route<ChannelID extends Snowflake>(
          channelID: ChannelID,
        ): Route<ChannelID> {
          return `/channels/${channelID}/users/@me/threads/archived/private`;
        }

        export interface QueryString {
          /* Returns threads before this ID. */
          before?: Snowflake;
          /** Optional maximum number of threads to return. */
          limit?: number;
        }

        export function QueryString(query: QueryString) {
          return encodeQueryString(query);
        }
      }
    }

    export namespace POST {
      /**
       * Start Thread with Message
       * POST `/channels/{channel.id}/messages/{message.id}/threads`
       *
       * Creates a new thread from an existing message.
       * Returns a channel on success, and a 400 BAD REQUEST on invalid parameters.
       * Fires a Thread Create Gateway event.
       *
       * When called on a `GUILD_TEXT` channel, creates a `GUILD_PUBLIC_THREAD`. When called on a `GUILD_NEWS` channel, creates a `GUILD_NEWS_THREAD`.
       * The ID of the created thread will be the same as the ID of the message, and as such a message can only have a single thread created from it.
       * 
       * https://discord.com/developers/docs/resources/channel#start-thread-with-message
       */
    }

    export namespace PUT {}

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
