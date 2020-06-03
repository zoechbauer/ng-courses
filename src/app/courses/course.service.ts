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
import {
  ISelectOptions,
  schoolSelectOptions,
  teacherSelectOptions,
  categorySelectOptions,
  topicsSelectOptions,
} from './course-filter.model';

export interface IAppCredentials {
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

  schoolSelectOptions: ISelectOptions[];
  teacherSelectOptions: ISelectOptions[];
  categorySelectOptions: ISelectOptions[];
  topicsSelectOptons: ISelectOptions[];

  constructor(private afs: AngularFirestore, private router: Router) {}

  getAllFilterOptions() {
    this.schoolSelectOptions = schoolSelectOptions;
    this.teacherSelectOptions = teacherSelectOptions;
    this.categorySelectOptions = categorySelectOptions;
    this.topicsSelectOptons = topicsSelectOptions;
  }

  // this credentials are used in all course apps
  getAppCredentials(): IAppCredentials {
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
        this.courseRead.next(course);
      });
  }

  // store changed course data
  // TODO snackbar notification
  updateCourse(course: Course) {
    this.afs
      .doc('courses/' + course.id)
      .update(course)
      .then((res) => {
        console.log('Course updated', res);
        this.router.navigate(['/courses/edit']);
      })
      .catch((err) => console.log('Error Update Course', err));
  }

  // store new course data
  // TODO snackbar notification
  addCourse(course: Course) {
    course.id = null;
    this.afs
      .collection('courses')
      .add(course)
      .then((_) => {
        console.log('Course added');
        this.router.navigate(['/courses/edit']);
      })
      .catch((err) => console.log('Error Adding Course', err));
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
                ...(doc.payload.doc.data() as {}),
                id: doc.payload.doc.id,
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
