import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

import { environment } from 'src/environments/environment';

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

  showInfoMessage(...messages: string[]) {
    messages.forEach((message, index) => {
      const timeout = index * (this.config.duration + 500);
      setTimeout(() => {
        this.snackbar.open(message, 'Info', this.config);
      }, timeout);
    });
  }
}
