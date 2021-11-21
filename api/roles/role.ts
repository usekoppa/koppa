import { $TODO } from "../../utils/type_util.ts";

export type Role = Role.Partial;
export namespace Role {
  export type Partial = $TODO;

  export namespace REST {
    export namespace GET {
      export namespace GetGuildRole {}
    }

    export namespace PATCH {
      export namespace ModifyGuildRolePositions {}

      export namespace ModifyGuildRole {}
    }

    export namespace POST {
      export namespace CreateGuildRole {}
    }

    export namespace DELETE {
      export namespace DeleteGuildRole {}
    }
  }
}
