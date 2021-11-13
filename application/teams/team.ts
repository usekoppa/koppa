import { Snowflake } from "../../types/mod.ts";
import { Nullable } from "../../_internals/utils.ts";
import { TeamMember } from "./members/mod.ts";

export interface Team {
  icon?: Nullable<string>;
  id: Snowflake;
  members: TeamMember[];
  name: string;
  owner_user_id: Snowflake;
}
