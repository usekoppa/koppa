import type { Nullable } from "../../_internals/utils.ts";
import type { GuildWelcomeScreenChannel } from "./channel.ts";

export interface GuildWelcomeScreen {
  description: Nullable<string>;
  welcome_channels: GuildWelcomeScreenChannel[];
}

export namespace GuildWelcomeScreen {
  export namespace GET {
    export namespace GetGuildWelcomeScreen {}
  }

  export namespace PATCH {
    export namespace ModifyGuildWelcomeScreen {}
  }
}
