import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, from, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatSnackBar } from '@angular/material/snack-bar';

import { AuthData, User, AuthUser } from './auth-data.model';
import { environment } from '../../environments/environment';
import { NotificationService } from '../shared/notification.service';

const AUTH_KEY = 'auth_user';

/**
 * Perform login & logout in Firebase with Firestore.
 * Store State in member observables.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthStore {
  private subject = new BehaviorSubject<User>(null);
  user$: Observable<User> = this.subject.asObservable();
  isLoggedIn$: Observable<boolean>;
  isLoggedOut$: Observable<boolean>;
  isAdmin$: Observable<boolean>;
  private adminLogin: string;

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private notify: NotificationService
  ) {
    this.adminLogin = environment.admin.login;

    const authUser = JSON.parse(localStorage.getItem(AUTH_KEY));

    this.subject.next(authUser);
    this.isLoggedIn$ = this.user$.pipe(map((user) => !!user));
    this.isLoggedOut$ = this.isLoggedIn$.pipe(map((loggedIn) => !loggedIn));
    this.isAdmin$ = this.user$.pipe(
      map((user) => user && user.email === environment.admin.login)
    );
  }

  /**
   * Login in Firebase with email & password and set values in Store & localStorage
   * @param login AuthData
   */
  login(login: AuthData): Observable<User | any> {
    const login$ = from(
      this.afAuth.signInWithEmailAndPassword(login.email, login.password)
    );
    const user: User = {
      email: login.email,
      userType:
        login.email === this.adminLogin ? AuthUser.admin : AuthUser.user,
      photoUrl: null,
    };

    return login$.pipe(
      map(() => user),
      tap(() => {
        this.subject.next(user);
        localStorage.setItem(AUTH_KEY, JSON.stringify(user));
      }),
      catchError((err) => {
        this.notify.showErrorMessage(
          err,
          'Benutzer und/oder Kennwort sind ungültig'
        );
        return throwError(err);
      })
    );
  }

  /**
   * Logout user from Firebase & Store & localStorage
   */
  logout(): Observable<any> {
    const logout$ = from(this.afAuth.signOut());

    return logout$.pipe(
      tap(() => {
        this.subject.next(null);
        localStorage.removeItem(AUTH_KEY);
        this.notify.showInfoMessage('Sie wurden abgemeldet');
      }),
      catchError((err) => {
        this.notify.showErrorMessage(
          err,
          'Benutzer konnte nicht abgemeldet werden'
        );
        return throwError(err);
      })
    );
  }
}
