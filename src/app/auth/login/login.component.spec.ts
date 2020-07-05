import {
  async,
  ComponentFixture,
  TestBed,
  fakeAsync,
  flush,
  tick,
} from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { LoginComponent } from './login.component';
import { AuthStore } from '../auth.store';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { MaterialModule } from 'src/app/material.module';
import { environment } from 'src/environments/environment';
import { AuthUser } from '../auth-data.model';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authStore: AuthStore;
  let authStoreSpy: any;
  let routerSpy: any;
  let submitEl: DebugElement;

  beforeEach(async(() => {
    authStoreSpy = jasmine.createSpyObj('AuthStore', ['login']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

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
      providers: [
        { provide: AuthStore, useValue: authStoreSpy },
        { provide: Router, useValue: routerSpy },
      ],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
        authStore = TestBed.inject(AuthStore);
        submitEl = fixture.debugElement.query(By.css('button'));
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

  it('should select checkbox for automated login as defined in environment', () => {
    component.ngOnInit();
    component.environmentCredentials.admin.password = 'password_mock';
    component.setupAutomaticLogin();

    expect(component.automaticAdminLogin).toBeTruthy();
  });

  it('should unselect checkbox for automated login as defined in environment', () => {
    component.ngOnInit();
    component.environmentCredentials.admin.password = ''; // empty password
    component.setupAutomaticLogin();

    expect(component.automaticAdminLogin).toBeFalsy();
  });

  it('should show checkbox if defined in environment', () => {
    component.ngOnInit();
    component.environmentCredentials.admin.password = 'password_mock';
    component.setupAutomaticLogin();

    fixture.detectChanges();

    const chkboxEl = fixture.debugElement.query(By.css('.mat-checkbox'))
      .nativeElement;
    expect(chkboxEl).toBeTruthy();
  });

  it('should hide checkbox if defined in environment', () => {
    component.ngOnInit();
    component.environmentCredentials.admin.password = '';
    component.setupAutomaticLogin();

    fixture.detectChanges();

    const chkboxEl = fixture.debugElement.query(By.css('.mat-checkbox'))
      .nativeElement;

    expect(chkboxEl).toBeNull();
  });

  it('should use environment admin credentials for automated login if checkbox is selected', () => {
    console.log('**** test checkbox is selected');
    component.ngOnInit();
    component.environmentCredentials.admin.password = 'password_mock';
    component.environmentCredentials.admin.login = 'email_mock';
    component.setupAutomaticLogin();

    authStoreSpy.login.and.returnValue(
      of({
        email: 'email_mock',
        userType: AuthUser.admin,
        photoUrl: '',
      })
    );

    expect(component.automaticAdminLogin).toBeTruthy();

    component.login = { email: '', password: '' };

    component.onSubmit();

    expect(component.login.email).toEqual(environment.admin.login);
    expect(component.login.password).toEqual(environment.admin.password);
  });

  it('should use login form credentials for automated login if checkbox is not displayed', fakeAsync(() => {
    console.log('**** test checkbox is not displayed');
    component.ngOnInit();
    component.environmentCredentials.admin.password = ''; // checkbox is not displayed & not used
    component.environmentCredentials.admin.login = 'email_mock';
    component.setupAutomaticLogin();

    authStoreSpy.login.and.returnValue(
      of({
        email: 'user.email@mock.com',
        userType: AuthUser.user,
        photoUrl: '',
      })
    );

    expect(component.automaticAdminLogin).toBeFalsy();

    component.login = { email: '', password: '' };

    component.loginForm.patchValue({
      email: 'user.email@mock.com',
      password: '1234567_mock',
    });

    component.onSubmit();

    tick();

    expect(component.login.email).toEqual('user.email@mock.com');
    expect(component.login.password).toEqual('1234567_mock');
  }));

  it('should use login form credentials for automated login if checkbox is unselected', fakeAsync(() => {
    console.log('**** test checkbox is unselected');
    component.ngOnInit();
    component.environmentCredentials.admin.password = 'password_mock';
    component.environmentCredentials.admin.login = 'email_mock';
    component.setupAutomaticLogin();

    authStoreSpy.login.and.returnValue(
      of({
        email: 'user.email@mock.com',
        userType: AuthUser.user,
        photoUrl: '',
      })
    );

    expect(component.automaticAdminLogin).toBeTruthy();

    component.loginForm.patchValue({ loginAsAdmin: false });

    component.login = { email: '', password: '' };

    component.loginForm.patchValue({
      email: 'user.email@mock.com',
      password: '1234567_mock',
    });

    component.onSubmit();
    tick();

    expect(component.login.email).toEqual('user.email@mock.com');
    expect(component.login.password).toEqual('1234567_mock');
  }));

  it('should navigate to courses if logged in as user', fakeAsync(() => {
    authStoreSpy.login.and.returnValue(
      of({
        email: 'user.email@mock.com',
        userType: AuthUser.user,
        photoUrl: '',
      })
    );

    component.ngOnInit();
    component.environmentCredentials.admin.password = '';
    component.setupAutomaticLogin();

    expect(component.automaticAdminLogin).toBeFalsy();

    component.loginForm.patchValue({
      email: 'user.email@mock.com',
      password: '1234567_mock',
    });

    component.onSubmit();

    tick();

    expect(routerSpy.navigate).toHaveBeenCalledWith(['/courses']);
  }));

  it('should navigate to edit courses if logged in as admin', fakeAsync(() => {
    authStoreSpy.login.and.returnValue(
      of({
        email: 'admin.email@mock.comk',
        userType: AuthUser.admin,
        photoUrl: '',
      })
    );

    component.ngOnInit();
    component.environmentCredentials.admin.password = 'admin_password_mock';
    component.setupAutomaticLogin();

    expect(component.automaticAdminLogin).toBeTruthy();

    component.onSubmit();

    tick();

    expect(routerSpy.navigate).toHaveBeenCalledWith(['/courses/edit']);
  }));
});
