import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'],
})
export class CoursesComponent implements OnInit {
  courses: Observable<any[]>;
  edit = false;
  appUser: string;
  appPassword: string;

  constructor(private afs: AngularFirestore, private router: Router) {}

  ngOnInit(): void {
    this.setDisplayMode();
    this.getAppCredentials();
    this.getCourses();
  }

  setDisplayMode() {
    this.edit = this.router.url.includes('/courses/edit') ? true : false;
  }

  getCourses() {
    if (!this.edit) {
      // read valueChanges - no metadata
      this.courses = this.afs.collection('courses').valueChanges();
    } else {
      // read snapshotChanges - id for update
      this.courses = this.afs
        .collection('courses')
        .snapshotChanges()
        .pipe(
          map((docArray) => {
            return docArray.map((doc) => {
              return {
                id: doc.payload.doc.id,
                ...(doc.payload.doc.data() as {}),
              };
            });
          })
        );
    }
  }

  getAppCredentials() {
    this.appUser = environment.course_apps.login;
    this.appPassword = environment.course_apps.password;
  }
}
