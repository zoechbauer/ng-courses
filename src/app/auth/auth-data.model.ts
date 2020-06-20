/**
 * Interface for login
 */
export interface AuthData {
  email: string;
  password: string;
}

/**
 * Used for showing/hide menuitems
 */
export enum AuthUser {
  user,
  admin,
}

/**
 * User object returned on login
 */
export interface User {
  email: string;
  userType: AuthUser;
  photoUrl: string;
}
