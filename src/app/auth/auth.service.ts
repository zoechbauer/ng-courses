import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatSnackBar } from '@angular/material/snack-bar';

import { AuthData } from './auth-data.model';
import { AuthUser } from './auth-data.model';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authChanged = new Subject<AuthUser>();
  private authUser: AuthUser;

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private snackBar: MatSnackBar
  ) {}

  login(login: AuthData) {
    this.afAuth
      .signInWithEmailAndPassword(login.email, login.password)
      .then((user) => {
        console.log('Login af', user);
        this.setUserType(login.email);
        this.router.navigate(['/courses']);
      })
      .catch((err) => {
        console.log('ERR on Login af', err);
        this.snackBar.open('Benutzer und/oder Kennwort sind ungültig', null, {
          duration: environment.snackbar.duration,
        });
      });
  }

  logout() {
    this.afAuth
      .signOut()
      .then((res) => {
        console.log('logout af', res);
        this.setUserType(null);
        this.router.navigate(['/']);
        this.snackBar.open('Sie wurden abgemeldet', null, {
          duration: environment.snackbar.duration,
        });
      })
      .catch((err) => {
        this.snackBar.open(err, null, {
          duration: environment.snackbar.duration,
        });
      });
  }

  setUserType(email: string) {
    if (email == null) {
      this.authUser = AuthUser.null;
    } else {
      this.authUser =
        email === environment.admin.login ? AuthUser.admin : AuthUser.user;
    }
    this.authChanged.next(this.authUser);
  }

  isAuth() {
    return this.authUser !== AuthUser.null;
  }

  isAdmin() {
    return this.authUser === AuthUser.admin;
  }
}
