import { Permissions } from "../../permissions/mod.ts";
import { Snowflake } from "../../types/snowflake.ts";
import { PermissionOverwriteType } from "./type.ts";

export interface PermissionOverwrite {
  id: Snowflake;
  type: PermissionOverwriteType;
  allow: Permissions.Raw;
  deny: Permissions.Raw;
}
