import { Injectable } from '@angular/core';

import { AuthData } from './auth-data.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  login(login: AuthData) {
    console.log('LogIn Data in Service', login);
  }
}
