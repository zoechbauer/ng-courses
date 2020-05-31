import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Course } from './course.model';
import { environment } from 'src/environments/environment';

export interface AppCredentials {
  appUser: string;
  appPassword: string;
}

@Injectable({ providedIn: 'root' })
export class CourseService {
  firebaseData: Observable<any>;
  coursesChanged = new Subject<Course[]>();

  constructor(private afs: AngularFirestore) {}

  // this credentials are used in all course apps
  getAppCredentials(): AppCredentials {
    return {
      appUser: environment.course_apps.login,
      appPassword: environment.course_apps.password,
    };
  }

  getCourses(isEditMode: boolean) {
    if (!isEditMode) {
      // read valueChanges - no metadata
      // convert milliseconds into date as Firebase delivers seconds as Date
      this.firebaseData = this.afs
        .collection('courses')
        .valueChanges()
        .pipe(
          map((docArray) => {
            // console.log('map docArray', docArray);
            return docArray.map((doc: {}) => {
              return {
                ...doc,
                confirmationDate: doc['confirmationDate'].toDate(),
              };
            });
          })
        );
    } else {
      // read snapshotChanges - id for update
      // convert seconds into date and add id to course
      this.firebaseData = this.afs
        .collection('courses')
        .snapshotChanges()
        .pipe(
          map((docArray) => {
            return docArray.map((doc) => {
              // console.log('doc', doc);
              return {
                id: doc.payload.doc.id,
                ...(doc.payload.doc.data() as {}),
                confirmationDate: doc.payload.doc
                  .data()
                  ['confirmationDate'].toDate(),
              };
            });
          })
        );
    }
    this.firebaseData.subscribe((courses) => {
      this.coursesChanged.next(courses);
    });
  }
}
