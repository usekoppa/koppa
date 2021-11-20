import { GuildMember } from "../guilds/member.ts";
import { Message } from "../messages/message.ts";
import { Snowflake } from "../types/snowflake.ts";
import { User } from "../users/user.ts";
import { $TODO } from "../_internals/utils.ts";
import { InteractionType } from "./type.ts";

export interface Interaction {
  /** ID of the interaction. */
  id: Snowflake;
  /** ID of the application this interaction is for. */
  application_id: Snowflake;
  /** The type of interaction. */
  type: InteractionType;
  /** The command data payload. */
  data?: $TODO;
  /** The guild it was sent from. */
  guild_id?: Snowflake;
  /** The channel it was sent from. */
  channel_id?: Snowflake;
  /** Guild member data for the invoking user, including permissions. */
  member?: GuildMember & Required<Pick<GuildMember, "permissions">>;
  /** User object for the invoking user, if invoked in a DM. */
  user?: User.Partial;
  /** A continuation token for responding to the interaction. */
  token: string;
  /** Read-only property, always `1`. */
  version: 1;
  /** For components, the message they were attached to. */
  message?: Message;

}
