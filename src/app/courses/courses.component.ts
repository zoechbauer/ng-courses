import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'],
})
export class CoursesComponent implements OnInit {
  courses: Observable<any[]>;
  edit = false;

  constructor(private afs: AngularFirestore, private router: Router) {
    this.courses = this.afs.collection('courses').valueChanges();
  }

  ngOnInit(): void {
    this.edit = this.router.url.includes('/courses/edit') ? true : false;
  }
}
