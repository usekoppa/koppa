export interface Authorisation {
  token: string;
  scheme: AuthorisationScheme;
}

export type AuthorisationScheme = "Bot" | "Bearer";
