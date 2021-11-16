import { ISO8601, Snowflake } from "../types/mod.ts";
import { encodeQueryString } from "../_internals/encode_query_string.ts";
import { Channel } from "../channels/channel.ts";
import { ThreadMember } from "./member.ts";
import { ThreadMetadata } from "./metadata.ts";
import { ThreadType } from "./type.ts";
import { Permission } from "../permissions/permission.ts";

export type Thread<
  Type extends ThreadType = ThreadType,
  Archived extends boolean = boolean,
> =
  & Required<
    Pick<
      Channel<Type>,
      | "id"
      | "type"
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
  & { thread_metadata: ThreadMetadata<Type, Archived> };

export namespace Thread {
  export type Public<Archived extends boolean = boolean> = Thread<
    ThreadType.Public,
    Archived
  >;

  export type Private<Archived extends boolean = boolean> = Thread<
    ThreadType.Private,
    Archived
  >;

  export type News<Archived extends boolean = boolean> = Thread<
    ThreadType.News,
    Archived
  >;

  export namespace REST {
    export namespace GET {
      /**
       * List Active Threads
       * GET `/channels/{channel.id}/threads/active
       *
       * Returns all active threads in the channel, including public and private threads.
       * Threads are ordered by their ID, in descending order.
       *
       * @deprecated
       * This route is deprecated and will be removed in v10. It is replaced by List Active Guild Threads.
       *
       * https://discord.com/developers/docs/resources/channel#list-active-threads
       */
      export namespace ListActiveThreads {
        export type Route<ChannelID extends Snowflake = Snowflake> =
          `/channels/${ChannelID}/threads/active`;

        export function Route<ChannelID extends Snowflake>(
          channelID: ChannelID,
        ): Route<ChannelID> {
          return `/channels/${channelID}/threads/active`;
        }

        /** https://discord.com/developers/docs/resources/channel#list-active-threads-response-body */
        export interface Response {
          /**	The active threads. */
          threads: Thread<ThreadType, false>[];
          /**	A thread member object for each returned thread the current user has joined. */
          members: ThreadMember[];
          /** Whether there are potentially additional threads that could be returned on a subsequent call. */
          has_more: boolean;
        }
      }

      /**
       * List Guild Active Threads
       * GET `/guilds/{guild.id}/threads/active`
       *
       * Returns all active threads in the guild, including public and private threads.
       * Threads are ordered by their ID, in descending order.
       *
       * https://discord.com/developers/docs/resources/guild#list-active-threads
       */
      export namespace ListGuildActiveThreads {
        export type Route<
          GuildID extends Snowflake = Snowflake,
        > = `/guilds/${GuildID}/threads/active`;

        function Route<
          ChannelID extends Snowflake,
        >(
          guildID: ChannelID,
        ): Route<ChannelID> {
          return `/guilds/${guildID}/threads/active`;
        }

        /** https://discord.com/developers/docs/resources/guild#list-active-threads-response-body */
        export interface Response {
          /**	The active threads. */
          threads: Thread<ThreadType, false>[];
          /**	A thread member object for each returned thread the current user has joined. */
          members: ThreadMember[];
        }
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

        /** https://discord.com/developers/docs/resources/channel#list-public-archived-threads-query-string-params */
        export interface QueryString {
          /* Returns threads before this (ISO8601) timestamp. */
          before?: ISO8601;
          /**	Optional maximum number of threads to return. */
          limit?: number;
        }

        export function QueryString(query: QueryString) {
          return encodeQueryString(query);
        }

        export type Permissions = [Permission.ReadMessageHistory];
        export const Permissions = [Permission.ReadMessageHistory];

        /** https://discord.com/developers/docs/resources/channel#list-public-archived-threads-response-body */
        export interface Response {
          /** The public, archived threads. */
          threads: Public<true>[];
          /** A thread member object for each returned thread the current user has joined. */
          members: ThreadMember[];
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

        /** https://discord.com/developers/docs/resources/channel#list-private-archived-threads-query-string-params */
        export interface QueryString {
          /* Returns threads before this (ISO8601) timestamp. */
          before?: ISO8601;
          /** Optional maximum number of threads to return. */
          limit?: number;
        }

        export function QueryString(query: QueryString) {
          return encodeQueryString(query);
        }

        export type Permissions = [
          Permission.ReadMessageHistory,
          Permission.ManageThreads,
        ];

        export const Permissions = [
          Permission.ReadMessageHistory,
          Permission.ManageThreads,
        ];

        /** https://discord.com/developers/docs/resources/channel#list-private-archived-threads-response-body */
        export interface Response {
          /** The private, archived threads. */
          threads: Private<true>[];
          /**	A thread member object for each returned thread the current user has joined. */
          members: ThreadMember[];
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

        /** https://discord.com/developers/docs/resources/channel#list-joined-private-archived-threads-query-string-params */
        export interface QueryString {
          /* Returns threads before this ID. */
          before?: Snowflake;
          /** Optional maximum number of threads to return. */
          limit?: number;
        }

        export function QueryString(query: QueryString) {
          return encodeQueryString(query);
        }

        /** https://discord.com/developers/docs/resources/channel#list-joined-private-archived-threads-response-body */
        export interface Response {
          /** The private, archived threads the current user has joined. */
          threads: Private<true>[];
          /** A thread member object for each returned thread the current user has joined. */
          members: ThreadMember[];
          /** Whether there are potentially additional threads that could be returned on a subsequent call. */
          has_more: boolean;
        }
      }

      export namespace GetThreadMember {
        //TODO(@zorbyte)
      }

      export namespace ListThreadMembers {
        //TODO(@zorbyte)
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
      export namespace StartThreadWithMessage {
        //TODO(@zorbyte)
      }

      export namespace StartThreadWithoutMessage {
        // TODO(@zorbyte)
      }
    }

    export namespace PUT {
      export namespace JoinThread {
        // TODO(@zorbyte)
      }

      export namespace AddThreadMember {
        // TODO(@zorbyte)
      }
    }

    export namespace DELETE {
      export namespace LeaveThread {
        // TODO(@zorbyte)
      }

      export namespace RemoveThreadMember {
        // TODO(@zorbyte)
      }
    }
  }
}
