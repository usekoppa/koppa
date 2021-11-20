import { ChannelType } from "../channels/channel_type.ts";
import { Snowflake } from "../types/snowflake.ts";

export interface ChannelMention {
  /** The ID of the channel mentioned. */
  id: Snowflake;
  /** The ID of the guild that the channel belongs to. */
  guild_id: Snowflake;
  /** The type of channel mentioned. */
  type: ChannelType;
  /** The name of the channel that was mentioned. */
  name: string;
}
