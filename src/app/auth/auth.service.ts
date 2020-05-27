import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

import { AuthData } from './auth-data.model';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authChanged = new Subject<boolean>();
  private isAuthenticated = false;

  constructor(private router: Router, private afAuth: AngularFireAuth) {}

  login(login: AuthData) {
    this.afAuth
      .signInWithEmailAndPassword(login.email, login.password)
      .then((user) => {
        console.log('Login af', user);
        this.authChanged.next(true);
        this.isAuthenticated = true;
        this.router.navigate(['/courses']);
      })
      .catch((err) => {
        console.log('ERR on Login af', err);
        // TODO display notification error
      });
  }

  logout() {
    this.afAuth
      .signOut()
      .then((res) => {
        console.log('logout af', res);
        this.authChanged.next(false);
        this.isAuthenticated = false;
        this.router.navigate(['/']);
        // TODO display notification info
      })
      .catch((err) => {
        // TODO display notification error
      });
  }

  isAuth() {
    return this.isAuthenticated;
  }
}
