import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  OnDestroy,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

import { AuthStore } from 'src/app/auth/auth.store';

/**
 * This Component is used for navigation for mobile devices.
 */
@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css'],
})
export class SidenavListComponent implements OnInit, OnDestroy {
  @Output() closeSidenav = new EventEmitter<void>();
  authStoreSub: Subscription;

  constructor(public authStore: AuthStore, private router: Router) {}

  ngOnInit(): void {}

  onLogout() {
    this.authStoreSub = this.authStore
      .logout()
      .subscribe(() => this.router.navigate(['/']));
  }

  onClose() {
    this.closeSidenav.emit();
  }

  ngOnDestroy() {
    this.authStoreSub.unsubscribe();
  }
}
