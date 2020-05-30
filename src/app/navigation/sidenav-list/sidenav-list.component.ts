import { Component, OnInit, EventEmitter, Output } from '@angular/core';

import { AuthService } from 'src/app/auth/auth.service';
import { AuthUser } from 'src/app/auth/auth-data.model';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css'],
})
export class SidenavListComponent implements OnInit {
  @Output() closeSidenav = new EventEmitter<void>();
  loggedIn = false;
  isAdmin = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.authChanged.subscribe((auth: AuthUser) => {
      this.loggedIn = auth === AuthUser.null ? false : true;
      this.isAdmin = auth === AuthUser.admin ? true : false;
    });
  }

  onLogout() {
    this.authService.logout();
  }

  onClose() {
    this.closeSidenav.emit();
  }
}
