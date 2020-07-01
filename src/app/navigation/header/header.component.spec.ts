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
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';

import { HeaderComponent } from './header.component';
import { AuthStore } from 'src/app/auth/auth.store';
import { MaterialModule } from 'src/app/material.module';
import { AppRoutingModule } from 'src/app/app-routing.module';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let el: DebugElement;
  let authStore: AuthStore;
  let authStoreSpy: any;
  let router: Router;
  let navigateSpy: any;

  function getNavItems() {
    fixture.detectChanges();
    flush();
    return el.queryAll(By.css('.navigation-items>li'));
  }

  function filterNavItems(
    navItems: DebugElement[],
    filterText: string
  ): string[] {
    return navItems
      .map((li) => li.nativeNode.innerText)
      .filter((txt) => txt.toLowerCase() === filterText.toLowerCase());
  }

  beforeEach(async(() => {
    // mock logout
    authStoreSpy = jasmine.createSpyObj('AuthStore', ['logout']);
    authStoreSpy.logout.and.callFake(() => of(router.navigate(['/'])));

    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [NoopAnimationsModule, AppRoutingModule, MaterialModule],
      providers: [{ provide: AuthStore, useValue: authStoreSpy }],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(HeaderComponent);
        authStore = TestBed.inject(AuthStore);
        component = fixture.componentInstance;
        el = fixture.debugElement;
        fixture.autoDetectChanges(true);
        //  mock routing
        router = TestBed.inject(Router);
        navigateSpy = spyOn(router, 'navigate');
      });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show logout button if user is logged in', fakeAsync(() => {
    component.authStore.isLoggedIn$ = of(true);

    const navItems = getNavItems();

    expect(navItems.length).toBeGreaterThan(
      0,
      'Could not find navigation items'
    );

    const logout = filterNavItems(navItems, 'logout');

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

    const help = filterNavItems(navItems, 'help');

    expect(help[0].toLowerCase()).toEqual(
      'help',
      'Could not find Help Button with mat-icon help'
    );
  }));

  it('should show login button if user is logged out', fakeAsync(() => {
    component.authStore.isLoggedOut$ = of(true);

    const navItems = getNavItems();

    expect(navItems.length).toBeGreaterThan(
      0,
      'Could not find navigation items'
    );

    const login = filterNavItems(navItems, 'login');

    expect(login[0].toLowerCase()).toEqual(
      'login',
      'Could not find Login Button'
    );
  }));

  it('should show Courses button if user is logged in', fakeAsync(() => {
    component.authStore.isLoggedIn$ = of(true);

    const navItems = getNavItems();

    expect(navItems.length).toBeGreaterThan(
      0,
      'Could not find navigation items'
    );

    const courses = filterNavItems(navItems, 'kurse');

    expect(courses[0].toLowerCase()).toEqual(
      'kurse',
      'Could not find Logout Button'
    );
  }));

  it('should show Text Admin if user is logged in as admin', fakeAsync(() => {
    component.authStore.isLoggedIn$ = of(true);
    component.authStore.isAdmin$ = of(true);

    fixture.detectChanges();
    flush();

    const navItems = el.queryAll(By.css('.logo .admin'));

    expect(navItems.length).toBe(1, 'Could not find logo-admin element');

    const admin: string[] = navItems.map((item) => item.nativeNode.innerText);

    expect(admin[0]).toEqual('Admin', 'Could not find text Admin');
  }));

  it('should deactvate some menu items of Courses menue button if user is not admin', fakeAsync(() => {
    component.authStore.isLoggedIn$ = of(true);

    fixture.detectChanges();
    flush();

    const menuBtn = el.nativeElement.querySelector('#course-menu');
    menuBtn.click();

    fixture.detectChanges();
    flush();

    const menuItemsFull = el.queryAll(By.css('.course-menu .mat-menu-item'));

    expect(menuItemsFull.length).toEqual(
      4,
      'Unexpected number of Course menu items'
    );

    const menuItems = menuItemsFull.map((li) => {
      return {
        innerText: li.nativeNode.innerText,
        disabled: li.nativeNode.disabled,
      };
    });

    const enabledItemsCounter = menuItems.reduce((acc, cur) => {
      const val = !cur.disabled ? 1 : 0;
      return acc + val;
    }, 0);

    expect(enabledItemsCounter).toBe(
      2,
      'Incorrect number of enabled menu items'
    );

    const disabledItemsCounter = menuItems.reduce((acc, cur) => {
      const val = cur.disabled ? 1 : 0;
      return acc + val;
    }, 0);

    expect(disabledItemsCounter).toBe(
      2,
      'Incorrect number of disabled menu items'
    );
  }));

  it('should actvate all menu items of Courses menue button if user is admin', fakeAsync(() => {
    component.authStore.isLoggedIn$ = of(true);
    component.authStore.isAdmin$ = of(true);

    fixture.detectChanges();
    flush();

    const menuBtn = el.nativeElement.querySelector('#course-menu');
    menuBtn.click();

    fixture.detectChanges();
    flush();

    const menuItemsFull = el.queryAll(By.css('.course-menu .mat-menu-item'));

    expect(menuItemsFull.length).toEqual(
      3,
      'Unexpected number of Course menu items'
    );

    const menuItems = menuItemsFull.map((li) => {
      return {
        innerText: li.nativeNode.innerText,
        disabled: li.nativeNode.disabled,
      };
    });

    const enabledItemsCounter = menuItems.reduce((acc, cur) => {
      const val = !cur.disabled ? 1 : 0;
      return acc + val;
    }, 0);

    expect(enabledItemsCounter).toBe(
      3,
      'Incorrect number of enabled menu items'
    );

    const disabledItemsCounter = menuItems.reduce((acc, cur) => {
      const val = cur.disabled ? 1 : 0;
      return acc + val;
    }, 0);

    expect(disabledItemsCounter).toBe(
      0,
      'Incorrect number of disabled menu items'
    );
  }));

  it('should call logout function and navigate to root when clicked', fakeAsync(() => {
    component.authStore.isLoggedIn$ = of(true);

    // get logout button
    const navItems = getNavItems();

    expect(navItems.length).toBeGreaterThan(0, 'Could not find logout button');

    const logout = navItems.filter(
      (li) => li.nativeNode.innerText.toLowerCase() === 'logout'
    );

    const logoutButton = logout[0].nativeNode;

    // check logout function and routing
    logoutButton.click();

    expect(authStoreSpy.logout).toHaveBeenCalled();

    expect(navigateSpy).toHaveBeenCalledWith(['/']);
  }));
});
