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

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public courseService: CourseService
  ) {}

  ngOnInit(): void {
    this.setDisplayMode();
    this.courses$ = this.courseService.getCourses(this.edit);
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

  editCourse(id: string) {
    this.router.navigate([id], { relativeTo: this.route });
  }
}
