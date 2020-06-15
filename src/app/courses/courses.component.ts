import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { MatAccordion } from '@angular/material/expansion';

import { Course } from './course.model';
import { CourseService, IAppCredentials } from './course.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'],
})
export class CoursesComponent implements OnInit {
  @ViewChild(MatAccordion) accordion: MatAccordion;
  currentOpenedCourseId: string = null;
  courses$: Observable<Course[]>;
  edit = false;
  appUser: string;
  appPassword: string;
  appCredentials: IAppCredentials;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public courseService: CourseService
  ) {}

  ngOnInit(): void {
    this.setDisplayMode();
    this.appCredentials = this.courseService.getAppCredentials();
    this.courses$ = this.courseService.getCourses(this.edit);
  }

  afterPanelOpened(course: Course) {
    this.courseService.getImageCourseConfirmation(course).subscribe();
  }

  handleOpened(course: Course) {
    this.currentOpenedCourseId = course.id;
  }

  handleClosed(course: Course) {
    this.currentOpenedCourseId = null;
  }

  setDisplayMode() {
    this.edit = this.router.url.includes('/courses/edit') ? true : false;
  }

  runUrl(url: string) {
    window.open(url, '_blank');
  }

  editCourse(id: string) {
    this.router.navigate([id], { relativeTo: this.route });
  }
}
