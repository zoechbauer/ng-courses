import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

import { AuthData } from './auth-data.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authChanged = new Subject<boolean>();
  private isAuthenticated = false;

  constructor(private router: Router) {}

  login(login: AuthData) {
    // TODO login is missing
    console.log('Login', login);
    this.authChanged.next(true);
    this.isAuthenticated = true;
    this.router.navigate(['/courses']);
  }

  logout() {
    // TODO logout is missing
    console.log('logout');
    this.authChanged.next(false);
    this.isAuthenticated = false;
    this.router.navigate(['/']);
  }

  isAuth() {
    return this.isAuthenticated;
  }
}
