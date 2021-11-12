import { AuditLogChangeKey } from "./key.ts";

/**
 * The changes that occurred in the entry.
 *
 * If `new_value` is not present in the change object,
 * while `old_value` is, that means the property that was changed has been reset, or set to `null`.
 *
 * https://discord.com/developers/docs/resources/audit-log#audit-log-change-object-audit-log-change-structure
 */
export interface AuditLogChange<Value = unknown> {
  /** The new value of the key. */
  new_value?: Value;
  /** The old value of the key. */
  old_value?: Value;
  /** The name of Audit Log change key. */
  key: AuditLogChangeKey;
}

declare const a: AuditLogChange;

type Something = {
  [key in AuditLogChangeKey]: unknown;
};

declare const dd: Something;

dd.$add;
dd.$remove;
dd.afk_channel_id;
dd.afk_timeout;
dd.allow;
dd.application_id;
dd.archived;
dd.auto_archive_duration;
dd.available;
dd.avatar_hash;
