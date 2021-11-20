import type { Snowflake } from "../types/snowflake.ts";
import type { Nullable } from "../_internals/utils.ts";
import type { User } from "../users/user.ts";
import { AuditLogReasonHeaders } from "../_internals/audit_log_reason_headers.ts";
import { Permission } from "../permissions/permission.ts";
import type { StickerFormat } from "./format.ts";
import type { StickerType } from "./type.ts";
import type { StickerPack } from "./pack.ts";

export interface Sticker<Type extends StickerType = StickerType>
  extends Sticker.Item {
  pack_id?: Snowflake;
  description: Nullable<string>;
  tags: string;
  asset: string;
  type: StickerType;
  format_type: StickerFormat;
  available?: boolean;
  guild_id?: Snowflake;
  user?: User.Partial & Pick<User, "flags">;
  sort_value?: number;
}

export namespace Sticker {
  export type Guild =
    & Omit<Sticker<StickerType.Guild>, "sort_value" | "pack_id">
    & Required<Pick<Sticker<StickerType.Guild>, "guild_id" | "available">>;

  export interface Item {
    id: Snowflake;
    name: string;
    format_type: StickerFormat;
  }

  export namespace REST {
    export namespace GET {
      export namespace GetSticker {
        export type Route<StickerID extends Snowflake = Snowflake> =
          `/stickers/${StickerID}`;
        export function Route<StickerID extends Snowflake>(
          stickerID: StickerID,
        ): Route<StickerID> {
          return `/stickers/${stickerID}`;
        }

        export type Response = Sticker;
      }

      export namespace GetNitroStickerPacks {
        export type Route = "/sticker-packs";
        export function Route(): Route {
          return "/sticker-packs";
        }

        export interface Response {
          sticker_packs: StickerPack[];
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

        export type Permissions = [Permission.ManageEmojisAndStickers];
        export function Permissions(): Permissions {
          return [Permission.ManageEmojisAndStickers];
        }

        export type Response = Guild[];
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

        export type Permissions = [Permission.ManageEmojisAndStickers];
        export function Permissions(): Permissions {
          return [Permission.ManageEmojisAndStickers];
        }

        export type Response = Guild;
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

        export type Headers = AuditLogReasonHeaders;
        export const Headers = AuditLogReasonHeaders;

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

        export type Permissions = [Permission.ManageEmojisAndStickers];
        export function Permissions(): Permissions {
          return [Permission.ManageEmojisAndStickers];
        }

        export type Response =
          & Guild
          & Required<Pick<Guild, "user">>;
      }
    }

    export namespace PATCH {
      export namespace ModifyGuildSticker {
        export type Route<
          GuildID extends Snowflake = Snowflake,
          StickerID extends Snowflake = Snowflake,
        > = _GuildRoutes<GuildID, StickerID>;

        export const Route = _GuildRoutes;

        export type Headers = AuditLogReasonHeaders;
        export const Headers = AuditLogReasonHeaders;

        export interface Body {
          name: string;
          description: Nullable<string>;
          tags: string;
        }

        export type Permissions = [Permission.ManageEmojisAndStickers];
        export function Permissions(): Permissions {
          return [Permission.ManageEmojisAndStickers];
        }

        export type Response = Guild;
      }
    }

    export namespace DELETE {
      export namespace DeleteGuildSticker {
        export type Route<
          GuildID extends Snowflake = Snowflake,
          StickerID extends Snowflake = Snowflake,
        > = _GuildRoutes<GuildID, StickerID>;

        export const Route = _GuildRoutes;

        export type Headers = AuditLogReasonHeaders;
        export const Headers = AuditLogReasonHeaders;
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
