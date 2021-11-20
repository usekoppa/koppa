/**
 * Determines the default setting for the amount of notifications a user
 * will receive on the basis of specific properties of messages.
 *
 * https://discord.com/developers/docs/resources/guild#guild-object-default-message-notification-level
 */
export enum GuildDefaultMessageNotificationLevel {
  /** Members will receive notifications for all messages by default. */
  AllMessages = 0,
  /** Members will receive notifications for messages that `@mention` them by default. */
  OnlyMentions = 1,
}
