import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'],
})
export class CoursesComponent implements OnInit {
  courses: Observable<any[]>;

  constructor(firestore: AngularFirestore) {
    this.courses = firestore.collection('courses').valueChanges();
  }

  ngOnInit(): void {}
}
