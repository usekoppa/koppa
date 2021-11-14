export type Permission = `${PermissionFlags | number}`;

export namespace Permission {
  /** Allows creation of instant invites. - Channel types: T, V, S. */
  export type CreateInstantInvite = 0x0000000001;

  /** Allows creation of instant invites. */
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
  export const Administrator = (1 << 3);

  
}

/** https://discord.com/developers/docs/topics/permissions#permissions-bitwise-permission-flags */
export type PermissionFlags =
  | Permission.CreateInstantInvite
  | Permission.KickMembers;
