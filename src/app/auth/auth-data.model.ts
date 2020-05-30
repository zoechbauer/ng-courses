export interface AuthData {
  email: string;
  password: string;
}

export enum AuthUser {
  null,
  user,
  admin,
}
