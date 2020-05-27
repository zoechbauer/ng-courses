import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

import { todoList } from './todos.data';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css'],
})
export class TodosComponent implements OnInit {
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  datasource = new MatTableDataSource(todoList);
  displayedColumns: string[] = ['id', 'status', 'type', 'category', 'todo'];

  constructor() {}

  ngOnInit(): void {
    this.datasource.sort = this.sort;
  }
}
