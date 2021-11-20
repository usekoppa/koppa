import { DISCORD_EPOCH, Snowflake } from "../api/mod.ts";

/**
 * A utility to use Discord's globally unique IDs.
 *
 * https://discord.com/developers/docs/reference#snowflakes-snowflake-id-format-structure-left-to-right
 */
export namespace SnowflakeUtil {
  /**
   * Gets the timestamp data from a snowflake.
   *
   * @param snowflake The Snowflake.
   * @returns The timestamp at which the Snowflake was generated at.
   *
   * @remarks
   * This typically correlates to the creation timestamp of an Entity.
   */
  export function getTimestamp(snowflake: Snowflake | bigint) {
    snowflake = snowflakeToBigInt(snowflake);
    return Number((snowflake >> 22n) + DISCORD_EPOCH);
  }

  export function getWorkerID(snowflake: Snowflake | bigint) {
    snowflake = snowflakeToBigInt(snowflake);
    return Number((snowflake & 0x3E0000n) >> 17n);
  }

  export function getProcessID(snowflake: Snowflake | bigint) {
    snowflake = snowflakeToBigInt(snowflake);
    return Number((snowflake & 0x1F000n) >> 12n);
  }

  export function getIncrement(snowflake: Snowflake | bigint) {
    snowflake = snowflakeToBigInt(snowflake);
    return Number(snowflake & 0xFFFn);
  }

  /**
   * Matches a string as a Snowflake.
   */
  export const Matcher = /[0-9]{17,19}/;

  /**
   * Validates whether or not a value is a {@link APISnowflake | Raw Snowflake} representation.
   *
   * @param value - The value to be verified.
   * @returns Whether or not the value is a {{@link APISnowflake | Raw Snowflake} representation.
   */
  export function isValid(value: unknown) {
    if (typeof value === "string") {
      return !!value.match(SnowflakeUtil.Matcher);
    }

    return false;
  }

  export function assert(value: unknown): asserts value is Snowflake {
    if (!isValid(value)) {
      throw new TypeError(
        `The value \`${value}\` is not a valid snowflake.`,
      );
    }
  }

  /**
   * Creates a rudimentary Snowflake ID from a timestamp.
   *
   * https://discord.com/developers/docs/reference#snowflake-ids-in-pagination-generating-a-snowflake-id-from-a-timestamp-example
   *
   * @param timestamp - The timestamp to use in the first 42 bits of the snowflake.
   * @returns A rudimentary Snowflake ID.
   */
  export function createFromTimestamp(timestamp: Date | number) {
    const timestampUnixEpoch = BigInt(timestamp?.valueOf() ?? timestamp);
    const raw: Snowflake = `${(timestampUnixEpoch - DISCORD_EPOCH) << 22n}`;
    return raw;
  }

  export function bigIntToSnowflake(snowflake: Snowflake | bigint) {
    const newVal = typeof snowflake === "bigint"
      ? `${snowflake}` as Snowflake
      : snowflake;

    assert(newVal);
    return newVal;
  }

  export function snowflakeToBigInt(snowflake: Snowflake | bigint) {
    assert(String(snowflake));

    return typeof snowflake === "bigint" ? snowflake : BigInt(snowflake);
  }
}
