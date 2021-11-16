import { Snowflake } from "../types/snowflake.ts";

export interface ScheduledEvent {
  /** The id of the scheduled event. */
  id: Snowflake;
}

/**
 * Guild Scheduled Event
 *
 * A representation of a scheduled event in a guild.
 *
 * https://discord.com/developers/docs/resources/guild-scheduled-event#guild-scheduled-event
 */
export namespace ScheduledEvent {}
