/**
 * The Discord Epoch; the first second of 2015.
 */
export const DISCORD_EPOCH = 1420070400000n;

/**
 * A globally unique ID within Discord.
 *
 * @see {@link https://discord.com/developers/docs/reference#snowflakes-snowflake-id-format-structure-left-to-right | Snowflake ID Format Structure}
 */
export class Snowflake {
  /**
   * The timestamp at which the Snowflake was generated.
   *
   * @remarks
   * This typically correlates to the creation timestamp of an Entity.   *
   */
  readonly timestamp!: Date;
  readonly workerID!: number;
  readonly processID!: number;

  /**
   * For every Snowflake ID that is generated on the process that generated this Snowflake ID,
   * this number is incremented.
   */
  readonly increment!: number;

  constructor(readonly raw: Snowflake.Raw) {
    if (!Snowflake.isValid(raw)) {
      throw new TypeError("Value was not a snowflake");
    }

    const snowflake = BigInt(raw);
    this.#populate(snowflake);
  }

  #populate(snowflake: bigint) {
    // Resolve the snowflake into its data types.
    // https://discord.com/developers/docs/reference#snowflakes-snowflake-id-format-structure-left-to-right

    const workerID = Number((snowflake & 0x3E0000n) >> 17n);
    Reflect.set(this, "workerID", workerID);

    const processID = Number((snowflake & 0x1F000n) >> 12n);
    Reflect.set(this, "processID", processID);

    const increment = Number(snowflake & 0xFFFn);
    Reflect.set(this, "increment", increment);

    const timestamp = new Date(Number((snowflake >> 22n) + DISCORD_EPOCH));
    Reflect.set(this, "timestamp", timestamp);
  }

  /**
   * Matches a string as a Snowflake.
   */
  static Matcher = /[0-9]{17,19}/;

  /**
   * Validates whether or not a value is a {@link Snowflake.Raw | Raw Snowflake} representation.
   *
   * @param value - The value to be verified.
   * @returns Whether or not the value is a {{@link Snowflake.Raw | Raw Snowflake} representation.
   */
  static isValid(value: unknown) {
    if (typeof value === "string") {
      return !!value.match(Snowflake.Matcher);
    }

    return false;
  }

  /**
   * Creates a rudimentary Snowflake ID from a timestamp.
   *
   * @see {@link https://discord.com/developers/docs/reference#snowflake-ids-in-pagination-generating-a-snowflake-id-from-a-timestamp-example | Generating a snowflake ID from a Timestamp Example}
   *
   * @param timestamp - The timestamp to use in the first 42 bits of the snowflake.
   * @returns A rudimentary Snowflake ID.
   */
  static createFromTimestamp(timestamp: Date | number) {
    const timestampUnixEpoch = BigInt(timestamp?.valueOf() ?? timestamp);
    const raw: Snowflake.Raw = `${(timestampUnixEpoch - DISCORD_EPOCH) << 22n}`;
    return new Snowflake(raw);
  }
}

/**
 * Discord utilizes Twitter's Snowflake format for uniquely identifiable descriptors (IDs).
 *
 * @remarks
 * These IDs are guaranteed to be unique across all of Discord,
 * except in some unique scenarios in which child objects share their parent's ID.
 *
 * @see {@link https://discord.com/developers/docs/reference#snowflakes | Snowflakes}
 */
export namespace Snowflake {
  /**
   * A Snowflake ID in its raw string representation.
   *
   * @remarks
   * Since Snowflake are up to 64 bits in size (e.g. a uint64),
   * they are always returned as strings in the HTTP API to prevent integer overflows in some language.
   */
  export type Raw = `${bigint}`;
}
