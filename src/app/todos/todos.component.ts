import { Component, OnInit } from '@angular/core';

import { todoList } from './todos.data';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css'],
})
export class TodosComponent implements OnInit {
  datasource = todoList;
  displayedColumns: string[] = ['id', 'status', 'type', 'category', 'todo'];

  constructor() {}

  ngOnInit(): void {}
}
