import { Snowflake } from "./snowflake.ts";
import { Nullable } from "../_internals/utils.ts";
import { User } from "../resources/user.ts";

export namespace Team {
  export const enum State {
    Invited = 1,
    Accepted = 2,
  }

  export type Permissions = ["*"];

  export interface Team {
    icon?: Nullable<string>;
    id: Snowflake;
    members: Member[];
    name: string;
    owner_user_id: Snowflake;
  }

  export interface Member {
    membership_state: State;
    permissions: Permissions;
    team_id: Snowflake;
    user: Omit<User.Partial, "flags">;
  }
}
