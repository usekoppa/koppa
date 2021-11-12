/** All OAuth2 scopes that Discord supports. */
export type OAuth2Scopes =
  | OAuth2Scopes.Activities.Read
  | OAuth2Scopes.Activities.Write
  | OAuth2Scopes.Applications.Builds.Read
  | OAuth2Scopes.Applications.Builds.Write
  | OAuth2Scopes.Applications.Commands.Commands
  | OAuth2Scopes.Applications.Commands.Update
  | OAuth2Scopes.Bot
  | OAuth2Scopes.Connections
  | OAuth2Scopes.Email
  | OAuth2Scopes.GroupDM.Join
  | OAuth2Scopes.Guilds.Guilds
  | OAuth2Scopes.Guilds.Join
  | OAuth2Scopes.Identify
  | OAuth2Scopes.Messages.Read
  | OAuth2Scopes.Relationships.Read
  | OAuth2Scopes.RPC.RPC
  | OAuth2Scopes.RPC.Activities.Write
  | OAuth2Scopes.RPC.Notifications.Read
  | OAuth2Scopes.RPC.Voice.Read
  | OAuth2Scopes.RPC.Voice.Write;

/**
 * These are a list of all the OAuth2 scopes that Discord supports.
 * Some scopes require approval from Discord to use.
 * Requesting them from a user without approval from Discord may cause errors or undocumented behavior in the OAuth2 flow.
 * https://discord.com/developers/docs/topics/oauth2#shared-resources-oauth2-scopes
 */
export namespace OAuth2Scopes {
  export namespace Activities {
    /** Allows your app to fetch data from a user's "Now Playing/Recently Played" list - Requires Discord approval. */
    export type Read = "activities.read";
    export const Read: Read = "activities.read";

    /** Allows your app to update a user's activity - Requires Discord approval, unless using the GameSDK Activity Manager. */
    export type Write = "activities.write";
    export const Write: Write = "activities.write";
  }

  export namespace Applications {
    export namespace Builds {
      /** Allows your app to read build data for a user's applications. */
      export type Read = "applications.builds.read";
      export const Read: Read = "applications.builds.read";

      /** Allows your app to upload/update builds for a user's applications - Requires Discord approval. */
      export type Write = "applications.builds.write";
      export const Write: Write = "applications.builds.write";
    }

    export namespace Commands {
      /** Allows your app to use commands in a guild. */
      export type Commands = "applications.commands";
      export const Commands: Commands = "applications.commands";

      /** Allows your app to update its commands via this bearer token - Client credentials grant only. */
      export type Update = "applications.commands.update";
      export const Update: Update = "applications.commands.update";
    }

    /** Allows your app to read entitlements for a user's applications. */
    export type Entitlements = "applications.entitlements";
    export const Entitlements: Entitlements = "applications.entitlements";

    export namespace Store {
      /** Allows your app to read and update store data (SKUs, store listings, achievements, etc.) for a user's applications. */
      export type Update = "applications.store.update";
      export const Update: Update = "applications.store.update";
    }
  }

  /** For oauth2 bots, this puts the bot in the user's selected guild by default. */
  export type Bot = "bot";
  export const Bot: Bot = "bot";

  /** Allows `/users/@me/connections` to return linked third-party accounts. */
  export type Connections = "connections";
  export const Connections: Connections = "connections";

  /** Enables `/users/@me` to return an `email` */
  export type Email = "email";
  export const Email: Email = "email";

  export namespace GroupDM {
    /** Allows your app to join users to a group DM. */
    export type Join = "gdm.join";
    export const Join: Join = "gdm.join";
  }

  export namespace Guilds {
    /** Allows `/users/@me/guilds` to return basic information about all of a user's guilds. */
    export type Guilds = "guilds";
    export const Guilds: Guilds = "guilds";

    /** Allows `/guilds/{guild.id}/members/{user.id}` to be used for joining users to a guild. */
    export type Join = "guilds.join";
    export const Join: Join = "guilds.join";
  }

  /** Allows `/users/@me` without `email`. */
  export type Identify = "identify";
  export const Identify: Identify = "identify";

  export namespace Messages {
    /**
     * For local rpc server api access,
     * this allows you to read messages from all client channels (otherwise restricted to channels/guilds your app creates).
     */
    export type Read = "messages.read";
    export const Read: Read = "messages.read";
  }

  export namespace Relationships {
    /** Allows your app to know a user's friends and implicit relationships - Requires Discord approval. */
    export type Read = "relationships.read";
    export const Read: Read = "relationships.read";
  }

  export namespace RPC {
    /** For local rpc server access, this allows you to control a user's local Discord client - Requires Discord approval. */
    export type RPC = "rpc";
    export const RPC: RPC = "rpc";

    export namespace Activities {
      /** For local rpc server access, this allows you to update a user's activity - Requires Discord approval. */
      export type Write = "rpc.activities.write";
      export const Write: Write = "rpc.activities.write";
    }

    export namespace Notifications {
      /** For local rpc server access, this allows you to receive notifications pushed out to the user - Requires Discord approval. */
      export type Read = "rpc.notifications.read";
      export const Read: Read = "rpc.notifications.read";
    }

    export namespace Voice {
      /** For local rpc server access, this allows you to read a user's voice settings and listen for voice events - Requires Discord approval. */
      export type Read = "rpc.voice.read";
      export const Read: Read = "rpc.voice.read";

      /** For local rpc server access, this allows you to update a user's voice settings - Requires Discord approval. */
      export type Write = "rpc.voice.write";
      export const Write: Write = "rpc.voice.write";
    }
  }

  export namespace Webhook {
    /** This generates a webhook that is returned in the OAuth2 token response for authorisation code grants. */
    export type Incoming = "webhook.incoming";
    export const Incoming: Incoming = "webhook.incoming";
  }
}
