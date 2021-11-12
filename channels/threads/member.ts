import { ISO8601 } from "../../types/ISO8601.ts";
import { Snowflake } from "../../types/snowflake.ts";

export interface ThreadMember {
  id?: Snowflake;
  user_id?: Snowflake;
  join_timestamp: ISO8601;
  flags: number;
}
