import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatSnackBar } from '@angular/material/snack-bar';

import { AuthData } from './auth-data.model';
import { AuthUser } from './auth-data.model';
import { environment } from '../../environments/environment';
import { NotificationService } from '../shared/notification.service';

const AUTH_KEY = 'Authentication';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authChanged = new BehaviorSubject<AuthUser>(AuthUser.null);
  private authUser: AuthUser;

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private snackBar: MatSnackBar,
    private notify: NotificationService
  ) {
    this.authUser = JSON.parse(localStorage.getItem(AUTH_KEY));
    this.authChanged.next(this.authUser);
    console.log('auth service created', this.authUser);
  }

  login(login: AuthData) {
    this.afAuth
      .signInWithEmailAndPassword(login.email, login.password)
      .then((user) => {
        // console.log('Login af', user);
        this.setUserType(login.email);
        this.router.navigate(['/courses']);
      })
      .catch((err) => {
        this.notify.showErrorMessage(
          err,
          'Benutzer und/oder Kennwort sind ungültig'
        );
        // this.notify.showErrorMessage('fehler', 'als', 'array');
      });
  }

  logout() {
    this.afAuth
      .signOut()
      .then((res) => {
        // console.log('logout af', res);
        this.setUserType(null);
        this.router.navigate(['/']);
        this.notify.showInfoMessage('Sie wurden abgemeldet');
        localStorage.removeItem(AUTH_KEY);
      })
      .catch((err) => {
        this.notify.showErrorMessage(
          err,
          'Benutzer konnte nicht abgemeldet werden'
        );
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
    localStorage.setItem(AUTH_KEY, JSON.stringify(this.authUser));
  }

  isAuth() {
    console.log('isAuth: authUser', this.authUser);
    return this.authUser === AuthUser.admin || this.authUser === AuthUser.user;
  }

  isAdmin() {
    return this.authUser === AuthUser.admin;
  }
}
