import { Snowflake } from "../../types/snowflake.ts";
import { SerialisedPermissions } from "../serialised.ts";

import { PermissionOverwriteType } from "./type.ts";

export interface PermissionOverwrite {
  id: Snowflake;
  type: PermissionOverwriteType;
  allow: SerialisedPermissions;
  deny: SerialisedPermissions;
}

export namespace PermissionOverwrite {
  export namespace REST {
    export namespace PUT {
      export namespace EditChannelPermissions {}
    }

    export namespace DELETE {
      export namespace DeleteChannelPermission {}
    }
  }
}
