// import { shallowCopy } from "./shallow_copy.ts";


// const kMutexValue = Symbol();
// // export type MutexValue<Value extends StoredValue> = Value & {
// //   readonly [kMutexValue]: Value | undefined;
// // };
// export type MutexValue<T extends Record<any, any>> =
//   & {
//     [Property in keyof T as Property]: T[Property];
//   }
//   & { [kMutexValue]: undefined };

// export namespace MutexValue {
//   export function Create<Value extends StoredValue>(
//     value: Value,
//   ) {
//     const copy = shallowCopy(value);
//     Object.defineProperty(copy, kMutexValue, {
//       configurable: false,
//       writable: false,
//     });

//     return copy as MutexValue<Value>;
//   }

//   export function unwrap<Value extends StoredValue>(
//     value: MutexValue<Omit<Value, typeof kMutexValue>>,
//   ): Unwrap<Value> {
//     assert(value);
//     const copy = shallowCopy(value);
//     Reflect.deleteProperty(copy, kMutexValue);
//     return copy as unknown as Unwrap<Value>;
//   }

//   export function assert<Value extends StoredValue>(
//     value: Value,
//   ): asserts value is MutexValue<Value> {
//     if (!Reflect.has(value, kMutexValue)) {
//       throw new Error("The value is not the value of a locked mutex");
//     }
//   }
// }

// const kReadonlyMutexValue = Symbol();
// export type ReadonlyMutexValue<Value extends StoredValue> = Readonly<
//   & MutexValue<Value>
//   & {
//     readonly [kReadonlyMutexValue]: undefined;
//   }
// >;

// export namespace ReadonlyMutexValue {
//   export function Create<Value extends StoredValue>(
//     value: Value,
//   ) {
//     const mutexValue = MutexValue.Create(value);
//     Object.defineProperty(mutexValue, kReadonlyMutexValue, {
//       configurable: false,
//       writable: false,
//     });

//     return Object.freeze(mutexValue) as ReadonlyMutexValue<Value>;
//   }

//   export function unwrap(
//     value: ReadonlyMutexValue<StoredValue>,
//   ): Unwrap<typeof value> {
//     assert(value);
//     const copy = MutexValue.unwrap(value);
//     Reflect.deleteProperty(copy, kReadonlyMutexValue);
//     return copy;
//   }

//   export function assert<Value extends StoredValue>(
//     value: Value,
//   ): asserts value is ReadonlyMutexValue<Value> {
//     if (!Reflect.has(value, kReadonlyMutexValue)) {
//       throw new Error("The value is not the value of a (read) locked mutex");
//     }
//   }
// }

// type Unwrap<Value> = Omit<Value, typeof kMutexValue> extends MutexValue<infer V>
//   ? V
//   : Value;
