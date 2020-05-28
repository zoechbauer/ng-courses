import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatSnackBar } from '@angular/material/snack-bar';

import { AuthData } from './auth-data.model';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authChanged = new Subject<boolean>();
  private isAuthenticated = false;

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
        this.authChanged.next(true);
        this.isAuthenticated = true;
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
        this.authChanged.next(false);
        this.isAuthenticated = false;
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

  isAuth() {
    return this.isAuthenticated;
  }
}
