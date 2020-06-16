import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

import * as filter from '../course-filter.model';

@Component({
  selector: 'app-search-courses',
  templateUrl: './search-courses.component.html',
  styleUrls: ['./search-courses.component.css'],
})
export class SearchCoursesComponent implements OnInit {
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  datasource;
  displayedColumns: string[] = ['title', 'confirmationDate', 'duration'];
  categorySelectOptions = filter.categorySelectOptions;
  topicsSelectOptions = filter.topicsSelectOptions;
  searchForm: FormGroup;

  constructor() {}

  ngOnInit(): void {
    this.searchForm = new FormGroup({
      searchCategory: new FormControl(),
      searchSkills: new FormControl(),
      searchText: new FormControl(),
    });
  }

  onSearch() {
    console.log('search', this.searchForm.value);
  }
}
