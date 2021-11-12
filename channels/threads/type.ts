import { ChannelType } from "../channel_type.ts";

export type ThreadType =
  | ChannelType.GuildPublicThread
  | ChannelType.GuildPrivateThread
  | ChannelType.GuildNewsThread;

export namespace ThreadType {
  export type Public = ChannelType.GuildPublicThread;
  export type Private = ChannelType.GuildPrivateThread;
  export type News = ChannelType.GuildNewsThread;
}
