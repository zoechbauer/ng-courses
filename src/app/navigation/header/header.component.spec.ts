import {
  async,
  ComponentFixture,
  TestBed,
  fakeAsync,
  flush,
  tick,
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

  it('should show menu item logout if user is logged in', () => {
    pending();
  });

  it('should show menu item help if user is logged in', () => {
    pending();
  });

  it('should show login button if user is logged out', fakeAsync(() => {
    component.authStore.isLoggedIn$ = of(false);
    component.authStore.isLoggedOut$ = of(true);
    component.authStore.isAdmin$ = of(false);

    fixture.detectChanges();
    flush();

    const menItems = el.queryAll(By.css('.navigation-items>li'));

    expect(menItems.length).toBeGreaterThan(0, 'Could not find menue items');

    const login: string[] = menItems
      .map((li) => li.nativeNode.innerText)
      .filter((txt) => txt.toLowerCase() === 'login');

    expect(login[0].toLocaleLowerCase()).toEqual(
      'login',
      'Could not find Login Button'
    );
  }));

  it('should show menu item Courses if user is logged in', () => {
    pending();
  });

  it('should show Text Admin if user is logged in as admin', () => {
    pending();
  });

  it('should deactvate menu item Manage Courses and New Course unless user is admin', () => {
    pending();
  });
});
