import { SnowflakeUtil } from "../../utils/snowflake_util.ts";
import { PathLike } from "../../utils/type_util.ts";
import { RequestMethod } from "../method.ts";

export function produceRouteID(method: RequestMethod, path: PathLike) {
  const majorPath = path.replace(
    /\/([a-z-]+)\/(?:\d{16,19})/g,
    (match, segment) => {
      if (
        segment === "channels" || segment === "guilds" ||
        segment === "webhooks"
      ) {
        // Return the full match, which looks like `/{segment}/{id}`.
        return match;
      } else {
        // Strip out all IDs that are not for major segments.
        return `/${segment}/:id`;
      }
    },
  )
    // Strip out reaction as they fall under the same bucket.
    .replace(/\/reactions\/[^/]+/g, "/reactions/:id");

  /**
   * @license MIT
   * @author Discord.js Authors
   * @link https://github.com/discordjs/discord.js-modules/blob/7f1c9be817bbc6a4a11a726c952580dd3cb7b149/packages/rest/src/lib/RequestManager.ts#L283
   */

  let exceptions = "";

  // Hard-Code Old Message Deletion Exception (2 week+ old messages are a different bucket)
  // https://github.com/discord/discord-api-docs/issues/1295
  if (
    method === RequestMethod.DELETE &&
    majorPath === "/channels/:id/messages/:id"
  ) {
    const ID = /\d{16,19}$/.exec(path)![0];
    const timestamp = SnowflakeUtil.getTimestamp(ID);
    if (Date.now() - timestamp > 1000 * 60 * 60 * 24 * 14) {
      exceptions += "/Delete 2 week+ old messages";
    }
  }

  return `${method}:${majorPath}${exceptions}`;
}
