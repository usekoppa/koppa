import { GatewayDispatchEvents } from "./dispatch_event.ts";
import { GatewayOpcode } from "./opcode.ts";

export interface GatewayPayload<
  Opcode extends GatewayOpcode = GatewayOpcode,
  Data = unknown,
> {
  op: Opcode;
  d: Data;
  s: Opcode extends GatewayOpcode.Dispatch ? number : null;
  t: Opcode extends GatewayOpcode.Dispatch ? GatewayDispatchEvents : null;
}
