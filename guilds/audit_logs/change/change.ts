import { AuditLogChangeKey } from "./key.ts";

/**
 * The changes that occurred in the entry.
 *
 * If `new_value` is not present in the change object,
 * while `old_value` is, that means the property that was changed has been reset, or set to `null`.
 *
 * https://discord.com/developers/docs/resources/audit-log#audit-log-change-object-audit-log-change-structure
 */
export interface AuditLogChange<
  Key extends AuditLogChangeKey = AuditLogChangeKey,
> {
  /** The new value of the key. */
  new_value?: _ChangeKeyMapper[Key];
  /** The old value of the key. */
  old_value?: _ChangeKeyMapper[Key];
  /** The name of Audit Log change key. */
  key: Key;
}

interface _ChangeKeyMapper {
  [AuditLogChangeKey.ID]: AuditLogChangeKey.ID;
  [AuditLogChangeKey.Guild.AFK.Channel]: AuditLogChangeKey.Guild.AFK.Channel;
  [AuditLogChangeKey.Guild.AFK.Timeout]: AuditLogChangeKey.Guild.AFK.Timeout;
  [AuditLogChangeKey.Guild.Banner]: AuditLogChangeKey.Guild.Banner;
  [AuditLogChangeKey.Guild.DefaultMessageNotificationsLevel]:
    AuditLogChangeKey.Guild.DefaultMessageNotificationsLevel;
  [AuditLogChangeKey.Guild.DiscoverySplash]:
    AuditLogChangeKey.Guild.DiscoverySplash;
  [AuditLogChangeKey.Guild.ExplicitContentFilter]:
    AuditLogChangeKey.Guild.ExplicitContentFilter;
  [AuditLogChangeKey.Guild.Icon]: AuditLogChangeKey.Guild.Icon;
  [AuditLogChangeKey.Guild.MFALevel]: AuditLogChangeKey.Guild.MFALevel;
  [AuditLogChangeKey.Guild.Name]: AuditLogChangeKey.Guild.Name;
  [AuditLogChangeKey.Guild.Owner]: AuditLogChangeKey.Guild.Owner;
  [AuditLogChangeKey.Guild.PreferredLocale]:
    AuditLogChangeKey.Guild.PreferredLocale;
  [AuditLogChangeKey.Guild.PruneKickPeriod]:
    AuditLogChangeKey.Guild.PruneKickPeriod;
  [AuditLogChangeKey.Guild.PublicUpdatesChannel]:
    AuditLogChangeKey.Guild.PublicUpdatesChannel;
  [AuditLogChangeKey.Guild.Region]: AuditLogChangeKey.Guild.Region;
  [AuditLogChangeKey.Guild.RulesChannel]: AuditLogChangeKey.Guild.RulesChannel;
  [AuditLogChangeKey.Guild.Splash]: AuditLogChangeKey.Guild.Splash;
  [AuditLogChangeKey.Guild.SystemChannel]:
    AuditLogChangeKey.Guild.SystemChannel;
  [AuditLogChangeKey.Guild.VanityURLCode]:
    AuditLogChangeKey.Guild.VanityURLCode;
  [AuditLogChangeKey.Guild.VerificationLevel]:
    AuditLogChangeKey.Guild.VerificationLevel;
  [AuditLogChangeKey.Guild.Widget]: AuditLogChangeKey.Guild.Widget;
  [AuditLogChangeKey.Guild.WidgetChannel]:
    AuditLogChangeKey.Guild.WidgetChannel;
  [AuditLogChangeKey.Integration.Emoticons]:
    AuditLogChangeKey.Integration.Emoticons;
  [AuditLogChangeKey.Integration.ExpireBehaviour]:
    AuditLogChangeKey.Integration.ExpireBehaviour;
  [AuditLogChangeKey.Integration.ExpiryGracePeriod]:
    AuditLogChangeKey.Integration.ExpiryGracePeriod;
  [AuditLogChangeKey.Integration.Name]: AuditLogChangeKey.Integration.Name;
  [AuditLogChangeKey.Channel.Application]:
    AuditLogChangeKey.Channel.Application;
  [AuditLogChangeKey.Channel.Bitrate]: AuditLogChangeKey.Channel.Bitrate;
  [AuditLogChangeKey.Channel.Cooldown]: AuditLogChangeKey.Channel.Cooldown;
  [AuditLogChangeKey.Channel.DefaultThreadAutoArchiveDuration]:
    AuditLogChangeKey.Channel.DefaultThreadAutoArchiveDuration;
  [AuditLogChangeKey.Channel.Description]:
    AuditLogChangeKey.Channel.Description;
  [AuditLogChangeKey.Channel.NSFW]: AuditLogChangeKey.Channel.NSFW;
  [AuditLogChangeKey.Channel.Name]: AuditLogChangeKey.Channel.Name;
  [AuditLogChangeKey.Channel.Permissions]:
    AuditLogChangeKey.Channel.Permissions;
  [AuditLogChangeKey.Channel.Position]: AuditLogChangeKey.Channel.Position;
  [AuditLogChangeKey.Channel.Topic]: AuditLogChangeKey.Channel.Topic;
  [AuditLogChangeKey.Channel.UserLimit]: AuditLogChangeKey.Channel.UserLimit;
  [AuditLogChangeKey.Thread.Archived]: AuditLogChangeKey.Thread.Archived;
  [AuditLogChangeKey.Thread.AutoArchiveDuration]:
    AuditLogChangeKey.Thread.AutoArchiveDuration;
  [AuditLogChangeKey.Thread.Lock]: AuditLogChangeKey.Thread.Lock;
  [AuditLogChangeKey.Thread.Name]: AuditLogChangeKey.Thread.Name;
  [AuditLogChangeKey.Invite.Channel]: AuditLogChangeKey.Invite.Channel;
  [AuditLogChangeKey.Invite.Code]: AuditLogChangeKey.Invite.Code;
  [AuditLogChangeKey.Invite.Inviter]: AuditLogChangeKey.Invite.Inviter;
  [AuditLogChangeKey.Invite.MaxAge]: AuditLogChangeKey.Invite.MaxAge;
  [AuditLogChangeKey.Invite.MaxUses]: AuditLogChangeKey.Invite.MaxUses;
  [AuditLogChangeKey.Invite.Temporary]: AuditLogChangeKey.Invite.Temporary;
  [AuditLogChangeKey.Invite.Uses]: AuditLogChangeKey.Invite.Uses;
  [AuditLogChangeKey.Sticker.Available]: AuditLogChangeKey.Sticker.Available;
  [AuditLogChangeKey.Sticker.Description]:
    AuditLogChangeKey.Sticker.Description;
  [AuditLogChangeKey.Sticker.Format]: AuditLogChangeKey.Sticker.Format;
  [AuditLogChangeKey.Sticker.Guild]: AuditLogChangeKey.Sticker.Guild;
  [AuditLogChangeKey.Sticker.Name]: AuditLogChangeKey.Sticker.Name;
  [AuditLogChangeKey.Sticker.RelatedEmoji]:
    AuditLogChangeKey.Sticker.RelatedEmoji;
  [AuditLogChangeKey.User.Avatar]: AuditLogChangeKey.User.Avatar;
  [AuditLogChangeKey.User.Deaf]: AuditLogChangeKey.User.Deaf;
  [AuditLogChangeKey.User.Mute]: AuditLogChangeKey.User.Mute;
  [AuditLogChangeKey.User.Nickname]: AuditLogChangeKey.User.Nickname;
  [AuditLogChangeKey.Role.Add]: AuditLogChangeKey.Role.Add;
  [AuditLogChangeKey.Role.AllowChannelPermission]:
    AuditLogChangeKey.Role.AllowChannelPermission;
  [AuditLogChangeKey.Role.Colour]: AuditLogChangeKey.Role.Colour;
  [AuditLogChangeKey.Role.DenyChannelPermission]:
    AuditLogChangeKey.Role.DenyChannelPermission;
  [AuditLogChangeKey.Role.Hoist]: AuditLogChangeKey.Role.Hoist;
  [AuditLogChangeKey.Role.Icon]: AuditLogChangeKey.Role.Icon;
  [AuditLogChangeKey.Role.Mentionable]: AuditLogChangeKey.Role.Mentionable;
  [AuditLogChangeKey.Role.Name]: AuditLogChangeKey.Role.Name;
  [AuditLogChangeKey.Role.Permissions]: AuditLogChangeKey.Role.Permissions;
  [AuditLogChangeKey.Role.Remove]: AuditLogChangeKey.Role.Remove;
  [AuditLogChangeKey.Role.UnicodeEmoji]: AuditLogChangeKey.Role.UnicodeEmoji;
}
