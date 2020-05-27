import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

import { todoList } from './todos.data';
import { MatPaginator } from '@angular/material/paginator';
import { TodosService } from './todos.service';

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
  status: number;

  constructor(private todoService: TodosService) {}

  ngOnInit(): void {
    this.datasource.sort = this.sort;
    this.datasource.paginator = this.paginator;
    this.status = this.todoService.getStatus();
  }

  applyFilter(event: Event) {
    this.datasource.filter = (event.target as HTMLInputElement).value
      .trim()
      .toLowerCase();
  }
}
