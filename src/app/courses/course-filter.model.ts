// interface for select controls
export interface ISelectOptions {
  name: string;
  value: string;
}

// temporary hardcoded Select Options - will be replaced by Firebase entities in future
export const schoolSelectOptions: ISelectOptions[] = [
  { name: 'Udemy', value: 'udemy' },
  { name: 'YouTube', value: 'youtube' },
].sort((a, b) => (a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1));

export const teacherSelectOptions: ISelectOptions[] = [
  { name: 'Maximilian Schwarzmüller', value: 'Maximilian.Schwarzmueller' },
  { name: 'Brad Schiff', value: 'Brad.Schiff' },
  { name: 'Neil Cummings', value: 'Neil.Cummings' },
  { name: 'Eduonix-Tech', value: 'Eduonix-Tech' },
].sort((a, b) => (a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1));

export const categorySelectOptions: ISelectOptions[] = [
  { name: 'Webdesign', value: 'webdesign' },
  { name: 'Frontend', value: 'frontend' },
  { name: 'Backend', value: 'backend' },
  { name: 'Fullstack', value: 'fullstack' },
].sort((a, b) => (a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1));

export const topicsSelectOptions: ISelectOptions[] = [
  { name: 'HTML', value: 'html' },
  { name: 'CSS', value: 'css' },
  { name: 'Javascript', value: 'javascript' },
  { name: 'Angular 9', value: 'angular9' },
  { name: 'Angular 8', value: 'angular8' },
  { name: 'Angular Material', value: 'angular-material' },
  { name: 'AngularFire', value: 'angularfire' },
  { name: 'Firebase Firestore', value: 'firebase-firestore' },
  { name: 'Firebase', value: 'firebase' },
  { name: 'Firebase Hosting', value: 'firebase-hosting' },
  { name: 'NgRx Store', value: 'ngrx-store' },
  { name: 'NgRx', value: 'ngrx' },
  { name: 'Service Worker', value: 'service-worker' },
  { name: 'Angular Animations', value: 'angular-animations' },
  { name: 'Bootstrap 3', value: 'bootstrap3' },
  { name: 'GitHub API', value: 'github-api' },
  { name: 'MongoDB', value: 'mongodb' },
  { name: 'Express', value: 'express' },
  { name: 'Axios', value: 'axios' },
  { name: 'Webpack', value: 'webpack' },
  { name: 'Nodemon', value: 'nodemon' },
  { name: 'Sanitize', value: 'sanitize' },
  { name: 'rxJS', value: 'rxjs' },
  { name: 'PostCSS', value: 'postcss' },
  { name: 'BEM', value: 'bem' },
  { name: 'Automation', value: 'automation' },
  { name: 'C#', value: 'csharp' },
  { name: '.NET Core', value: 'dotnetcore' },
].sort((a, b) => (a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1));
