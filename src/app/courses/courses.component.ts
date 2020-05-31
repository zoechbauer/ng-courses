import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { MatAccordion } from '@angular/material/expansion';

import { environment } from 'src/environments/environment';
import { Course } from './course.model';
import { CourseService, AppCredentials } from './course.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'],
})
export class CoursesComponent implements OnInit, OnDestroy {
  @ViewChild(MatAccordion) accordion: MatAccordion;
  expanded: boolean;
  courseSub: Subscription;
  courses: Course[];
  edit = false;
  appUser: string;
  appPassword: string;
  appCredentials: AppCredentials;

  // TODO store certificate on firestore
  // at the moment certificate images are stored in assets/images folder with name defined in firestore

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private courseService: CourseService
  ) {}

  ngOnInit(): void {
    this.setDisplayMode();
    this.appCredentials = this.courseService.getAppCredentials();
    this.courseService.getCourses(this.edit);
    this.courseSub = this.courseService.coursesChanged.subscribe(
      (courses: Course[]) => (this.courses = courses)
    );
  }

  setDisplayMode() {
    this.edit = this.router.url.includes('/courses/edit') ? true : false;
  }

  // getAppCredentials() {
  //   this.appUser = environment.course_apps.login;
  //   this.appPassword = environment.course_apps.password;
  // }

  runUrl(url: string) {
    window.open(url, '_blank');
  }

  editCourse(id: string) {
    this.router.navigate([id], { relativeTo: this.route });
  }

  ngOnDestroy() {
    this.courseSub.unsubscribe();
  }
}
