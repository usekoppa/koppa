import { Snowflake } from "../snowflake.ts";
import { $TODO, Nullable } from "../_internals/utils.ts";

export interface Guild extends Guild.Partial {
  icon_hash?: Nullable<string>;
  splash: Nullable<string>;
  discovery_splash: Nullable<string>;
}

export namespace Guild {
  export interface Partial {
    id: Snowflake;
    name: string;
    icon: Nullable<string>;
  }

  export type Integration = $TODO;

  export type Role = Role.Partial;
  export namespace Role {
    export type Partial = $TODO;
  }

  export namespace WS {
    export namespace GuildCreate {}
  }
}
