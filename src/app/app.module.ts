import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAnalyticsModule } from '@angular/fire/analytics';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
// import {
//   MAT_MOMENT_DATE_FORMATS,
//   MomentDateAdapter,
//   MAT_MOMENT_DATE_ADAPTER_OPTIONS,
// } from '@angular/material-moment-adapter';
import {
  // DateAdapter,
  // MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import { registerLocaleData } from '@angular/common';
import localeAT from '@angular/common/locales/de-AT';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { WelcomeComponent } from './welcome/welcome.component';
import { CoursesComponent } from './courses/courses.component';
import { CourseDetailComponent } from './courses/course-detail/course-detail.component';
import { LoginComponent } from './auth/login/login.component';
import { environment } from 'src/environments/environment';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { TodosComponent } from './todos/todos.component';
import { CourseDeleteDialogComponent } from './courses/course-delete-dialog.component';
import { LoadingComponent } from './shared/loading/loading.component';
import { SearchCoursesComponent } from './courses/search-courses/search-courses.component';
import { CourseDetailUserComponent } from './courses/course-detail-user/course-detail-user.component';
import { ReposComponent } from './github/repos/repos.component';
import { OrganizationsComponent } from './github/organizations/organizations.component';
import { ListOrgsComponent } from './github/organizations/list-orgs/list-orgs.component';
import { ListReposComponent } from './github/organizations/list-repos/list-repos.component';
import { SortPipe } from './shared/pipes/sort.pipe';
import { FilterPipe } from './shared/pipes/filter.pipe';

registerLocaleData(localeAT, 'de-AT');

/**
 * This is the Main Module of this App.
 */
@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    CoursesComponent,
    CourseDetailComponent,
    LoginComponent,
    HeaderComponent,
    SidenavListComponent,
    TodosComponent,
    CourseDeleteDialogComponent,
    LoadingComponent,
    SearchCoursesComponent,
    CourseDetailUserComponent,
    ReposComponent,
    OrganizationsComponent,
    ListOrgsComponent,
    ListReposComponent,
    SortPipe,
    FilterPipe,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAnalyticsModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    NgxDropzoneModule,
    HttpClientModule,
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'de-AT' },
    { provide: LOCALE_ID, useValue: 'de-AT' },
    // {
    //   provide: DateAdapter,
    //   useClass: MomentDateAdapter,
    //   deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    // },
    // { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
