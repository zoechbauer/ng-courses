import { Component, OnInit, EventEmitter, Output } from '@angular/core';

import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css'],
})
export class SidenavListComponent implements OnInit {
  @Output() closeSidenav = new EventEmitter<void>();
  loggedIn = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.authChanged.subscribe(
      (auth: boolean) => (this.loggedIn = auth)
    );
  }

  onLogout() {
    this.authService.logout();
  }

  onClose() {
    this.closeSidenav.emit();
  }
}
