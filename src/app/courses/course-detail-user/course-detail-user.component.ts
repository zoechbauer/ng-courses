import { Component, OnInit, Input } from '@angular/core';

import { Course } from '../course.model';
import { IAppCredentials, CourseService } from '../course.service';

/**
 * This component is used for displaying course data in user mode.
 */
@Component({
  selector: 'app-course-detail-user',
  templateUrl: './course-detail-user.component.html',
  styleUrls: ['./course-detail-user.component.css'],
})
export class CourseDetailUserComponent implements OnInit {
  @Input() course: Course;
  edit = false;
  appUser: string;
  appPassword: string;
  appCredentials: IAppCredentials;

  constructor(public courseService: CourseService) {}

  ngOnInit(): void {
    this.appCredentials = this.courseService.getAppCredentials();
    this.courseService.getImageCourseConfirmation(this.course).subscribe();
  }

  runUrl(url: string) {
    window.open(url, '_blank');
  }
}
