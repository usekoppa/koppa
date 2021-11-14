import { Application } from "../../application/mod.ts";
import { User } from "../../users/mod.ts";

/** https://discord.com/developers/docs/resources/guild#integration-application-object-integration-application-structure */
export type GuildIntegrationApplication =
  & Pick<Application, "id" | "name" | "icon" | "description" | "summary">
  & { bot?: Exclude<User, "bot"> & { bot: true } };
