import type { Snowflake } from "../types/snowflake.ts";
import type { Sticker } from "./sticker.ts";

export interface StickerPack {
  id: Snowflake;
  stickers: Sticker[];
  name: string;
  sku_id: Snowflake;
  cover_sticker_id?: Snowflake;
  description: string;
  banner_asset_id: Snowflake;
}
