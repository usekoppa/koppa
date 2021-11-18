import type { Integration } from "../../integrations/mod.ts";
import type { Snowflake } from "../../types/mod.ts";
import type { UserConnectionVisibility } from "./visibility.ts";
import { OAuth2Scopes } from "../../OAuth2/mod.ts";

export interface UserConnection {
  id: Snowflake;
  name: string;
  type: string;
  revoked?: boolean;
  integrations?: Integration[];
  verified: boolean;
  friend_sync: boolean;
  show_activity: boolean;
  visibility: UserConnectionVisibility;
}

export namespace UserConnection {
  export namespace REST {
    export namespace GET {
      export namespace GetUserConnections {
        export type Route = "/users/@me/connections";
        export function Route(): Route {
          return "/users/@me/connections";
        }

        export namespace OAuth2 {
          export type Scopes = [OAuth2Scopes.Guilds.Guilds];
          export const Scopes: Scopes = [OAuth2Scopes.Guilds.Guilds];
        }

        export type Response = UserConnection[];
      }
    }
  }
}
