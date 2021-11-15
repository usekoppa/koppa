import { Snowflake } from "../../types/snowflake.ts";

export type _ThreadMembersRoute<
  ChannelID extends Snowflake = Snowflake,
  UserID extends Snowflake = Snowflake,
> = `/channels/${ChannelID}/thread-members/${UserID}`;

export function _ThreadMembersRoute<
  ChannelID extends Snowflake,
  UserID extends Snowflake,
>(
  channelID: ChannelID,
  userID: UserID,
): _ThreadMembersRoute<ChannelID, UserID> {
  return `/channels/${channelID}/thread-members/${userID}`;
}
