export enum GuildFeature {
  /** Guild has access to set an animated guild icon. */
  AnimatedIcon = "ANIMATED_ICON",
  /** Guild has access to set a guild banner image. */
  Banner = "BANNER",
  /** Guild has access to use commerce features (i.e. create store channels). */
  Commerce = "COMMERCE",
  /** Guild can enable welcome screen, Membership Screening, stage channels and discovery, and receives community updates. */
  Community = "COMMUNITY",
  /** Guild is able to be discovered in the directory. */
  Discoverable = "DISCOVERABLE",
  /** Guild is able to be featured in the directory. */
  FeaturableInDiscovery = "FEATURABLE",
  /** Guild has access to set an invite splash background. */
  InviteSplash = "INVITE_SPLASH",
  /** Guild has enabled Membership Screening. */
  MemberVerificationGate = "MEMBER_VERIFICATION_GATE_ENABLED",
  /** Guild has enabled monetisation. */
  Monetised = "MONETIZATION_ENABLED",
  /** Guild has increased custom sticker slots. */
  MoreStickers = "MORE_STICKERS",
  /** Guild has access to create news channels. */
  News = "NEWS",
  /** Guild is partnered. */
  Partnered = "PARTNERED",
  /** Guild can be previewed before joining via Membership Screening or the directory. */
  Previewable = "PREVIEW_ENABLED",
  /** Guild has access to create private threads. */
  PrivateThreads = "PRIVATE_THREADS",
  /** Guild is able to set role icons. */
  RoleIcons = "ROLE_ICONS",
  /** Guild has access to the 7 day archive time for threads. */
  SevenDayThreadArchive = "SEVEN_DAY_THREAD_ARCHIVE",
  /** Guild has access to the 3 day archive time for threads. */
  ThreeDayThreadArchive = "THREE_DAY_THREAD_ARCHIVE",
  /** Guild has enabled ticketed events. */
  TicketedEvents = "TICKETED_EVENTS_ENABLED",
  /** Guild has access to set a vanity URL. */
  VanityURL = "VANITY_URL",
  /** Guild is verified by Discord. */
  Verified = "VERIFIED",
  /** Guild has access to set 384kbps bitrate in voice. */
  VIPRegions = "VIP_REGIONS",
  /** Guild has enabled the welcome screen. */
  WelcomeScreen = "WELCOME_SCREEN_ENABLED",
}
