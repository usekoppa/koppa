import { Gateway as GatewayNS } from "../gateway/gateway.ts";
import { API_VERSION } from "./API_version.ts";

export namespace URLs {
  /**
   * The API URL that this library is compatible with receiving and transmitting data with.
   */
  export const API = `https://discord.com/api/v${API_VERSION}` as const;
  export type API = typeof API;

  /**
   * The gateway endpoint with respect to {@link URLs.API | URLs.API}.
   */
  export const Gateway = `${API}/${GatewayNS.Route}`;
}
