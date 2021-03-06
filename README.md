# NgCourses

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.4.

## Content

With this app you can manage attended courses.

## IMPORTANT Note to Missing Environments Folder

The environment.ts contains secret access data to my firebase account and therefore I stopped tracing this folder.

Please install this folder from another Angular project and change the settings according to your firebase account.

Used structure of environment.ts

<pre>
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
</pre>

If you copy this code segment into your environment.ts file you can compile and run the app, but you can only test the Todo-List because this feature does not need authentication.

To test all features change the firebase credentials and other data of this code segment.

## Compodoc Source Documentation

You can create a very good documentation of this project by calling <strong> npm run compodoc </strong>.
[Compodoc](https://compodoc.app/) creates the documents in the folder [documentation](documentation).
At the moment (June, 2020) there are still [some problems](https://github.com/compodoc/compodoc/issues/927) generating documentation with Angular 9. Components are displayed within Modules/AppModule.

This documentation folder is not uploaded to GitHub because you can create it automatically from the source.
