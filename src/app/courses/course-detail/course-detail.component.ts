import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css'],
})
export class CourseDetailComponent implements OnInit {
  courseId: string;

  courseForm: FormGroup;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.courseId = params.id;
    });

    this.courseForm = new FormGroup({
      id: new FormControl(this.courseId),
      title: new FormControl('', [Validators.required]),
      school: new FormControl('Udemy', [Validators.required]),
      duration: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\d{1,2}(\.\d)?$/), // 0-99.9
      ]),
      teacher: new FormControl('', [Validators.required]),
      confirmationDate: new FormControl('', [Validators.required]),
      certificateName: new FormControl('', [Validators.required]),
      summary: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required]),
      topics: new FormControl('', [Validators.required]),
      githubUrl: new FormControl('', [Validators.required]),
      hostedUrl: new FormControl('', [Validators.required]),
      hostingProvider: new FormControl('', [Validators.required]),
      hasCredentials: new FormControl('', [Validators.required]),
    });
  }

  runUrl(url: string) {
    console.log(url);
    window.open(url, '_blank');
  }

  onCancel() {
    console.log('cancel');
  }

  onSubmit() {
    console.log(this.courseForm.value);
    console.log(this.courseForm);
  }
}
