//export type Snowflake = `${bigint}`;

export class Snowflake {
  constructor(raw: Snowflake.Raw) {
    if (!Snowflake.isValid(raw)) {
      throw new TypeError("Value was not a snowflake");
    }
  }

  static Matcher = /[0-9]{17,19}/;

  static isValid(value: unknown) {
    if (typeof value === "string") {
      return !!value.match(Snowflake.Matcher)
    }
    
    return false;
  }
}

export namespace Snowflake {
  export type Raw = `${bigint}`;
}

