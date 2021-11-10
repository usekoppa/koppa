import { Gateway as GatewayNS } from "./resources/gateway.ts";

/**
 * The API version that this library is modelled after.
 */
export const API_VERSION = 9;

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
