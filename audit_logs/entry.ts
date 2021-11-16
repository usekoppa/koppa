import type { Snowflake } from "../types/mod.ts";
import type { Nullable } from "../_internals/utils.ts";
import type { AuditLogChange } from "./change/change.ts";
import type { AuditLogEvent } from "./event.ts";
import type { AuditLogOptions } from "./options.ts";

/**
 * An entry into a guild's Audit Log.
 *
 * https://discord.com/developers/docs/resources/audit-log#audit-log-entry-object-audit-log-entry-structure
 */
export type AuditLogEntry<Type = unknown> = Type extends Event ? 
  & _AuditLogEntry<Type>
  & (Type extends keyof _OptionsMapper
    ? Required<Pick<_AuditLogEntry<Type>, "options">>
    : never)
  : _AuditLogEntry<Event>;

/** https://discord.com/developers/docs/resources/audit-log#audit-log-entry-object-audit-log-entry-structure */
interface _AuditLogEntry<Type extends Event = Event> {
  /** The ID of the entry. */
  id: Snowflake;
  /** The ID of the user who made the changes. */
  user_id: Nullable<Snowflake>;
  /** The ID of the affected entity (webhook, user, role, etc.) */
  target_id: Nullable<Snowflake>;
  /** The type of action that occurred. */
  action_type: Type;
  /** The changes made to the affected entity. */
  changes?: AuditLogChange[];
  /** The reason for the change (0-512 characters long). */
  reason?: string;
  /** Additional info for certain action types. */
  options?: Type extends keyof _OptionsMapper ? _OptionsMapper[Type]
    : AuditLogOptions;
}

interface _OptionsMapper {
  [AuditLogEvent.ChannelOverwriteCreate]: AuditLogOptions.ChannelOverwrite;
  [AuditLogEvent.ChannelOverwriteDelete]: AuditLogOptions.ChannelOverwrite;
  [AuditLogEvent.ChannelOverwriteUpdate]: AuditLogOptions.ChannelOverwrite;
  [AuditLogEvent.MemberDisconnect]: AuditLogOptions.MemberDisconnect;
  [AuditLogEvent.MemberMove]: AuditLogOptions.MemberMove;
  [AuditLogEvent.MemberPrune]: AuditLogOptions.MemberPrune;
  [AuditLogEvent.MessageBulkDelete]: AuditLogOptions.MessageBulkDelete;
  [AuditLogEvent.MessageDelete]: AuditLogOptions.MessageBulkDelete;
  [AuditLogEvent.MessagePin]: AuditLogOptions.MessagePinAndUnpin;
  [AuditLogEvent.MessageUnpin]: AuditLogOptions.MessagePinAndUnpin;
  [AuditLogEvent.StageInstanceCreate]: AuditLogOptions.StageInstanceAction;
  [AuditLogEvent.StageInstanceDelete]: AuditLogOptions.StageInstanceAction;
  [AuditLogEvent.StageInstanceUpdate]: AuditLogOptions.StageInstanceAction;
}
