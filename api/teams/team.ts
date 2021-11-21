import { Snowflake } from "../types/snowflake.ts";
import { Nullable } from "../../utils/type_util.ts";
import { TeamMember } from "./members/member.ts";

export interface Team {
  icon?: Nullable<string>;
  id: Snowflake;
  members: TeamMember[];
  name: string;
  owner_user_id: Snowflake;
}
