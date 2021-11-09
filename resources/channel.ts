import { Permissions } from "../types/permissions.ts";
import { Snowflake } from "../types/snowflake.ts";
import { $TODO } from "../_internals/utils.ts";

export namespace Channel {
  export namespace DM {
    export type Channel = $TODO;
    export type GroupDM = $TODO;
  }

  export interface Overwrite {
    id: Snowflake;
    type: Overwrite.Type;
    allow: Permissions.Raw;
    deny: Permissions.Raw;
  }

  export namespace Overwrite {
    export const enum Type {
      Role = 0,
      Member = 1,
    }
  }

  export type Thread = $TODO;
  export namespace Thread {}
}
