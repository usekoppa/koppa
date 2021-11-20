export type AuthorisationType = "Bot" | "Bearer";

export interface Authorisation {
  token: string;
  type: AuthorisationType;
}
