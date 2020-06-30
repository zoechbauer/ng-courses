import {
  async,
  ComponentFixture,
  TestBed,
  fakeAsync,
  flush,
} from '@angular/core/testing';
import { of } from 'rxjs';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { HeaderComponent } from './header.component';
import { AuthStore } from 'src/app/auth/auth.store';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { MaterialModule } from 'src/app/material.module';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let el: DebugElement;
  let authStore: AuthStore;
  let authStoreSpy: any;

  beforeEach(async(() => {
    authStoreSpy = jasmine.createSpyObj('AuthStore', ['logout']);

    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [AppRoutingModule, MaterialModule],
      providers: [{ provide: AuthStore, useValue: authStoreSpy }],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(HeaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        authStore = TestBed.inject(AuthStore);
        el = fixture.debugElement;
      });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show logout button if user is logged in', fakeAsync(() => {
    component.authStore.isLoggedIn$ = of(true);

    fixture.detectChanges();
    flush();

    const navItems = el.queryAll(By.css('.navigation-items>li'));

    expect(navItems.length).toBeGreaterThan(
      0,
      'Could not find navigation items'
    );

    const logout: string[] = navItems
      .map((li) => li.nativeNode.innerText)
      .filter((txt) => txt.toLowerCase() === 'logout');

    expect(logout[0].toLowerCase()).toEqual(
      'logout',
      'Could not find Logout Button'
    );
  }));

  it('should show button with help icon if user is logged in', fakeAsync(() => {
    component.authStore.isLoggedIn$ = of(true);

    fixture.detectChanges();
    flush();

    const navItems = el.queryAll(By.css('.navigation-items>li mat-icon'));

    expect(navItems.length).toBe(1, 'Could not find help icon');

    const help: string[] = navItems
      .map((li) => li.nativeNode.innerText)
      .filter((txt) => txt.toLowerCase() === 'help');

    expect(help[0].toLowerCase()).toEqual(
      'help',
      'Could not find Help Button with mat-icon help'
    );
  }));

  it('should show login button if user is logged out', fakeAsync(() => {
    component.authStore.isLoggedOut$ = of(true);

    fixture.detectChanges();
    flush();

    const navItems = el.queryAll(By.css('.navigation-items>li'));

    expect(navItems.length).toBeGreaterThan(
      0,
      'Could not find navigation items'
    );

    const login: string[] = navItems
      .map((li) => li.nativeNode.innerText)
      .filter((txt) => txt.toLowerCase() === 'login');

    expect(login[0].toLowerCase()).toEqual(
      'login',
      'Could not find Login Button'
    );
  }));

  it('should show Courses button if user is logged in', fakeAsync(() => {
    component.authStore.isLoggedIn$ = of(true);

    fixture.detectChanges();
    flush();

    const navItems = el.queryAll(By.css('.navigation-items>li'));

    expect(navItems.length).toBeGreaterThan(
      0,
      'Could not find navigation items'
    );

    const logout: string[] = navItems
      .map((li) => li.nativeNode.innerText)
      .filter((txt) => txt.toLowerCase() === 'kurse');

    expect(logout[0].toLowerCase()).toEqual(
      'kurse',
      'Could not find Logout Button'
    );
  }));

  it('should show Text Admin if user is logged in as admin', () => {
    pending();
  });

  it('should deactvate some menu items of Courses menue button unless user is admin', () => {
    pending();
  });
});
