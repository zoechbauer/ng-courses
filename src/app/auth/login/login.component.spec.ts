import {
  async,
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
  flush,
} from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { LoginComponent } from './login.component';
import { AuthStore } from '../auth.store';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { MaterialModule } from 'src/app/material.module';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

fdescribe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authStore: AuthStore;
  let authStoreSpy: any;
  let router: Router;
  let navigateSpy: any;
  let submitEl: DebugElement;
  // let emailEl: DebugElement;
  // let passwordEl: DebugElement;

  beforeEach(async(() => {
    authStoreSpy = jasmine.createSpyObj('AuthStore', ['login']);

    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        AppRoutingModule,
        MaterialModule,
        NoopAnimationsModule,
      ],
      providers: [{ provide: AuthStore, useValue: authStoreSpy }],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
        authStore = TestBed.inject(AuthStore);
        router = TestBed.inject(Router);
        navigateSpy = spyOn(router, 'navigate');

        submitEl = fixture.debugElement.query(By.css('button'));
        // emailEl = fixture.debugElement.query(By.css('input[type=email]'));
        // passwordEl = fixture.debugElement.query(By.css('input[type=password]'));

        component.ngOnInit();
      });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check email values', () => {
    const email = component.loginForm.controls.email;

    email.setValue('');
    fixture.detectChanges();
    expect(email.valid).toBeFalsy();

    let errors = {};
    errors = email.errors || {};
    expect(errors['required']).toBeTruthy();

    email.setValue('email.without.at.symbol');
    fixture.detectChanges();
    expect(email.valid).toBeFalsy();

    errors = {};
    errors = email.errors || {};
    expect(errors['email']).toBeTruthy();

    email.setValue('email.address@provider.type');
    fixture.detectChanges();
    expect(email.valid).toBeTruthy();

    errors = {};
    errors = email.errors || {};
    expect(errors).toEqual({});
  });

  it('should check password values', () => {
    const password = component.loginForm.controls.password;

    password.setValue('');
    fixture.detectChanges();
    expect(password.valid).toBeFalsy();

    let errors = {};
    errors = password.errors || {};
    expect(errors['required']).toBeTruthy();

    password.setValue('123');
    fixture.detectChanges();
    expect(password.valid).toBeFalsy();

    errors = {};
    errors = password.errors || {};
    expect(errors['minlength']).toBeTruthy();

    password.setValue('1234567');
    fixture.detectChanges();
    expect(password.valid).toBeTruthy();

    errors = {};
    errors = password.errors || {};
    expect(errors).toEqual({});
  });

  it('should prefill form', () => {
    expect(component.loginForm.valid).toBeTruthy();
  });

  it('should enable submit btn if form is valid', () => {
    expect(submitEl.nativeElement.disabled).toBeFalsy();
  });

  it('should disable submit btn if form is invalid', fakeAsync(() => {
    component.ngOnInit();
    fixture.detectChanges();

    const email = component.loginForm.controls.email;
    email.setValue('');
    fixture.detectChanges();

    expect(submitEl.nativeElement.disabled).toBeTruthy();
  }));
});
