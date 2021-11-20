/**
 * Specifies whose messages will be scanned for explicit media or if the feature is disabled.
 *
 * https://discord.com/developers/docs/resources/guild#guild-object-explicit-content-filter-level
 */
export enum GuildExplicitContentFilterLevel {
  /** All media sent will not be scanned. */
  Disabled = 0,
  /** Media sent by members without a role will be scanned. */
  MembersWithoutRoles = 1,
  /** Media sent by any member of the server will be scanned. */
  AllMembers = 2,
}
