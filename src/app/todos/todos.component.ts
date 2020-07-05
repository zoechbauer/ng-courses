import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { TodosService } from './todos.service';

/**
 * This Component is used for Filtering the TODO List of this App.
 * The TODO List is hardcoded defined in todos.data.ts.
 */
@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css'],
})
export class TodosComponent implements OnInit {
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  datasource = new MatTableDataSource(this.todoService.Todos);
  displayedColumns: string[] = ['id', 'status', 'type', 'category', 'todo'];
  mobile$: Observable<boolean>;

  constructor(public todoService: TodosService, private media: MediaObserver) {}

  ngOnInit(): void {
    this.datasource.sort = this.sort;
    this.datasource.paginator = this.paginator;

    this.mobile$ = this.media.asObservable().pipe(
      map((mediaChanges: MediaChange[]) => {
        console.log('mediaChange', mediaChanges);
        const result = mediaChanges.filter(
          (mediaChange) => mediaChange.mqAlias === 'lt-md'
        )[0];
        return result && result.matches;
      })
    );
  }

  /**
   * Filter TODOs
   * @param event
   */
  applyFilter(event: Event) {
    this.datasource.filter = (event.target as HTMLInputElement).value
      .trim()
      .toLowerCase();
  }
}
