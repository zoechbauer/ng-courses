import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { AuthStore } from 'src/app/auth/auth.store';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { MaterialModule } from 'src/app/material.module';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let authStore: AuthStore;

  beforeEach(async(() => {
    const authStoreSpy = jasmine.createSpyObj('AuthStore', ['logout']);

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

  it('should show menu item login if user is logged out', () => {
    pending();
  });

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
