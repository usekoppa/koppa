import { User } from "../users/mod.ts";
import { Nullable } from "../_internals/utils.ts";

export interface GuildBan {
  reason: Nullable<string>;
  user: Omit<User.Partial, "flags"> & Pick<User, "public_flags">;
}
