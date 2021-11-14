import { Nullable } from "../../_internals/utils.ts";
import { GuildWelcomeScreenChannel } from "./channel.ts";

export interface GuildWelcomeScreen {
  description: Nullable<string>;
  welcome_channels: GuildWelcomeScreenChannel[];
}
