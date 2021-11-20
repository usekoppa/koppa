import { Snowflake } from "../types/snowflake.ts";
import { InteractionType } from "./type.ts";

export interface InteractionData {
  /** The ID of the invoked command - Type: Application Command. */
  id?: Snowflake;
  /** The name of the invoked command - Type: Application Command. */
  name?: string;
  type?: InteractionType;
}
