// deno-lint-ignore no-explicit-any
export type $TODO<Temp = any> = Temp;

export type Nullable<T> = T | null;
export type NonNullableObject<T> = { [P in keyof T]?: NonNullable<T[P]> };

export type ZeroToNine = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
