import { Snowflake } from "../types/mod.ts";
import { Nullable } from "../_internals/utils.ts";

export interface GuildWidget {
  /** Whether or not the guild widget is enabled. */
  enabled: boolean;
  /** The channel the widget will generate an invite to, or `null` if set to no invite. */
  channel_id: Nullable<Snowflake>;
}
