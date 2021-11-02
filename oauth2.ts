export namespace OAuth2 {
  export namespace Scopes {
    export type Scopes =
      | Activities.Read
      | Activities.Write
      | Applications.Builds.Read
      | Applications.Builds.Write
      | Applications.Commands.Commands
      | Applications.Commands.Update
      | Bot
      | Connections
      | Email
      | GroupDM.Join
      | Guilds.Guilds
      | Guilds.Join
      | Identify
      | Messages.Read
      | Relationships.Read
      | RPC.RPC
      | RPC.Activities.Write
      | RPC.Notifications.Read
      | RPC.Voice.Read
      | RPC.Voice.Write;

    export namespace Activities {
      export type Read = "activities.read";
      export const Read: Read = "activities.read";

      export type Write = "activities.write";
      export const Write: Write = "activities.write";
    }

    export namespace Applications {
      export namespace Builds {
        export type Read = "applications.builds.read";
        export const Read: Read = "applications.builds.read";

        export type Write = "applications.builds.write";
        export const Write: Write = "applications.builds.write";
      }

      export namespace Commands {
        export type Commands = "applications.commands";
        export const Commands: Commands = "applications.commands";

        export type Update = "applications.commands.update";
        export const Update: Update = "applications.commands.update";
      }

      export type Entitlements = "applications.entitlements";
      export const Entitlements: Entitlements = "applications.entitlements";

      export namespace Store {
        export type Update = "applications.store.update";
        export const Update: Update = "applications.store.update";
      }
    }

    export type Bot = "bot";
    export const Bot: Bot = "bot";

    export type Connections = "connections";
    export const Connections: Connections = "connections";

    export type Email = "email";
    export const Email: Email = "email";

    export namespace GroupDM {
      export type Join = "gdm.join";
      export const Join: Join = "gdm.join";
    }

    export namespace Guilds {
      export type Guilds = "guilds";
      export const Guilds: Guilds = "guilds";

      export type Join = "guilds.join";
      export const Join: Join = "guilds.join";
    }

    export type Identify = "identify";
    export const Identify: Identify = "identify";

    export namespace Messages {
      export type Read = "messages.read";
      export const Read: Read = "messages.read";
    }

    export namespace Relationships {
      export type Read = "relationships.read";
      export const Read: Read = "relationships.read";
    }

    export namespace RPC {
      export type RPC = "rpc";
      export const RPC: RPC = "rpc";

      export namespace Activities {
        export type Write = "rpc.activities.write";
        export const Write: Write = "rpc.activities.write";
      }

      export namespace Notifications {
        export type Read = "rpc.notifications.read";
        export const Read: Read = "rpc.notifications.read";
      }

      export namespace Voice {
        export type Read = "rpc.voice.read";
        export const Read: Read = "rpc.voice.read";

        export type Write = "rpc.voice.write";
        export const Write: Write = "rpc.voice.write";
      }
    }

    export namespace Webhook {
      export type Incoming = "webhook.incoming";
      export const Incoming: Incoming = "webhook.incoming";
    }
  }
}
