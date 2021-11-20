import { Permission } from "./permission.ts";

/**
 * A serialised permission field sent from the API.
 *
 * https://discord.com/developers/docs/topics/permissions#permissions
 */
export type SerialisedPermissions = `${Permission | number}`;
