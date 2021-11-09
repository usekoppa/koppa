/**
 * A Snowflake ID in its raw string representation.
 *
 * @remarks
 * Discord utilizes Twitter's Snowflake format for uniquely identifiable descriptors (IDs).
 *
 * These IDs are guaranteed to be unique across all of Discord,
 * except in some unique scenarios in which child objects share their parent's ID.
 *
 * Since Snowflake are up to 64 bits in size (e.g. a uint64),
 * they are always returned as strings in the HTTP API to prevent integer overflows in some language.
 */
export type Snowflake = `${bigint}`;
