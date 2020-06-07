import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { MatAccordion } from '@angular/material/expansion';

import { environment } from 'src/environments/environment';
import { Course } from './course.model';
import { CourseService, IAppCredentials } from './course.service';

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
  appCredentials: IAppCredentials;
  downloadUrl: string;
  downloadUrlSub: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private courseService: CourseService
  ) {}

  ngOnInit(): void {
    this.downloadUrlSub = this.courseService.downloadUrl.subscribe((url) => {
      this.downloadUrl = url;
    });
    this.setDisplayMode();
    this.appCredentials = this.courseService.getAppCredentials();
    this.courseService.getCourses(this.edit);
    this.courseSub = this.courseService.coursesChanged.subscribe(
      (courses: Course[]) => (this.courses = courses)
    );
  }

  afterPanelOpened(course: Course) {
    this.expanded = true;
    this.courseService.getImageCourseConfirmation(course);
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

  ngOnDestroy() {
    if (this.courseSub) {
      this.courseSub.unsubscribe();
    }

    if (this.downloadUrlSub) {
      this.downloadUrlSub.unsubscribe();
    }
  }
}
