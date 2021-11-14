/**
 * Two-factor authentication requirement for moderation actions.
 *
 * https://discord.com/developers/docs/resources/guild#guild-object-mfa-level
 */
export enum GuildMFALevel {
  /** Guild has no MFA/2FA requirement for moderation actions. */
  None = 0,
  /** Guild has a MFA/2FA requirement for moderation actions. */
  Elevated = 1,
}
