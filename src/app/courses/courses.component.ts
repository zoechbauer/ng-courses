import {
  Component,
  OnInit,
  ViewChild,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { MatAccordion } from '@angular/material/expansion';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'],
})
export class CoursesComponent implements OnInit {
  @ViewChild(MatAccordion) accordion: MatAccordion;
  expanded: boolean;
  courses: Observable<any[]>;
  edit = false;
  appUser: string;
  appPassword: string;
  // TODO store certificate on firestore
  // at the moment certificate images are stored in assets/images folder with name defined in firestore

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

  runUrl(url: string) {
    window.open(url, '_blank');
  }
}
