import { GuildMember } from "../guilds/mod.ts";
import { ISO8601, Snowflake } from "../types/mod.ts";
import { Nullable } from "../../utils/type_util.ts";

/**
 * Voice State Object
 * Used to represent a user's voice connection status.
 *
 * https://discord.com/developers/docs/resources/voice#voice-state-object
 */
export interface VoiceState {
  /** The ID of the guild this voice state is for. */
  guild_id?: Snowflake;
  /** The ID of the channel this user is connected to. */
  channel_id: Nullable<Snowflake>; //	the channel id this user is connected to
  /** The ID of the user this voice state is for. */
  user_id: Snowflake; //the user id this voice state is for
  /** The guild member this voice state is for. */
  member?: GuildMember; //guild member object	the guild member this voice state is for
  /** The session ID for this voice state. */
  session_id: string; // 	the session id for this voice state
  /** Whether this user is deafened by the server. */
  deaf: boolean; // whether this user is deafened by the server
  /** Whether this user is muted by the server. */
  mute: boolean; //	whether this user is muted by the server
  /** Whether this user is locally deafened. */
  self_deaf: boolean; //whether this user is locally deafened
  /** Whether this user is locally muted. */
  self_mute: boolean; //whether this user is locally muted
  /** Whether this user is streaming using "Go Live". */
  self_stream?: boolean; //	whether this user is streaming using "Go Live"
  /** Whether this user's camera is enabled. */
  self_video: boolean; //	whether this user's camera is enabled
  /** Whether this user is muted by the current user. (???) */
  suppress: boolean;
  /** The timestamp (ISO8601) at which the user requested to speak. */
  request_to_speak_timestamp: Nullable<ISO8601>; // timestamp	the time at which the user requested to speak
}
