import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import {
  AngularFireStorage,
  AngularFireUploadTask,
} from '@angular/fire/storage';
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
  providerSelectOptions,
} from './course-filter.model';
import { LoadingService } from '../shared/loading/loading.service';

export interface IAppCredentials {
  appUser: string;
  appPassword: string;
}

export enum FirebaseCollection {
  courses,
}

export enum FirebaseStorage {
  courseConfirmation,
}

@Injectable({ providedIn: 'root' })
export class CourseService {
  firebaseData: Observable<any>;
  coursesChanged = new Subject<Course[]>();
  courseRead = new Subject<Course>();
  downloadUrl = new Subject<string>();
  private courseDoc: AngularFirestoreDocument<any>;
  private course: Observable<any>;
  private task: AngularFireUploadTask;

  schoolSelectOptions: ISelectOptions[];
  teacherSelectOptions: ISelectOptions[];
  categorySelectOptions: ISelectOptions[];
  topicsSelectOptons: ISelectOptions[];
  providerSelectOptions: ISelectOptions[];

  collectionCourses: string;
  storageCourseConfirmation: string;

  constructor(
    private afs: AngularFirestore,
    private afStorage: AngularFireStorage,
    private router: Router,
    private loadingService: LoadingService
  ) {
    this.collectionCourses = this.getFirebaseCollection(
      FirebaseCollection.courses
    );
    this.storageCourseConfirmation = this.getFirebaseStorage(
      FirebaseStorage.courseConfirmation
    );
  }

  getAllFilterOptions() {
    this.schoolSelectOptions = schoolSelectOptions;
    this.teacherSelectOptions = teacherSelectOptions;
    this.categorySelectOptions = categorySelectOptions;
    this.topicsSelectOptons = topicsSelectOptions;
    this.providerSelectOptions = providerSelectOptions;
  }

  // this credentials are used in all course apps
  getAppCredentials(): IAppCredentials {
    return {
      appUser: environment.course_apps.login,
      appPassword: environment.course_apps.password,
    };
  }

  // Firebase Database
  getFirebaseCollection(collection: FirebaseCollection): string {
    if (collection === FirebaseCollection.courses) {
      return environment.firebaseDb.collectionCourses;
    }
    return null;
  }
  // Firebase Storage for storing images
  getFirebaseStorage(storage: FirebaseStorage): string {
    if (storage === FirebaseStorage.courseConfirmation) {
      return environment.firebaseStorage.pathCourseConfirmation;
    }
    return null;
  }

  // read course data for editing
  getCourse(id: string) {
    this.loadingService.loadingOn();
    this.courseDoc = this.afs.doc(this.collectionCourses + '/' + id);
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
        this.getImageCourseConfirmation(course);
      });
  }

  getImageCourseConfirmation(course: Course) {
    this.loadingService.loadingOn();
    const imgPath =
      this.storageCourseConfirmation + '/' + course.certificateName;
    console.log('imgPath', imgPath);
    this.afStorage
      .ref(imgPath)
      .getDownloadURL()
      .subscribe((url) => {
        this.loadingService.loadingOff();
        this.downloadUrl.next(url);
      });
  }

  uploadCourseImages(files: File[]) {
    if (files.length > 0) {
      const path = this.storageCourseConfirmation + '/' + files[0].name;
      console.log('path', path);
      this.task = this.afStorage.upload(path, files[0]);
      console.log('upload task', this.task);
    }
  }

  // store changed course datas
  // TODO snackbar notification
  updateCourse(course: Course) {
    this.afs
      .doc(this.collectionCourses + '/' + course.id)
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
      .collection(this.collectionCourses)
      .add(course)
      .then((_) => {
        console.log('Course added');
        this.router.navigate(['/courses/edit']);
      })
      .catch((err) => console.log('Error Adding Course', err));
  }

  // store changed course data
  // TODO snackbar notification
  deleteCourse(id: string) {
    this.afs
      .doc(this.collectionCourses + '/' + id)
      .delete()
      .then((res) => {
        console.log('Course deleted', res);
        this.router.navigate(['/courses/edit']);
      })
      .catch((err) => console.log('Error on deleting Course', err));
  }

  getCourses(isEditMode: boolean) {
    this.loadingService.loadingOn();
    if (!isEditMode) {
      // read valueChanges - no metadata
      // convert milliseconds into date as Firebase delivers seconds as Date
      this.firebaseData = this.afs
        .collection(this.collectionCourses)
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
        .collection(this.collectionCourses)
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
      this.loadingService.loadingOff();
    });
  }
}
