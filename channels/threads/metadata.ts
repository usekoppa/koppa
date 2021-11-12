import { ISO8601 } from "../../types/ISO8601.ts";
import { ThreadType } from "./thread_type.ts";

export interface ThreadMetadata<
  Type extends ThreadType = ThreadType.Public,
> {
  archived: boolean;
  auto_archive_duration: number;
  archive_timestamp: ISO8601;
  locked: Type extends ThreadType.Private ? boolean : false;
}
