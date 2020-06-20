import { Component, OnInit } from '@angular/core';

/**
 * This Component is used for confirming a Delete Course Request
 */
@Component({
  template: `
    <h2 mat-dialog-title>Kurs löschen</h2>
    <mat-dialog-content>
      <p>Wollen Sie diesen Kurs wirklich löschen?</p>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button [mat-dialog-close]="true">Löschen</button>
      <button mat-button mat-dialog-close cdkFocusInitial>Abbrechen</button>
    </mat-dialog-actions>
  `,
})
export class CourseDeleteDialogComponent {}
