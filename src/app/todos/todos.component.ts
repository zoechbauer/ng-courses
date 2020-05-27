import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

import { todoList } from './todos.data';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css'],
})
export class TodosComponent implements OnInit {
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  datasource = new MatTableDataSource(todoList);
  displayedColumns: string[] = ['id', 'status', 'type', 'category', 'todo'];

  constructor() {}

  ngOnInit(): void {
    this.datasource.sort = this.sort;
    this.datasource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    this.datasource.filter = (event.target as HTMLInputElement).value.toLowerCase();
  }
}
