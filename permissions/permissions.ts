export type Permission = `${PermissionFlags | number}`;

export namespace Permission {
  /** Allows creation of instant invites - Channel types: T, V, S. */
  export type CreateInstantInvite = 0x0000000001;
  /** Allows creation of instant invites - Channel types: T, V, S. */
  export const CreateInstantInvite = 1 << 0;

  /* Allows kicking members. */
  export type KickMembers = 0x0000000002;
  /* Allows kicking members. */
  export const KickMembers = 1 << 1;

  /** Allows banning members. */
  export type BanMembers = 0x0000000004;
  /** Allows banning members. */
  export const BanMembers = 1 << 2;

  /** Allows all permissions and bypasses channel permission overwrites. */
  export type Administrator = 0x0000000008;
  /** Allows all permissions and bypasses channel permission overwrites. */
  export const Administrator = 1 << 3;

  /** Allows management and editing of channels - Channel types: T, V, S. */
  export type ManageChannels = 0x0000000010;
  /** Allows management and editing of channels - Channel types: T, V, S. */
  export const ManageChannels = 1 << 4;

  /** Allows management and editing of the guild. */
  export type ManageGuild = 0x0000000020;
  /** Allows management and editing of the guild. */
  export const ManageGuild = 1 << 5;

  /** Allows for the addition of reactions to messages - Channel types: T. */
  export type AddReactions = 0x0000000040;
  /** Allows for the addition of reactions to messages - Channel types: T. */
  export const AddReactions = 1 << 6;

  export type ViewAuditLog = 0x0000000080;
  export const ViewAuditLog = 1 << 7;

  export type PrioritySpeaker = 0x0000000100;
  export const PrioritySpeaker = 1 << 8;

  export type Stream = 0x0000000200;
  export const Stream = 1 << 9;

  export type ViewChannel = 0x0000000400;
  export const ViewChannel = 1 << 10;

  export type SendMessages = 0x0000000800;
  export const SendMessages = 1 << 11;

  export type SendTTSMessages = 0x0000001000;
  export const SendTTSMessages = 1 << 12;

  export type ManageMessages = 0x0000002000;
  export const ManageMessages = 1 << 13;

  export type EmbedLinks = 0x0000004000;
  export const EmbedLinks = 1 << 14;

  export type AttachFiles = 0x0000008000;
  export const AttachFiles = 1 << 15;

  export type ReadMessageHistory = 0x0000010000;
  export const ReadMessageHistory = 1 << 16;

  export type MentionEveryone = 0x0000020000;
  export const MentionEveryone = 1 << 17;

  export type UseExternalEmojis = 0x0000040000;
  export const UseExternalEmojis = 1 << 18;

  export type ViewGuildInsights = 0x0000080000;
  export const ViewGuildInsights = 1 << 19;

  export type Connect = 0x0000100000;
  export const Connect = 1 << 20;

  export type Speak = 0x0000200000;
  export const Speak = 1 << 21;

  export type MuteMembers = 0x0000400000;
  export const MuteMembers = 1 << 22;

  export type DeafenMembers = 0x0000800000;
  export const DeafenMembers = 1 << 23;

  export type MoveMembers = 0x0001000000;
  export const MoveMembers = 1 << 24;

  export type UseVAD = 0x0002000000;
  export const UseVAD = 1 << 25;

  export type ChangeNickname = 0x0004000000;
  export const ChangeNickname = 1 << 26;

  export type ManageNicknames = 0x0008000000;
  export const ManageNicknames = 1 << 27;

  export type ManageRoles = 0x0010000000;
  export const ManageRoles = 1 << 28;

  export type ManageWebhooks = 0x0020000000;
  export const ManageWebhooks = 1 << 29;

  export type ManageEmojisAndStickers = 0x0040000000;
  export const ManageEmojisAndStickers = 1 << 30;

  export type UseApplicationCommands = 0x0080000000;
  export const UseApplicationCommands = 1 << 31;

  export type RequestToSpeak = 0x0100000000;
  export const RequestToSpeak = 1 << 32;

  export type ManageThreads = 0x0400000000;
  export const ManageThreads = 1 << 34;

  export type CreatePublicThreads = 0x0800000000;
  export const CreatePublicThreads = 1 << 35;

  export type CreatePrivateThreads = 0x1000000000;
  export const CreatePrivateThreads = 1 << 36;

  export type UseExternalStickers = 0x2000000000;
  export const UseExternalStickers = 1 << 37;

  export type SendMessagesInThreads = 0x4000000000;
  export const SendMessagesInThreads = 1 << 38;

  export type StartEmbeddedActivities = 0x8000000000;
  export const StartEmbeddedActivities = 1 << 39;
}

/** https://discord.com/developers/docs/topics/permissions#permissions-bitwise-permission-flags */
export type PermissionFlags =
  | Permission.CreateInstantInvite
  | Permission.KickMembers;
