import { StoredValue } from "./values.ts";

export function shallowCopy<Value extends StoredValue>(value: Value) {
  if (Array.isArray(value)) return Object.create([...value]) as Value;
  return { ...value };
}
