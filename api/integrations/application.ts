import { Application } from "../application/application.ts";
import { User } from "../users/user.ts";

/** https://discord.com/developers/docs/resources/guild#integration-application-object-integration-application-structure */
export type IntegrationApplication =
  & Pick<Application, "id" | "name" | "icon" | "description" | "summary">
  & { bot?: Exclude<User, "bot"> & { bot: true } };
