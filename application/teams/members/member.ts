import type { Snowflake } from "../../../types/mod.ts";
import type { User } from "../../../users/mod.ts";
import type { TeamMembershipState } from "./membership_state.ts";
import type { TeamMemberPermissions } from "./permissions.ts";

export interface TeamMember {
  membership_state: TeamMembershipState;
  permissions: TeamMemberPermissions;
  team_id: Snowflake;
  user: Omit<User.Partial, "flags">;
}
