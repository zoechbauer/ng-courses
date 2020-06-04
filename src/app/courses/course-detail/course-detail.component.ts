import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

import { CourseService } from '../course.service';
import { Course } from '../course.model';
import { CourseDeleteDialogComponent } from '../course-delete-dialog.component';

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
  isNewCourse = false;
  actionHeader: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public courseService: CourseService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.courseService.getAllFilterOptions();
    this.route.params.subscribe((params) => {
      if (params.id === undefined) {
        this.isNewCourse = true;
        this.course = new Course();
        this.actionHeader = 'Neuen Kurs erfassen';
        this.initForm();
      } else {
        this.courseId = params.id;
        this.actionHeader = 'Kurs ändern';
        this.courseService.getCourse(this.courseId);
        this.courseSub = this.courseService.courseRead.subscribe((course) => {
          this.course = course;
          this.initForm();
        });
      }
    });
  }

  initForm() {
    this.courseForm = new FormGroup({
      id: new FormControl(this.courseId),
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
      githubUrl: new FormControl(this.course.githubUrl, [Validators.required]),
      hostedUrl: new FormControl(this.course.hostedUrl, [Validators.required]),
      hostingProvider: new FormControl(this.course.hostingProvider, [
        Validators.required,
      ]),
      hasCredentials: new FormControl(this.course.hasCredentials),
    });
  }

  runUrl(url: string) {
    window.open(url, '_blank');
  }

  onCancel() {
    this.router.navigate(['/courses/edit']);
  }

  onSubmit() {
    console.log('form', this.courseForm.value);
    this.course = {
      ...this.courseForm.value,
      id: this.courseId,
      confirmationDate: this.courseForm.value.confirmationDate.toDate(),
    };
    if (this.isNewCourse) {
      this.courseService.addCourse(this.course);
    } else {
      this.courseService.updateCourse(this.course);
    }
  }

  onDelete() {
    const dialogRef = this.dialog.open(CourseDeleteDialogComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.courseService.deleteCourse(this.courseId);
      }
    });
  }

  ngOnDestroy() {
    if (this.courseSub) {
      this.courseSub.unsubscribe();
    }
  }
}
