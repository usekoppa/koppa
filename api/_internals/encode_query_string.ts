// deno-lint-ignore no-explicit-any
export function encodeQueryString(obj: Record<string, any>) {
  const entries = Object.entries(obj);
  if (!entries.length) return "";

  return entries.reduce(
    (prev, cur) =>
      `${prev !== "?" ? prev += "&" : prev}${cur[0]}=${
        encodeURIComponent(String(cur[1]))
      }`,
    "?",
  );
}
