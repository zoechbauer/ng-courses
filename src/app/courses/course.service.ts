import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { Observable, Subject } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Router } from '@angular/router';

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
  courseRead = new Subject<Course>();
  private courseDoc: AngularFirestoreDocument<any>;
  private course: Observable<any>;

  constructor(private afs: AngularFirestore, private router: Router) {}

  // this credentials are used in all course apps
  getAppCredentials(): AppCredentials {
    return {
      appUser: environment.course_apps.login,
      appPassword: environment.course_apps.password,
    };
  }

  // read course data for editing
  getCourse(id: string) {
    this.courseDoc = this.afs.doc('courses/' + id);
    this.course = this.courseDoc.valueChanges();
    this.course
      .pipe(
        map((doc) => {
          return {
            ...doc,
            confirmationDate: doc['confirmationDate'].toDate(),
          };
        }),
        take(1)
      )
      .subscribe((course) => {
        console.log('getCourse', course);
        this.courseRead.next(course);
      });
  }

  // store changed course data
  // TODO snackbar notification
  updateCourse(course: Course) {
    // course.confirmationDate = new Date();
    console.log('updateCourse', course);
    this.afs
      .doc('courses/' + course.id)
      .update(course)
      .then((res) => {
        console.log('Course updated', res);
        this.router.navigate(['/courses/edit']);
      })
      .catch((err) => console.log('Error Update Course', err));
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
