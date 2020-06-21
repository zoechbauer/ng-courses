import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthData, User, AuthUser } from '../auth-data.model';
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

  constructor(private authStore: AuthStore, private router: Router) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('show_courses@test.com', {
        validators: [Validators.required, Validators.email],
      }),
      password: new FormControl('display#courses', {
        validators: [Validators.required, Validators.minLength(7)],
      }),
      loginAsAdmin: new FormControl('checked'),
    });

    // show checkbox for automatic admin login if defined in settings
    this.automaticAdminLogin = environment.admin.password !== '' ? true : false;
  }

  /**
   * Login user.
   * Only in Development: If admin is selected and credentials are stored in config then use config credentials.
   */
  onSubmit() {
    // console.log(this.loginForm.value.loginAsAdmin);
    let login: AuthData;
    if (
      this.loginForm.value.loginAsAdmin &&
      environment.admin.password.length !== 0
    ) {
      login = {
        email: environment.admin.login,
        password: environment.admin.password,
      };
    } else {
      login = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password,
      };
    }

    this.authStore.login(login).subscribe((res: User) => {
      console.log(`${res.email} logged in as ${res.userType}`);
      if (res.userType === AuthUser.admin) {
        this.router.navigate(['/courses/edit']);
      } else {
        this.router.navigate(['/courses']);
      }
    });
  }
}
