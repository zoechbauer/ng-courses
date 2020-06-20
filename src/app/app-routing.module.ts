import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WelcomeComponent } from './welcome/welcome.component';
import { CoursesComponent } from './courses/courses.component';
import { CourseDetailComponent } from './courses/course-detail/course-detail.component';
import { LoginComponent } from './auth/login/login.component';
import { TodosComponent } from './todos/todos.component';
import { AuthGuard } from './auth/auth.guard';
import { SearchCoursesComponent } from './courses/search-courses/search-courses.component';

/**
 * This Module is used for Routing.
 */
const routes: Routes = [
  { path: '', redirectTo: '/welcome', pathMatch: 'full' },
  { path: 'welcome', component: WelcomeComponent },
  { path: 'courses', component: CoursesComponent, canActivate: [AuthGuard] },
  {
    path: 'courses/search',
    component: SearchCoursesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'courses/edit',
    component: CoursesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'courses/new',
    component: CourseDetailComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'courses/edit/:id',
    component: CourseDetailComponent,
    canActivate: [AuthGuard],
  },
  { path: 'login', component: LoginComponent },
  { path: 'todos', component: TodosComponent },
  { path: '**', redirectTo: '/welcome' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
