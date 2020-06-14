export interface AuthData {
  email: string;
  password: string;
}

export enum AuthUser {
  user,
  admin,
}

export interface User {
  email: string;
  userType: AuthUser;
  photoUrl: string;
}
