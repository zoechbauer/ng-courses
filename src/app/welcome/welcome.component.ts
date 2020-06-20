import { Component, OnInit } from '@angular/core';

/**
 * This Component is used to display a short description of this app as Welcome Page.
 */
@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
})
export class WelcomeComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
