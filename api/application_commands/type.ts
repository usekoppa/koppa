export enum ApplicationCommandType {
  /** Slash commands; a text-based command that shows up when a user types. */
  ChatInput = 1,
  /** A UI-based command that shows up when you right click or tap on a user. */
  User = 2,
  /** A UI-based command that shows up when you right click or tap on a message. */
  Message = 3,
}
