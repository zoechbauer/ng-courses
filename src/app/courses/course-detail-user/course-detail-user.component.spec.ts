import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseDetailUserComponent } from './course-detail-user.component';

describe('CourseDetailUserComponent', () => {
  let component: CourseDetailUserComponent;
  let fixture: ComponentFixture<CourseDetailUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseDetailUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseDetailUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
