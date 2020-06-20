import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

/**
 * This Service is used for displaying a Spinner on loading data.
 */
@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  loading$: Observable<boolean> = this.loadingSubject.asObservable();

  loadingOn() {
    console.log('loading On');
    this.loadingSubject.next(true);
  }

  loadingOff() {
    console.log('loading Off');
    this.loadingSubject.next(false);
  }
}
