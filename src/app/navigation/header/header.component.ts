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

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() sidenavToggle = new EventEmitter<void>();
  authStoreSub: Subscription;

  constructor(public authStore: AuthStore, private router: Router) {}

  ngOnInit(): void {}

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
