import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AuthService } from '../auth.service';
import { AuthData } from '../auth-data.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('show_courses@test.com', {
        validators: [Validators.required, Validators.email],
      }),
      password: new FormControl('display#courses', {
        validators: [Validators.required, Validators.minLength(7)],
      }),
    });
  }

  onSubmit() {
    const login: AuthData = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    };
    this.authService.login(login);
  }
}
