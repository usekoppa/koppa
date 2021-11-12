import { Snowflake } from "../../types/snowflake.ts";
import { Visibility } from "./visibility.ts";

export interface Connection {
  id: Snowflake;
  name: string;
  type: string;
  revoked?: boolean;
  integrations?: Integration[];
  verified: boolean;
  friend_sync: boolean;
  show_activity: boolean;
  visibility: Visibility;
}
