// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { TestBed } from '@angular/core/testing';

export const environment = {
  production: false,
  firebase: {
    apiKey: 'your values',
    authDomain: 'your values',
    databaseURL: 'your values',
    projectId: 'your values',
    storageBucket: 'your values',
    messagingSenderId: 'your values',
    appId: 'your values',
    measurementId: 'your values',
  },
  firebaseDb: {
    collectionCourses: 'collection name for courses',
  },
  firebaseStorage: {
    pathCourseConfirmation: 'image path for course confirmation',
  },
  logo: {
    text: "Hans Zöchbauer's Kurse",
    // angular-material-icon
    maticon: 'supervisor_account',
  },
  snackbar: {
    // displayed in milliseconds
    duration: 3000,
  },
  admin: {
    // only admin is allowed to manage courses
    login: 'admin email',
    // for automatic login in development phase
    // set password to '' in production mode
    password: 'admin password',
  },
  // for starting the referenced apps on hosting server
  course_apps: {
    login: 'credentials for starting the apps',
    password: 'credentials for starting the apps',
  },
};

/* test
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
