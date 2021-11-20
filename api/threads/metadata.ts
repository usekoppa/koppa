import type { ISO8601 } from "../types/mod.ts";
import type { ThreadType } from "./type.ts";

export interface ThreadMetadata<
  Type extends ThreadType = ThreadType,
  Archived extends boolean = boolean,
> {
  archived: Archived;
  auto_archive_duration: number;
  archive_timestamp: ISO8601;
  locked: Type extends ThreadType.Private ? boolean : false;
}
