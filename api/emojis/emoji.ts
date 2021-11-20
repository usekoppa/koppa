import { Permission } from "../permissions/permission.ts";
import { Image } from "../types/image/image.ts";
import { Snowflake } from "../types/snowflake.ts";
import { User } from "../users/user.ts";
import { AuditLogReasonHeaders } from "../_internals/audit_log_reason_headers.ts";
import { NonNullableObject, Nullable } from "../_internals/utils.ts";

/** https://discord.com/developers/docs/resources/emoji#emoji-object-emoji-structure */
export interface Emoji {
  /** The ID of the emoji if it's custom. */
  id: Nullable<Snowflake>;
  /** The name of the emoji, can also be a utf8 emoji if not custom. */
  name: Nullable<string>;
  /** The roles that are allowed to use the emoji. */
  roles?: Snowflake[];
  /** The user that created this emoji. */
  user?: User.Partial & Pick<User, "public_flags">;
  /** Whether this emoji must be wrapped in colons. */
  require_colons?: boolean;
  /** Whether this emoji is managed by an integration. */
  managed?: boolean;
  /** Whether this emoji is animated. */
  animated?: boolean;
  /** Whether this emoji can be used, may be false due to loss of Server Boosts. */
  available?: boolean;
}

/**
 * Emoji Resource
 *
 * Routes for controlling emojis do not follow the normal rate limit conventions.
 * These routes are specifically limited on a per-guild basis to prevent abuse.
 * This means that the quota returned by our APIs may be inaccurate, and you may encounter 429s.
 *
 * https://discord.com/developers/docs/resources/emoji#emoji-resource
 */
export namespace Emoji {
  /** https://discord.com/developers/docs/resources/emoji#emoji-object-emoji-example */
  export type Guild =
    & Emoji
    & Required<
      NonNullableObject<
        Pick<
          Emoji,
          "id" | "name" | "user" | "managed" | "animated"
        >
      >
    >
    & { require_colons: true };

  export type Reaction = Pick<Emoji, "id" | "name"> & { animated?: true };

  export namespace REST {
    export namespace GET {
      /**
       * List Guild Emojis
       * GET `/guilds/${guild.id}/emojis
       *
       * Returns a list of emoji objects for the given guild.
       *
       * https://discord.com/developers/docs/resources/emoji#list-guild-emojis
       */
      export namespace ListGuildEmojis {
        export type Route<GuildID extends Snowflake = Snowflake> =
          _GuildEmojisRoute<GuildID>;

        export const Route = _GuildEmojisRoute;

        export type Response = Guild[];
      }

      /**
       * Get Guild Emoji
       * GET `/guilds/{guild.id}/emojis/{emoji.id}`
       *
       * Returns an emoji object for the given guild and emoji IDs.
       *
       * https://discord.com/developers/docs/resources/emoji#get-guild-emoji
       */
      export namespace GetGuildEmoji {
        export type Response = Guild[];
      }
    }

    export namespace PATCH {
      /**
       * Modify Guild Emoji
       * PATCH `/guilds/{guild.id}/emojis/{emoji.id}`
       *
       * Modify the given emoji.
       *
       * Requires the `MANAGE_EMOJIS_AND_STICKERS` permission.
       * Returns the updated emoji object on success.
       * Fires a Guild Emojis Update Gateway event.
       *
       * This endpoint supports the `X-Audit-Log-Reason` header.
       *
       * https://discord.com/developers/docs/resources/emoji#modify-guild-emoji
       */
      export namespace ModifyGuildEmoji {
        export type Route<
          GuildID extends Snowflake = Snowflake,
          EmojiID extends Snowflake = Snowflake,
        > = _GuildEmojiRoute<GuildID, EmojiID>;

        export const Route = _GuildEmojiRoute;

        export type Headers = AuditLogReasonHeaders;
        export const Headers = AuditLogReasonHeaders;

        export type Permissions = [Permission.ManageEmojisAndStickers];
        export function Permissions(): Permissions {
          return [Permission.ManageEmojisAndStickers];
        }

        /** https://discord.com/developers/docs/resources/emoji#modify-guild-emoji-json-params */
        export interface Body {
          /** The name of this emoji. */
          name?: string;
          /** Roles allowed to use this emoji. */
          roles?: Snowflake[];
        }

        export type Response = Guild;
      }
    }

    export namespace POST {
      /**
       * Create Guild Emoji
       * POST `/guilds/{guild.id}/emojis`
       *
       * Create a new emoji for the guild.
       *
       * Requires the `MANAGE_EMOJIS_AND_STICKERS` permission.
       * Returns the new emoji object on success.
       * Fires a Guild Emojis Update Gateway event.
       *
       * Emojis and animated emojis have a maximum file size of 256kb.
       * Attempting to upload an emoji larger than this limit will fail
       * and return `400 Bad Request` and an error message, but not a JSON status code.
       *
       * This endpoint supports the `X-Audit-Log-Reason` header.
       *
       * https://discord.com/developers/docs/resources/emoji#create-guild-emoji
       */
      export namespace CreateGuildEmoji {
        export type Route<GuildID extends Snowflake = Snowflake> =
          _GuildEmojisRoute<GuildID>;

        export const Route = _GuildEmojisRoute;

        export type Headers = AuditLogReasonHeaders;
        export const Headers = AuditLogReasonHeaders;

        export type Permissions = [Permission.ManageEmojisAndStickers];
        export function Permissions(): Permissions {
          return [Permission.ManageEmojisAndStickers];
        }

        /** https://discord.com/developers/docs/resources/emoji#create-guild-emoji */
        export interface Body {
          /** The name of this emoji. */
          name: string;
          /** The 128x128 emoji image. */
          image: Image;
          /** Roles allowed to use this emoji. */
          roles: Snowflake[];
        }

        export type Response = Guild;
      }
    }

    export namespace DELETE {
      /**
       * Delete Guild Emoji
       * DELETE `/guilds/{guild.id}/emojis/{emoji.id}`
       *
       * Delete the given emoji.
       *
       * Requires the `MANAGE_EMOJIS_AND_STICKERS` permission.
       * Returns `204 No Content` on success.
       * Fires a Guild Emojis Update Gateway event.
       *
       * This endpoint supports the `X-Audit-Log-Reason` header.
       *
       * https://discord.com/developers/docs/resources/emoji#delete-guild-emoji
       */
      export namespace DeleteGuildEmoji {
        export type Route<
          GuildID extends Snowflake = Snowflake,
          EmojiID extends Snowflake = Snowflake,
        > = _GuildEmojiRoute<GuildID, EmojiID>;

        export const Route = _GuildEmojiRoute;

        export type Headers = AuditLogReasonHeaders;
        export const Headers = AuditLogReasonHeaders;

        export type Permissions = [Permission.ManageEmojisAndStickers];
        export function Permissions(): Permissions {
          return [Permission.ManageEmojisAndStickers];
        }
      }
    }

    type _GuildEmojiRoute<
      GuildID extends Snowflake = Snowflake,
      EmojiID extends Snowflake = Snowflake,
    > = `/guilds/${GuildID}/emojis/${EmojiID}`;

    function _GuildEmojiRoute<
      GuildID extends Snowflake,
      EmojiID extends Snowflake,
    >(
      guildID: GuildID,
      emojiID: EmojiID,
    ): _GuildEmojiRoute<GuildID, EmojiID> {
      return `/guilds/${guildID}/emojis/${emojiID}`;
    }

    type _GuildEmojisRoute<GuildID extends Snowflake = Snowflake> =
      `/guilds/${GuildID}/emojis`;

    function _GuildEmojisRoute<GuildID extends Snowflake>(
      guildID: GuildID,
    ): _GuildEmojisRoute<GuildID> {
      return `/guilds/${guildID}/emojis`;
    }
  }
}
