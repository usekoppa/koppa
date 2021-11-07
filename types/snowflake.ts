export const DISCORD_EPOCH = 1420070400000n;

export class Snowflake {
  readonly timestamp!: Date;
  readonly workerID!: number;
  readonly processID!: number;
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

  static Matcher = /[0-9]{17,19}/;

  static isValid(value: unknown) {
    if (typeof value === "string") {
      return !!value.match(Snowflake.Matcher);
    }

    return false;
  }

  /**
   * Creates a rudimentary Snowflake from a timestamp.
   *
   * @see {@link https://discord.com/developers/docs/reference#snowflake-ids-in-pagination-generating-a-snowflake-id-from-a-timestamp-example | Generating a snowflake ID from a Timestamp Example}
   *
   * @param timestamp - The timestamp to use in the first 42 bits of the snowflake.
   * @returns A snowflake
   */
  static createFromTimestamp(timestamp: Date | number) {
    const timestampUnixEpoch = BigInt(timestamp?.valueOf() ?? timestamp);
    const raw: Snowflake.Raw = `${(timestampUnixEpoch - DISCORD_EPOCH) << 22n}`;
    return new Snowflake(raw);
  }
}

export namespace Snowflake {
  export type Raw = `${bigint}`;
}
