import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/auth/auth.service';
import { AuthUser } from 'src/app/auth/auth-data.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() sidenavToggle = new EventEmitter<void>();
  authSub: Subscription;
  loggedIn = false;
  isAdmin = false;
  authUser = AuthUser.null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authSub = this.authService.authChanged.subscribe(
      (authUser: AuthUser) => {
        console.log('header: authUser', authUser);
        this.loggedIn = authUser === AuthUser.null ? false : true;
        this.isAdmin = authUser === AuthUser.admin ? true : false;
        this.authUser = authUser;
      }
    );
  }

  onToggleSidenav() {
    this.sidenavToggle.emit();
  }

  onLogout() {
    this.authService.logout();
  }

  onDisplayCourses() {
    this.router.navigate(['/courses']);
  }

  onManageCourses() {
    this.router.navigate(['/courses/edit']);
  }

  ngOnDestroy() {
    this.authSub.unsubscribe();
  }
}
