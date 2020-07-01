import {
  async,
  ComponentFixture,
  TestBed,
  flush,
  fakeAsync,
} from '@angular/core/testing';
import { Router } from '@angular/router';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DebugElement } from '@angular/core';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

import { SidenavListComponent } from './sidenav-list.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { AuthStore } from 'src/app/auth/auth.store';
import { MaterialModule } from 'src/app/material.module';

fdescribe('SidenavListComponent', () => {
  let component: SidenavListComponent;
  let fixture: ComponentFixture<SidenavListComponent>;
  let el: DebugElement;
  let router: Router;
  let authStore: AuthStore;
  let authStoreSpy: any;
  let navigateSpy: any;

  function getDisabledItems() {
    fixture.detectChanges();
    flush();

    return el.queryAll(
      By.css('.mat-nav-list>.mat-list-item.mat-list-item-disabled')
    );
  }

  beforeEach(async(() => {
    authStoreSpy = jasmine.createSpyObj('AuthStore', ['logout']);
    authStoreSpy.logout.and.callFake(() => router.navigate(['/']));

    TestBed.configureTestingModule({
      declarations: [SidenavListComponent],
      imports: [AppRoutingModule, NoopAnimationsModule, MaterialModule],
      providers: [{ provide: AuthStore, useValue: authStoreSpy }],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(SidenavListComponent);
        component = fixture.componentInstance;
        router = TestBed.inject(Router);
        navigateSpy = spyOn(router, 'navigate');
        authStore = TestBed.inject(AuthStore);
        el = fixture.debugElement;
        fixture.detectChanges();
      });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show login button if user is logged out', () => {
    pending();
  });

  it('should show logout button if user is logged in', () => {
    pending();
  });

  it('should disable course maintenance & new course if logged in user is not admin', () => {
    pending();
  });

  it('should disable all menu items if user is logged out except Login, Back, Home & Todos', () => {
    pending();
  });

  fit('should enable all menu items if logged in user is admin, otherwise not', fakeAsync(() => {
    // logged in & admin
    component.authStore.isAdmin$ = of(true);

    expect(getDisabledItems().length).toBe(
      0,
      'Should no find any disabled nav items'
    );

    // logged in & user
    component.authStore.isAdmin$ = of(false);
    component.authStore.isLoggedIn$ = of(true);

    expect(getDisabledItems().length).toBeGreaterThan(
      0,
      'Should find some disabled nav items'
    );

    // not logged in
    component.authStore.isAdmin$ = of(false);
    component.authStore.isLoggedIn$ = of(false);

    expect(getDisabledItems().length).toBeGreaterThan(
      0,
      'Should find some disabled nav items'
    );
  }));

  it('should call logout function and navigate to root when clicked', () => {
    pending();
  });
});
