import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import {
  AngularFireStorage,
  AngularFireUploadTask,
} from '@angular/fire/storage';
import { Observable, Subject, throwError, from, of } from 'rxjs';
import { map, take, tap, catchError, first } from 'rxjs/operators';
import { Router } from '@angular/router';

import { Course } from './course.model';
import { environment } from 'src/environments/environment';
import { LoadingService } from '../shared/loading/loading.service';
import { NotificationService } from '../shared/notification.service';

/**
 *  Credentials-Interface for hosted apps
 */
export interface IAppCredentials {
  appUser: string;
  appPassword: string;
}

/**
 * Used Fiorebase Collections for Database access
 */
export enum FirebaseCollection {
  courses,
}

/**
 * Used Fiorebase Storage for uploading Images
 */
export enum FirebaseStorage {
  courseConfirmation,
}

/**
 * This Service is used for access to Firebase Firestore Database and File Storage
 */
@Injectable({ providedIn: 'root' })
export class CourseService {
  courseRead = new Subject<Course>();
  downloadUrl = new Subject<string>();
  collectionCourses: string;
  storageCourseConfirmation: string;

  constructor(
    private afs: AngularFirestore,
    private afStorage: AngularFireStorage,
    private router: Router,
    private loadingService: LoadingService,
    private notify: NotificationService
  ) {
    this.collectionCourses = this.getFirebaseCollection(
      FirebaseCollection.courses
    );
    this.storageCourseConfirmation = this.getFirebaseStorage(
      FirebaseStorage.courseConfirmation
    );
  }

  /**
   * Get Credentials for access to hosted apps from Config
   * This credentials are used in all course apps.
   */
  getAppCredentials(): IAppCredentials {
    return {
      appUser: environment.course_apps.login,
      appPassword: environment.course_apps.password,
    };
  }

  /**
   * Get Firebase Database
   * @param collection name of Collection
   */
  getFirebaseCollection(collection: FirebaseCollection): string {
    if (collection === FirebaseCollection.courses) {
      return environment.firebaseDb.collectionCourses;
    }
    return null;
  }

  /**
   * Get Firebase Storage for storing images
   * @param storage naME OF STORAGE
   */
  getFirebaseStorage(storage: FirebaseStorage): string {
    if (storage === FirebaseStorage.courseConfirmation) {
      return environment.firebaseStorage.pathCourseConfirmation;
    }
    return null;
  }

  /**
   * Read Course data & image of confirmation for editing Course
   * @param id Course id
   */
  getCourse(id: string): Observable<Course> {
    this.loadingService.loadingOn();
    const courseDoc: AngularFirestoreDocument<any> = this.afs.doc(
      this.collectionCourses + '/' + id
    );
    const afCourse: Observable<any> = courseDoc.valueChanges();
    return afCourse.pipe(
      map((doc) => {
        return {
          ...doc,
          confirmationDate: doc['confirmationDate'].toDate(),
        };
      }),
      take(1),
      tap((course) => {
        this.getImageCourseConfirmation(course).subscribe();
      }),
      catchError((err) => {
        console.log('loadingOff');
        this.loadingService.loadingOff();
        this.notify.showErrorMessage(
          err,
          'Der Kurs konnte nicht aus Firebase geladen werden'
        );
        return throwError(err);
      })
    );
  }

  /**
   * Get Image of Course confirmation
   * @param course
   */
  getImageCourseConfirmation(course: Course): Observable<void> {
    this.loadingService.loadingOn();
    const imgPath =
      this.storageCourseConfirmation + '/' + course.certificateName;
    console.log('imgPath', imgPath);
    return this.afStorage
      .ref(imgPath)
      .getDownloadURL()
      .pipe(
        tap((url) => {
          this.downloadUrl.next(url);
          this.loadingService.loadingOff();
        }),
        catchError((err) => {
          console.log('loadingOff');
          this.loadingService.loadingOff();
          this.notify.showErrorMessage(
            err,
            'Kursbestätigung  konnte nicht aus Firebase geladen werden'
          );
          return throwError(err);
        })
      );
  }

  /**
   * Upload Course confirmation image to Firebase store
   * @param files
   */
  uploadCourseImages(files: File[]): Observable<any> {
    if (files.length > 0) {
      console.log('loadingOn');
      this.loadingService.loadingOn();
      const file = files[0];
      const path = this.storageCourseConfirmation + '/' + file.name;
      console.log('path', path, file);
      const task: AngularFireUploadTask = this.afStorage.upload(path, file);
      return task.snapshotChanges().pipe(
        catchError((err) => {
          console.log('loadingOff');
          this.loadingService.loadingOff();
          this.notify.showErrorMessage(
            err,
            'Die Kursbestätigung konnte nicht in FireStore gespeichert werden'
          );
          return throwError(err);
        })
      );
    } else {
      return of(null);
    }
  }

  /**
   * Store changed Course data in Firebase DB
   * @param course
   */
  updateCourse(course: Course): Observable<any> {
    const updateCourse$ = from(
      this.afs.doc(this.collectionCourses + '/' + course.id).update(course)
    );

    return updateCourse$.pipe(
      tap((res) => {
        console.log('Course updated', res);
        this.router.navigate(['/courses/edit']);
      }),
      catchError((err) => {
        this.notify.showErrorMessage(
          err,
          'Kurs konnte nicht in Firebase gespeichert werden'
        );
        return throwError(err);
      })
    );
  }

  /**
   * Store new Course data in Firebase DB and navigate on success to Courses List
   * @param course
   */
  addCourse(course: Course): Observable<any> {
    course.id = null;
    const addCourse$ = from(
      this.afs.collection(this.collectionCourses).add(course)
    );

    return addCourse$.pipe(
      tap(() => {
        console.log('Course added');
        this.router.navigate(['/courses/edit']);
      }),
      catchError((err) => {
        this.notify.showErrorMessage(
          err,
          'Kurs konnte nicht in Firebase gespeichert werden'
        );
        return throwError(err);
      })
    );
  }

  /**
   * Delete Course data in Firebase DB and navigate on success to Courses List
   * @param course
   */
  deleteCourse(id: string): Observable<any> {
    const deleteCourse$ = from(
      this.afs.doc(this.collectionCourses + '/' + id).delete()
    );

    return deleteCourse$.pipe(
      tap((res) => {
        console.log('Course deleted', res);
        this.router.navigate(['/courses/edit']);
      }),
      catchError((err) => {
        this.notify.showErrorMessage(
          err,
          'Kurs konnte nicht in Firebase gelöscht werden'
        );
        return throwError(err);
      })
    );
  }

  /**
   * Get Course data from Firebase as ValueChanges or snapshotChanges depending on Input Param.
   * @param isEditMode true only in Admin mode
   */
  getCourses(isEditMode: boolean): Observable<Course[]> {
    this.loadingService.loadingOn();
    if (!isEditMode) {
      // read valueChanges - no metadata
      // convert milliseconds into date as Firebase delivers seconds as Date
      return this.afs
        .collection(this.collectionCourses)
        .valueChanges()
        .pipe(
          map((docArray) => {
            console.log('map docArray', docArray);
            return docArray.map((doc: {}) => {
              return {
                ...doc,
                confirmationDate: doc['confirmationDate'].toDate(),
              } as Course;
            });
          }),
          first(),
          catchError((err) => {
            console.log('loadingOff');
            this.loadingService.loadingOff();
            this.notify.showErrorMessage(
              err,
              'Kurse konnten nicht aus Firebase geladen werden'
            );
            return throwError(err);
          }),
          tap(() => this.loadingService.loadingOff())
        );
    } else {
      // read snapshotChanges - id for update
      // convert seconds into date and add id to course
      return this.afs
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
              } as Course;
            });
          }),
          first(),
          catchError((err) => {
            console.log('loadingOff');
            this.loadingService.loadingOff();
            this.notify.showErrorMessage(
              err,
              'Kurse konnten nicht aus Firebase geladen werden'
            );
            return throwError(err);
          }),
          tap(() => this.loadingService.loadingOff())
        );
    }
  }
}
