import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import {
  AuthData,
  User,
  AuthUser,
  EnvironmentCredentials,
} from '../auth-data.model';
import { environment } from 'src/environments/environment';
import { AuthStore } from '../auth.store';

/**
 * This component is used for login user.
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  automaticAdminLogin = false;
  // needed for unit tests
  login: AuthData;
  environmentCredentials: EnvironmentCredentials;

  constructor(private authStore: AuthStore, private router: Router) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('show_courses@test.com', {
        validators: [Validators.required, Validators.email],
      }),
      password: new FormControl('display#courses', {
        validators: [Validators.required, Validators.minLength(7)],
      }),
      loginAsAdmin: new FormControl(),
    });

    this.getAutomaticLoginCredentials();
  }

  /**
   *  get credentials for automatic login as admin and store data in member obj
   *  needed in unit tests
   *  if admin password in ENV is not blank than checkbox for autom.login is displayed
   */
  private getAutomaticLoginCredentials() {
    this.environmentCredentials = {};
    if (environment.admin) {
      this.environmentCredentials.admin = {
        login: environment.admin.login,
        password: environment.admin.password,
      };
      this.setupAutomaticLogin();
    }
  }

  /**
   * init form for automatic login
   */
  setupAutomaticLogin() {
    if (this.environmentCredentials.admin.password !== '') {
      this.automaticAdminLogin = true;
      this.loginForm.patchValue({ loginAsAdmin: { checked: true } });
    } else {
      this.automaticAdminLogin = false;
      this.loginForm.patchValue({ loginAsAdmin: { checked: false } });
    }
    console.log('automaticAdminLogin', this.automaticAdminLogin);
  }

  /**
   * Login user.
   * Only in Development: If admin is selected and credentials are stored in config then use config credentials.
   */
  onSubmit() {
    console.log('onSubmit', this.loginForm.value);
    if (this.loginForm.value.loginAsAdmin.checked) {
      console.log(
        'use admin credentials for login',
        this.loginForm.value.loginAsAdmin
      );
      this.login = {
        email: environment.admin.login,
        password: environment.admin.password,
      };
    } else {
      console.log(
        'use form credentials for login',
        this.loginForm.value.loginAsAdmin
      );
      this.login = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password,
      };
    }

    this.authStore.login(this.login).subscribe((res: User) => {
      console.log(`${res.email} logged in as ${res.userType}`);
      if (res.userType === AuthUser.admin) {
        this.router.navigate(['/courses/edit']);
      } else {
        this.router.navigate(['/courses']);
      }
    });
  }
}
