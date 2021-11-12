import { Snowflake } from "../../types/mod.ts";

/**
 * Extra options for an Audit Log entry depending on the action.
 *
 * https://discord.com/developers/docs/resources/audit-log#audit-log-entry-object-optional-audit-entry-info
 */
export interface AuditLogOptions {
  /** The ID of the entry. */
  id: Snowflake;
  /** Channel in which the entities were targeted. */
  channel_id: Snowflake;
  /** The number of entities that were targeted. */
  count: string;
  /** The number of days after which inactive members were kicked. */
  delete_member_days: string;
  /** The number of members removed by a prune. */
  members_removed: string;
  /** ID of the message that was pinned/unpinned. */
  message_id: Snowflake;
  /** Name of the role a channel overwrite was modified for. (Not present if the entity is a member). */
  role_name?: string;
  /** The type of overwritten entity. ("0" for "role" or "1" for "member"). */
  type?: AuditLogOptions.ChannelOverwrite.OverwrittenEntityType;
}

export namespace AuditLogOptions {
  export type ChannelOverwrite =
    | ChannelOverwrite.RoleChannelOverwrite
    | ChannelOverwrite.MemberChannelOverwrite;

  export namespace ChannelOverwrite {
    export const enum OverwrittenEntityType {
      Role = "0",
      Member = "1",
    }

    export type RoleChannelOverwrite = _ChannelOverwrite<
      OverwrittenEntityType.Role
    >;

    export type MemberChannelOverwrite = Omit<
      _ChannelOverwrite<OverwrittenEntityType.Member>,
      "role_name"
    >;

    type _ChannelOverwrite<
      Type extends OverwrittenEntityType = OverwrittenEntityType,
    > =
      & Omit<
        Required<
          Pick<
            AuditLogOptions,
            "id" | "channel_id" | "role_name" | "type"
          >
        >,
        "type"
      >
      & {
        type: Type;
      };
  }

  export type MemberDisconnect = Required<Pick<AuditLogOptions, "count">>;
  export type MemberMove = Required<
    Pick<AuditLogOptions, "channel_id" | "count">
  >;
  export type MemberPrune = Required<
    Pick<AuditLogOptions, "delete_member_days" | "members_removed">
  >;

  export type MessageBulkDelete = Required<Pick<AuditLogOptions, "count">>;
  export type MessageDelete = Required<
    Pick<AuditLogOptions, "channel_id" | "count">
  >;
  export type MessagePinAndUnpin = Required<
    Pick<AuditLogOptions, "channel_id" | "message_id">
  >;

  export type StageInstanceAction = Required<
    Pick<AuditLogOptions, "channel_id">
  >;
}
