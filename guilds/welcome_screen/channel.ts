import type { Snowflake } from "../../types/snowflake.ts";
import type { Nullable } from "../../_internals/utils.ts";

export interface GuildWelcomeScreenChannel {
  /** The ID of the channel. */
  channel_id: Snowflake;
  /** The description shown for the channel. */
  description: string;
  /** The emoji ID, if the emoji is custom. */
  emoji_id: Nullable<Snowflake>;
  /** The emoji name if custom, the unicode character if standard - `null` if no emoji is set. */
  emoji_name: Nullable<string>;
}
