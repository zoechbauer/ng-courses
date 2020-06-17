import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';

import * as filter from '../course-filter.model';
import { CourseService } from '../course.service';
import { Course } from '../course.model';

@Component({
  selector: 'app-search-courses',
  templateUrl: './search-courses.component.html',
  styleUrls: ['./search-courses.component.css'],
})
export class SearchCoursesComponent implements OnInit, OnDestroy {
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  courses: Course[];
  datasource = new MatTableDataSource(this.courses);
  displayedColumns: string[] = [
    'title',
    'school',
    'teacher',
    'category',
    'confirmationDate',
    'duration',
  ];
  categorySelectOptions = filter.categorySelectOptions;
  topicsSelectOptions = filter.topicsSelectOptions;
  searchForm: FormGroup;
  coursesSub: Subscription;
  activeCourse: Course;

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.searchForm = new FormGroup({
      searchCategory: new FormControl(),
      searchSkills: new FormControl(),
      searchText: new FormControl(),
    });

    this.onSearch();
  }

  onClearFields() {
    this.searchForm.reset();
  }

  getCourse(course: Course) {
    console.log('table row', course, course.title);
    this.activeCourse = course;
  }

  onBackToSearch() {
    this.activeCourse = null;
  }

  onSearch() {
    console.log('search', this.searchForm.value);
    this.coursesSub = this.courseService
      .getCourses(false)
      .subscribe((courses) => {
        this.courses = [...courses];
        if (
          this.searchForm.value.searchText ||
          this.searchForm.value.searchCategory ||
          this.searchForm.value.searchSkills
        ) {
          this.filterCourses();
        }
        this.datasource.data = this.courses;
        this.datasource.sort = this.sort;
        this.datasource.paginator = this.paginator;
      });
  }

  filterCourses() {
    const filteredCoursesText: Course[] = this.filterCoursesByText();
    const filteredCoursesCategory: Course[] = this.filterCoursesByCategory();
    const filteredCoursesSkills: Course[] = this.filterCoursesByTopics();
    // merge results
    this.courses = [
      ...filteredCoursesText,
      ...filteredCoursesCategory,
      ...filteredCoursesSkills,
    ];
    this.courses = [...new Set(this.courses)];
  }

  filterCoursesByText(): Course[] {
    const filterString = this.searchForm.value.searchText;
    let filteredCourses: Course[] = [];
    if (filterString) {
      filteredCourses = this.courses.filter((course: Course) => {
        const re = new RegExp(filterString.toLowerCase());
        if (course.title.toLowerCase().match(re)) {
          return true;
        }
        if (course.description.toLowerCase().match(re)) {
          return true;
        }
        if (course.summary.toLowerCase().match(re)) {
          return true;
        }
        if (course.school.toLowerCase().match(re)) {
          return true;
        }
        if (course.teacher.toLowerCase().match(re)) {
          return true;
        }
        return false;
      });
    }
    return filteredCourses;
  }

  filterCoursesByCategory(): Course[] {
    const filterString = this.searchForm.value.searchCategory;
    let filteredCourses: Course[] = [];
    if (filterString) {
      filteredCourses = this.courses.filter((course: Course) => {
        let match = false;
        filterString.forEach((filterEl: string) => {
          if (filterEl === course.category) {
            match = true;
          }
        });
        return match;
      });
    }
    return filteredCourses;
  }

  filterCoursesByTopics(): Course[] {
    const filterString = this.searchForm.value.searchSkills;
    let filteredCourses: Course[] = [];
    if (filterString) {
      filteredCourses = this.courses.filter((course: Course) => {
        let match = false;
        const skills = course.topics.toString();
        filterString.forEach((filterEl: string) => {
          const reSkill = new RegExp(filterEl.toLowerCase());
          if (skills.toLowerCase().match(reSkill)) {
            match = true;
          }
        });
        return match;
      });
    }
    return filteredCourses;
  }

  ngOnDestroy() {
    if (this.coursesSub) {
      this.coursesSub.unsubscribe();
    }
  }
}
