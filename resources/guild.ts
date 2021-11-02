import { Snowflake } from "../snowflake.ts";
import { $TODO, Nullable } from "../_internals/utils.ts";

export namespace Guild {
  export interface Partial {
    id: Snowflake;
    name: string;
    icon: Nullable<string>;
  }

  export interface Guild extends Partial {
    icon_hash?: Nullable<string>;
    splash: Nullable<string>;
    discovery_splash: Nullable<string>;
  }

  export type Integration = $TODO;

  export namespace WS {
    export namespace GuildCreate {}
  }
}
