/** https://discord.com/developers/docs/topics/permissions#permissions-bitwise-permission-flags */
export type Permission =
  | Permission.AddReactions
  | Permission.Administrator
  | Permission.AttachFiles
  | Permission.BanMembers
  | Permission.ChangeNickname
  | Permission.Connect
  | Permission.CreateInstantInvite
  | Permission.CreatePrivateThreads
  | Permission.CreatePublicThreads
  | Permission.DeafenMembers
  | Permission.EmbedLinks
  | Permission.KickMembers
  | Permission.ManageChannels
  | Permission.ManageEmojisAndStickers
  | Permission.ManageGuild
  | Permission.ManageMessages
  | Permission.ManageNicknames
  | Permission.ManageRoles
  | Permission.ManageThreads
  | Permission.ManageWebhooks
  | Permission.MentionEveryone
  | Permission.MoveMembers
  | Permission.MuteMembers
  | Permission.PrioritySpeaker
  | Permission.ReadMessageHistory
  | Permission.RequestToSpeak
  | Permission.SendMessages
  | Permission.SendMessagesInThreads
  | Permission.SendTTSMessages
  | Permission.Speak
  | Permission.StartEmbeddedActivities
  | Permission.Stream
  | Permission.UseApplicationCommands
  | Permission.UseExternalEmojis
  | Permission.UseExternalStickers
  | Permission.UseVAD
  | Permission.ViewAuditLog
  | Permission.ViewChannel
  | Permission.ViewGuildInsights;

/**
 * Permissions
 *
 * Permissions in Discord are a way to limit and grant certain abilities to users.
 *
 * https://discord.com/developers/docs/topics/permissions#permissions
 */
export namespace Permission {
  /** Allows creation of instant invites - Channel types: T, V, S. */
  export type CreateInstantInvite = 0x0000000001;
  /** Allows creation of instant invites - Channel types: T, V, S. */
  export const CreateInstantInvite = 1 << 0 as CreateInstantInvite;

  /** Allows kicking members. */
  export type KickMembers = 0x0000000002;
  /** Allows kicking members. */
  export const KickMembers = 1 << 1 as KickMembers;

  /** Allows banning members. */
  export type BanMembers = 0x0000000004;
  /** Allows banning members. */
  export const BanMembers = 1 << 2 as BanMembers;

  /** Allows all permissions and bypasses channel permission overwrites. */
  export type Administrator = 0x0000000008;
  /** Allows all permissions and bypasses channel permission overwrites. */
  export const Administrator = 1 << 3 as Administrator;

  /** Allows management and editing of channels - Channel types: T, V, S. */
  export type ManageChannels = 0x0000000010;
  /** Allows management and editing of channels - Channel types: T, V, S. */
  export const ManageChannels = 1 << 4 as ManageChannels;

  /** Allows management and editing of the guild. */
  export type ManageGuild = 0x0000000020;
  /** Allows management and editing of the guild. */
  export const ManageGuild = 1 << 5 as ManageGuild;

  /** Allows for the addition of reactions to messages - Channel types: T. */
  export type AddReactions = 0x0000000040;
  /** Allows for the addition of reactions to messages - Channel types: T. */
  export const AddReactions = 1 << 6 as AddReactions;

  /** Allows for viewing of Audit Logs. */
  export type ViewAuditLog = 0x0000000080;
  /** Allows for viewing of Audit Logs. */
  export const ViewAuditLog = 1 << 7 as ViewAuditLog;

  /** Allows for using priority speaker in a voice channel - Channel types: V. */
  export type PrioritySpeaker = 0x0000000100;
  /** Allows for using priority speaker in a voice channel - Channel types: V. */
  export const PrioritySpeaker = 1 << 8 as PrioritySpeaker;

  /** Allows the user to "Go Live" - Channel types: V. */
  export type Stream = 0x0000000200;
  /** Allows the user to "Go Live" - Channel types: V. */
  export const Stream = 1 << 9 as Stream;

  /** Allows guild members to view a channel, which includes reading messages in text channels - Channel types: T, V, S. */
  export type ViewChannel = 0x0000000400;
  /** Allows guild members to view a channel, which includes reading messages in text channels - Channel types: T, V, S. */
  export const ViewChannel = 1 << 10 as ViewChannel;

  /** Allows for sending messages in a channel (does not allow sending messages in threads) - Channel types: T. */
  export type SendMessages = 0x0000000800;
  /** Allows for sending messages in a channel (does not allow sending messages in threads) - Channel types: T. */
  export const SendMessages = 1 << 11 as SendMessages;

  /** Allows for sending of `/tts` messages - Channel types: T. */
  export type SendTTSMessages = 0x0000001000;
  /** Allows for sending of `/tts` messages - Channel types: T. */
  export const SendTTSMessages = 1 << 12 as SendTTSMessages;

  /** Allows for deletion of other users' messages - Channel types: T. */
  export type ManageMessages = 0x0000002000;
  /** Allows for deletion of other users' messages - Channel types: T. */
  export const ManageMessages = 1 << 13 as ManageMessages;

  /** Links sent by users with this permission will be auto-embedded - Channel types: T. */
  export type EmbedLinks = 0x0000004000;
  /** Links sent by users with this permission will be auto-embedded - Channel types: T. */
  export const EmbedLinks = 1 << 14 as EmbedLinks;

  /** Allows for uploading images and files - Channel types: T. */
  export type AttachFiles = 0x0000008000;
  /** Allows for uploading images and files - Channel types: T. */
  export const AttachFiles = 1 << 15 as AttachFiles;

  /** Allows for reading of message history - Channel types: T. */
  export type ReadMessageHistory = 0x0000010000;
  /** Allows for reading of message history - Channel types: T. */
  export const ReadMessageHistory = 1 << 16 as ReadMessageHistory;

  /** Allows for using the `@everyone` tag to notify all users in a channel, and the `@here` tag to notify all online users in a channel - Channel types: T. */
  export type MentionEveryone = 0x0000020000;
  /** Allows for using the `@everyone` tag to notify all users in a channel, and the `@here` tag to notify all online users in a channel - Channel types: T. */
  export const MentionEveryone = 1 << 17 as MentionEveryone;

  /** Allows the usage of custom emojis from other servers - Channel types: T. */
  export type UseExternalEmojis = 0x0000040000;
  /** Allows the usage of custom emojis from other servers - Channel types: T. */
  export const UseExternalEmojis = 1 << 18 as UseExternalEmojis;

  /** Allows for viewing guild insights. */
  export type ViewGuildInsights = 0x0000080000;
  /** Allows for viewing guild insights. */
  export const ViewGuildInsights = 1 << 19 as ViewGuildInsights;

  /** Allows for joining of a voice channel - Channel types: V, S. */
  export type Connect = 0x0000100000;
  /** Allows for joining of a voice channel - Channel types: V, S. */
  export const Connect = 1 << 20 as Connect;

  /** Allows for speaking in a voice channel - Channel types: V, S. */
  export type Speak = 0x0000200000;
  /** Allows for speaking in a voice channel - Channel types: V, S. */
  export const Speak = 1 << 21 as Speak;

  /** Allows for muting members in a voice channel - Channel types: V. */
  export type MuteMembers = 0x0000400000;
  /** Allows for muting members in a voice channel - Channel types: V. */
  export const MuteMembers = 1 << 22 as MuteMembers;

  /** Allows for muting members in a voice channel - Channel types: V, S. */
  export type DeafenMembers = 0x0000800000;
  /** Allows for muting members in a voice channel - Channel types: V, S. */
  export const DeafenMembers = 1 << 23 as DeafenMembers;

  /** Allows for moving members in voice channel - Channel types: V, S. */
  export type MoveMembers = 0x0001000000;
  /** Allows for moving members in voice channel - Channel types: V, S. */
  export const MoveMembers = 1 << 24 as MoveMembers;

  /** Allows for using Voice-Activity-Detection (VAD) in a voice channel - Channel types: V. */
  export type UseVAD = 0x0002000000;
  /** Allows for using Voice-Activity-Detection (VAD) in a voice channel - Channel types: V. */
  export const UseVAD = 1 << 25 as UseVAD;

  /** Allows for modification of own nickname. */
  export type ChangeNickname = 0x0004000000;
  /** Allows for modification of own nickname. */
  export const ChangeNickname = 1 << 26 as ChangeNickname;

  /** Allows for modification of other users nicknames. */
  export type ManageNicknames = 0x0008000000;
  /** Allows for modification of other users nicknames. */
  export const ManageNicknames = 1 << 27 as ManageNicknames;

  /** Allows management and editing of roles - Channel types: T, V, S. */
  export type ManageRoles = 0x0010000000;
  /** Allows management and editing of roles - Channel types: T, V, S. */
  export const ManageRoles = 1 << 28 as ManageRoles;

  /** Allows management and editing of webhooks - Channel types: T. */
  export type ManageWebhooks = 0x0020000000;
  /** Allows management and editing of webhooks - Channel types: T. */
  export const ManageWebhooks = 1 << 29 as ManageWebhooks;

  /** Allows management and editing of emojis and stickers */
  export type ManageEmojisAndStickers = 0x0040000000;
  /** Allows management and editing of emojis and stickers */
  export const ManageEmojisAndStickers = 1 << 30 as ManageEmojisAndStickers;

  /** Allows members to use application commands, including slash commands and context menu commands - Channel types: T. */
  export type UseApplicationCommands = 0x0080000000;
  /** Allows members to use application commands, including slash commands and context menu commands - Channel types: T. */
  export const UseApplicationCommands = 1 << 31 as UseApplicationCommands;

  /**
   * Allows for requesting to speak in stage channels.
   * This permission is under active development and may be changed or removed.
   * Channel types: S.
   */
  export type RequestToSpeak = 0x0100000000;

  /**
   * Allows for requesting to speak in stage channels.
   * This permission is under active development and may be changed or removed.
   * Channel types: S.
   */
  export const RequestToSpeak = 1 << 32 as RequestToSpeak;

  /** Allows for deleting and archiving threads, and viewing all private threads - Channel types: T. */
  export type ManageThreads = 0x0400000000;
  /** Allows for deleting and archiving threads, and viewing all private threads - Channel types: T. */
  export const ManageThreads = 1 << 34 as ManageThreads;

  /** Allows for creating public threads - Channel types: T. */
  export type CreatePublicThreads = 0x0800000000;
  /** Allows for creating public threads - Channel types: T. */
  export const CreatePublicThreads = 1 << 35 as CreatePublicThreads;

  /** Allows for creating private threads - Channel types: T. */
  export type CreatePrivateThreads = 0x1000000000;
  /** Allows for creating private threads - Channel types: T. */
  export const CreatePrivateThreads = 1 << 36 as CreatePrivateThreads;

  /** Allows the usage of custom stickers from other servers - Channel types: T. */
  export type UseExternalStickers = 0x2000000000;
  /** Allows the usage of custom stickers from other servers - Channel types: T. */
  export const UseExternalStickers = 1 << 37 as UseExternalStickers;

  /** Allows for sending messages in threads - Channel types: T. */
  export type SendMessagesInThreads = 0x4000000000;
  /** Allows for sending messages in threads - Channel types: T. */
  export const SendMessagesInThreads = 1 << 38 as SendMessagesInThreads;

  /** Allows for launching activities (applications with the `EMBEDDED` flag) in a voice channel - Channel types: V. */
  export type StartEmbeddedActivities = 0x8000000000;
  /** Allows for launching activities (applications with the `EMBEDDED` flag) in a voice channel - Channel types: V. */
  export const StartEmbeddedActivities = 1 << 39 as StartEmbeddedActivities;
}
