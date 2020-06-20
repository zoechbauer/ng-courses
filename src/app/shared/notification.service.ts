import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

import { environment } from 'src/environments/environment';

/**
 * This Service is used for displaying Info/Error messages with Angular Material Snackbar.
 * The displayed message is automatically cleared after a delaytime defined in Config.
 */
@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private config: MatSnackBarConfig;

  constructor(private snackbar: MatSnackBar) {
    this.config = {
      duration: environment.snackbar.duration,
      verticalPosition: 'bottom',
      horizontalPosition: 'center',
    };
  }

  /**
   * Show and log Error Messages
   * @param logMessage this message is logged to console.error
   * @param messages this messages are displayed with snackbar
   */
  showErrorMessage(logMessage: string, ...messages: string[]) {
    if (logMessage) {
      console.error(logMessage);
    }

    messages.forEach((message, index) => {
      const timeout = index * (this.config.duration + 500);
      setTimeout(() => {
        this.snackbar.open(message, 'Fehler', this.config);
      }, timeout);
    });
  }

  /**
   * Show Info Messages
   * @param messages this messages are displayed with snackbar
   */
  showInfoMessage(...messages: string[]) {
    messages.forEach((message, index) => {
      const timeout = index * (this.config.duration + 500);
      setTimeout(() => {
        this.snackbar.open(message, 'Info', this.config);
      }, timeout);
    });
  }
}
