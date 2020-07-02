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

  function getSidenavItemsDom(): HTMLElement[] {
    fixture.detectChanges();
    flush();

    const itemsDe: DebugElement[] = el.queryAll(
      By.css('.mat-nav-list>.mat-list-item')
    );
    const itemsDom: HTMLElement[] = itemsDe.map((item) => item.nativeElement);
    return itemsDom;
  }

  function getDisabledSidenavItemsDom(): HTMLElement[] {
    return getSidenavItemsDom().filter((item) =>
      item.classList.contains('mat-list-item-disabled')
    );
  }

  function getSidenavItemsText(): string[] {
    return getSidenavItemsDom()
      .filter((item) => item.querySelector('span'))
      .map((item) => {
        console.log(item);
        return item.querySelector('span').innerText.toLowerCase();
      });
  }

  function getDisabledSidenavItemsText(): string[] {
    return getDisabledSidenavItemsDom()
      .filter((item) => item.querySelector('span'))
      .map((item) => item.querySelector('span').innerText.toLowerCase());
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

  it('should show login button if user is logged out', fakeAsync(() => {
    component.authStore.isLoggedOut$ = of(true);

    expect(getSidenavItemsText()).toContain('login');
    expect(getSidenavItemsText()).not.toContain('logout');
  }));

  it('should show logout button if user is logged in', fakeAsync(() => {
    component.authStore.isLoggedIn$ = of(true);

    expect(getSidenavItemsText()).not.toContain('login');
    expect(getSidenavItemsText()).toContain('logout');

    console.log('getSidenavItemsText()', getSidenavItemsText());
  }));

  it('should disable some items in course menu depending on authentication', fakeAsync(() => {
    // logged in as user
    component.authStore.isLoggedIn$ = of(true);

    let disabledItems = getDisabledSidenavItemsText();
    let enabledItems = getSidenavItemsText();

    expect(disabledItems).toContain('kurse bearbeiten');
    expect(disabledItems).toContain('neuer kurs');
    expect(disabledItems).not.toContain('kurse suchen');
    expect(disabledItems).not.toContain('kurse anzeigen');

    expect(enabledItems).toContain('kurse suchen');
    expect(enabledItems).toContain('kurse anzeigen');

    // logged in as admin
    component.authStore.isAdmin$ = of(true);

    disabledItems = getDisabledSidenavItemsText();
    enabledItems = getSidenavItemsText();

    expect(disabledItems).not.toContain('kurse anzeigen');
    expect(disabledItems).not.toContain('kurse suchen');
    expect(disabledItems).not.toContain('kurse bearbeiten');
    expect(disabledItems).not.toContain('neuer kurs');

    expect(enabledItems).not.toContain('kurse anzeigen');

    // logged out
    component.authStore.isLoggedOut$ = of(true);
    component.authStore.isAdmin$ = of(false);
    component.authStore.isLoggedIn$ = of(false);

    disabledItems = getDisabledSidenavItemsText();

    expect(disabledItems).toContain('kurse anzeigen');
    expect(disabledItems).toContain('kurse suchen');
    expect(disabledItems).toContain('kurse bearbeiten');
    expect(disabledItems).toContain('neuer kurs');
  }));

  it('should disable all menu items if user is logged out except Login, Back, Home & Todos', fakeAsync(() => {
    component.authStore.isLoggedOut$ = of(true);

    const disabledItems = getDisabledSidenavItemsText();
    const allItems = getSidenavItemsText();

    console.log('all & disabled sidenav items', allItems, disabledItems);

    expect(disabledItems.length).toBeGreaterThan(
      0,
      'Could not find any disabled nav items'
    );

    expect(disabledItems).not.toContain('login');
    expect(disabledItems).not.toContain('zurück');
    expect(disabledItems).not.toContain('home');
    expect(disabledItems).not.toContain('todos');

    expect(allItems).toContain('login');
    expect(allItems).toContain('zurück');
    expect(allItems).toContain('home');
    expect(allItems).toContain('todos');
  }));

  it('should enable all menu items if logged in user is admin, otherwise not', fakeAsync(() => {
    // logged in & admin
    component.authStore.isAdmin$ = of(true);

    expect(getDisabledSidenavItemsDom().length).toBe(
      0,
      'Should not find any disabled nav items'
    );

    // logged in & user
    component.authStore.isAdmin$ = of(false);
    component.authStore.isLoggedIn$ = of(true);

    expect(getDisabledSidenavItemsDom().length).toBeGreaterThan(
      0,
      'Should find some disabled nav items'
    );

    // not logged in
    component.authStore.isAdmin$ = of(false);
    component.authStore.isLoggedIn$ = of(false);

    expect(getDisabledSidenavItemsDom().length).toBeGreaterThan(
      0,
      'Should find some disabled nav items'
    );
  }));

  it('should call logout function and navigate to root when clicked', () => {
    pending();
  });
});
