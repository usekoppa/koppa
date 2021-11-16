import type { Snowflake } from "../../types/snowflake.ts";
import type { User } from "../../users/user.ts";
import type { TeamMembershipState } from "./membership_state.ts";
import type { TeamMemberPermissions } from "./permissions.ts";

export interface TeamMember {
  membership_state: TeamMembershipState;
  permissions: TeamMemberPermissions;
  team_id: Snowflake;
  user: User.Partial;
}
