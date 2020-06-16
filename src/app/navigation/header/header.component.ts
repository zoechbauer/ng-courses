import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

import { AuthStore } from 'src/app/auth/auth.store';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() sidenavToggle = new EventEmitter<void>();
  authStoreSub: Subscription;
  logoText: string;
  logoIcon: string;

  constructor(public authStore: AuthStore, private router: Router) {}

  ngOnInit(): void {
    this.logoText = environment.logo.text;
    this.logoIcon = environment.logo.maticon;
  }

  onToggleSidenav() {
    this.sidenavToggle.emit();
  }

  onLogout() {
    this.authStoreSub = this.authStore
      .logout()
      .subscribe(() => this.router.navigate(['/']));
  }

  onDisplayCourses() {
    this.router.navigate(['/courses']);
  }

  onSearchCourses() {
    this.router.navigate(['/courses/search']);
  }

  onManageCourses() {
    this.router.navigate(['/courses/edit']);
  }

  onNewCourse() {
    this.router.navigate(['/courses/new']);
  }

  ngOnDestroy() {
    this.authStoreSub.unsubscribe();
  }
}
