import { Snowflake } from "../../types/snowflake.ts";
import { SerialisedPermissions } from "../../permissions/mod.ts";

import { PermissionOverwriteType } from "./type.ts";

export interface PermissionOverwrite {
  id: Snowflake;
  type: PermissionOverwriteType;
  allow: SerialisedPermissions;
  deny: SerialisedPermissions;
}
