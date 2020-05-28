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
};
</pre>
