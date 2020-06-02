import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { CourseService } from '../course.service';
import { Course } from '../course.model';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css'],
})
export class CourseDetailComponent implements OnInit, OnDestroy {
  courseId: string;
  course: Course;
  courseSub: Subscription;
  courseForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private courseService: CourseService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.courseId = params.id;
    });
    this.courseService.getCourse(this.courseId);
    this.courseSub = this.courseService.courseRead.subscribe((course) => {
      this.course = course;

      this.courseForm = new FormGroup({
        id: new FormControl(this.course.id),
        title: new FormControl(this.course.title, [Validators.required]),
        school: new FormControl(this.course.school, [Validators.required]),
        duration: new FormControl(this.course.duration, [
          Validators.required,
          Validators.pattern(/^\d{1,2}(\.\d)?$/), // 0-99.9
        ]),
        teacher: new FormControl(this.course.teacher, [Validators.required]),
        confirmationDate: new FormControl(this.course.confirmationDate, [
          Validators.required,
        ]),
        certificateName: new FormControl(this.course.certificateName, [
          Validators.required,
        ]),
        summary: new FormControl(this.course.summary, [Validators.required]),
        description: new FormControl(this.course.description, [
          Validators.required,
        ]),
        category: new FormControl(this.course.category, [Validators.required]),
        topics: new FormControl(this.course.topics, [Validators.required]),
        githubUrl: new FormControl(this.course.githubUrl, [
          Validators.required,
        ]),
        hostedUrl: new FormControl(this.course.hostedUrl, [
          Validators.required,
        ]),
        hostingProvider: new FormControl(this.course.hostingProvider, [
          Validators.required,
        ]),
        hasCredentials: new FormControl(this.course.hasCredentials, [
          Validators.required,
        ]),
      });
    });
  }

  runUrl(url: string) {
    window.open(url, '_blank');
  }

  onCancel() {
    this.router.navigate(['/courses/edit']);
  }

  onSubmit() {
    this.course = { ...this.courseForm.value, id: this.courseId };
    this.courseService.updateCourse(this.course);
  }

  ngOnDestroy() {
    this.courseSub.unsubscribe();
  }
}
