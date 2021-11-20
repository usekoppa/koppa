export enum GatewayOpcode {
  /** An event was dispatched - Client action: Receive */
  Dispatch = 0,
  /**	Fired periodically by the client to keep the connection alive - Client action: Send, Receive. */
  Heartbeat = 1,
  /** Starts a new session during the initial handshake - Client action: Send. */
  Identify = 2,
  /** Update the client's presence - Client action: Send. */
  PresenceUpdate = 3,
  /** Used to join/leave or move between voice channels - Client action: Send. */
  VoiceStateUpdate = 4,
  /** Resume a previous session that was disconnected - Client action: Send. */
  Resume = 6,
  /** You should attempt to reconnect and resume immediately - Client action: Receive. */
  Reconnect = 7,
  /** Request information about offline guild members in a large guild - Client action: Send. */
  RequestGuildMembers = 8,
  /** The session has been invalidated. You should reconnect and identify/resume accordingly - Client action: Receive. */
  InvalidSession = 9,
  /** Sent immediately after connecting, contains the `heartbeat_interval` to use - Client action: Receive */
  Hello = 10,
  /** Sent in response to receiving a heartbeat to acknowledge that it has been received - Client action: Receive */
  HeartbeatACK = 11,
}
