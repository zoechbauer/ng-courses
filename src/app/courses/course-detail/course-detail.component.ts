import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import * as moment from 'moment';

import { CourseService } from '../course.service';
import { Course } from '../course.model';
import { CourseDeleteDialogComponent } from '../course-delete-dialog.component';
import { LoadingService } from 'src/app/shared/loading/loading.service';
import * as filter from '../course-filter.model';
import { NgxDropzoneChangeEvent } from 'ngx-dropzone';

/**
 * This component is used for creating and editing courses.
 */
@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css'],
})
export class CourseDetailComponent implements OnInit, OnDestroy {
  courseId: string;
  course: Course;
  courseForm: FormGroup;
  isNewCourse = false;
  actionHeader: string;
  files: File[] = [];
  downloadUrl: string;
  schoolSelectOptions = filter.schoolSelectOptions;
  teacherSelectOptions = filter.teacherSelectOptions;
  categorySelectOptions = filter.categorySelectOptions;
  topicsSelectOptons = filter.topicsSelectOptions;
  providerSelectOptions = filter.providerSelectOptions;
  toggleImageUpload = false;
  private subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public courseService: CourseService,
    private dialog: MatDialog,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.courseService.downloadUrl.subscribe((url) => {
        this.downloadUrl = url;
      })
    );
    this.route.params.subscribe((params) => {
      if (params.id === undefined) {
        this.isNewCourse = true;
        this.course = new Course();
        this.actionHeader = 'Neuen Kurs erfassen';
        this.initForm();
      } else {
        this.courseId = params.id;
        this.subscription.add(
          this.courseService.getCourse(this.courseId).subscribe((course) => {
            this.course = course;
            this.actionHeader = this.course.isProtected
              ? 'Geschützter Kurs'
              : 'Kurs ändern';
            this.initForm();
          })
        );
      }
    });
  }

  /**
   * Init form with course data
   */
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
      confirmationDate: new FormControl(moment(this.course.confirmationDate), [
        Validators.required,
      ]),
      certificateName: new FormControl(
        { value: this.course.certificateName, disabled: true },
        [Validators.required]
      ),
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

  /**
   * Open Url of source project in github or url of hosted App
   * @param url Url of source or hosted App
   */
  runUrl(url: string) {
    window.open(url, '_blank');
  }

  onCancel() {
    this.router.navigate(['/courses/edit']);
  }

  /**
   * Create or edit course
   */
  onSubmit() {
    console.log('form', this.courseForm.value);
    this.course = {
      ...this.courseForm.value,
      id: this.courseId,
      // field is disabled and therefore not in courseForm
      certificateName: this.courseForm.get('certificateName').value,
      // courseForm contains moment date => convert to date
      confirmationDate: this.courseForm.get('confirmationDate').value.toDate(),
    };
    console.log('course', this.course);
    if (this.isNewCourse) {
      this.subscription.add(
        this.courseService.addCourse(this.course).subscribe()
      );
    } else {
      this.subscription.add(
        this.courseService.updateCourse(this.course).subscribe()
      );
    }
    this.subscription.add(
      this.courseService.uploadCourseImages(this.files).subscribe()
    );
  }

  /**
   * Delete course
   */
  onDelete() {
    const dialogRef = this.dialog.open(CourseDeleteDialogComponent);
    this.subscription.add(
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.subscription.add(
            this.courseService.deleteCourse(this.courseId).subscribe()
          );
        }
      })
    );
  }

  /**
   * Select upload image
   * @param event NgxDropzoneChangeEvent
   */
  onSelect(event: NgxDropzoneChangeEvent) {
    // store only 1 image, so clear array
    this.files = [];
    console.log(event);
    this.files.push(...event.addedFiles);
    // show selected filename in disabled field
    const selectedFileName = event.addedFiles[0].name;
    this.courseForm.get('certificateName').setValue(selectedFileName);
    // show selected file in ngx-dropzone
    const formData = new FormData();
    for (const file of this.files) {
      formData.append('file[]', file);
    }
  }

  /**
   * Remove image from array for uploading to Firebase
   * @param file image
   */
  onRemove(file: File) {
    console.log(file);
    this.files.splice(this.files.indexOf(file), 1);
    this.courseForm.get('certificateName').setValue('');
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
