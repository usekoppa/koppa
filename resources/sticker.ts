import { Snowflake } from "../types/snowflake.ts";
import { $TODO, Nullable } from "../_internals/utils.ts";
import { User } from "./user.ts";

export interface Sticker extends Sticker.Item {
  pack_id?: Snowflake;
  description: Nullable<string>;
  tags: string;
  asset: string;
  type: Sticker.Type;
  format_type: Sticker.Format;
  available?: boolean;
  guild_id?: Snowflake;
  user?: User.Partial;
  sort_value?: number;
}

export namespace Sticker {
  export const enum Type {
    Standard = 1,
    Guild = 2,
  }

  export const enum Format {
    PNG = 1,
    APNG = 2,
    Lottie = 3,
  }

  export type GuildSticker =
    & Omit<Sticker, "sort_value" | "pack_id">
    & Required<Pick<Sticker, "guild_id" | "available">>
    & { type: Type.Guild };

  export interface Item {
    id: Snowflake;
    name: string;
    format_type: Format;
  }

  export interface Pack {
    id: Snowflake;
    stickers: Sticker[];
    name: string;
    sku_id: Snowflake;
    cover_sticker_id?: Snowflake;
    description: string;
    banner_asset_id: Snowflake;
  }

  export namespace REST {
    export namespace GET {
      export namespace GetSticker {
        export type Route<StickerID extends Snowflake = Snowflake> = `/stickers/${StickerID}`;
        export function Route<StickerID extends Snowflake>(
          stickerID: StickerID,
        ): Route<StickerID> {
          return `/stickers/${stickerID}`;
        }

        export type Response = Sticker;
      }

      export namespace GetNitroStickerPacks {
        export type Route = `/sticker-packs`;
        export const Route: Route = "/sticker-packs";

        export interface Response {
          sticker_packs: Pack[];
        }
      }

      export namespace ListGuildStickers {
        export type Route<GuildID extends Snowflake = Snowflake> =
          `/guilds/${GuildID}/stickers`;

        export function Route<GuildID extends Snowflake>(
          guildID: GuildID,
        ): Route<GuildID> {
          return `/guilds/${guildID}/stickers`;
        }

        export type Permissions = $TODO;

        export type Response = GuildSticker[];
      }

      export namespace GetGuildSticker {
        export type Route<
          GuildID extends Snowflake = Snowflake,
          StickerID extends Snowflake = Snowflake,
        > = `/guilds/${GuildID}/stickers/${StickerID}`;

        export function Route<
          GuildID extends Snowflake,
          StickerID extends Snowflake,
        >(guildID: GuildID, stickerID: StickerID) {
          return `/guilds/${guildID}/stickers/${stickerID}`;
        }

        export type Permissions = $TODO;

        export type Response = GuildSticker;
      }
    }

    export namespace POST {
      export namespace CreateGuildSticker {
        export type Route<GuildID extends Snowflake = Snowflake> =
          `/guilds/${GuildID}/stickers`;

        export function Route<GuildID extends Snowflake>(
          guildID: GuildID,
        ): Route<GuildID> {
          return `/guilds/${guildID}/stickers`;
        }

        export interface Headers {
          "X-Audit-Log-Reason"?: string;
        }

        export interface Form {
          name: string;
          description: string;
          tags: string;
          file: Blob;
        }

        function Form(data: Form) {
          const form = new FormData();
          form.append("name", data.name);
          form.append("description", data.description);
          form.append("tags", data.tags);
          form.append("file", data.file);
          return form;
        }

        export type Permissions = $TODO;

        export type Response =
          & GuildSticker
          & Required<Pick<GuildSticker, "user">>;
      }
    }

    export namespace PATCH {
      export namespace ModifyGuildSticker {
        export type Route<
          GuildID extends Snowflake = Snowflake,
          StickerID extends Snowflake = Snowflake,
        > = _GuildRoutes<GuildID, StickerID>;

        export const Route = _GuildRoutes;

        export interface Headers {
          "X-Audit-Log-Reason"?: string;
        }

        export interface Body {
          name: string;
          description: Nullable<string>;
          tags: string;
        }

        export type Permissions = $TODO;

        export type Response = GuildSticker;
      }
    }

    export namespace DELETE {
      export namespace DeleteGuildSticker {
        export type Route<
          GuildID extends Snowflake = Snowflake,
          StickerID extends Snowflake = Snowflake,
        > = _GuildRoutes<GuildID, StickerID>;

        export const Route = _GuildRoutes;

        export interface Headers {
          "X-Audit-Log-Reason"?: string;
        }
      }
    }

    type _GuildRoutes<
      GuildID extends Snowflake = Snowflake,
      StickerID extends Snowflake = Snowflake,
    > = `/guilds/${GuildID}/stickers/${StickerID}`;

    function _GuildRoutes<
      GuildID extends Snowflake,
      StickerID extends Snowflake,
    >(
      guildID: GuildID,
      stickerID: StickerID,
    ): _GuildRoutes<GuildID, StickerID> {
      return `/guilds/${guildID}/stickers/${stickerID}`;
    }
  }
}
