import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Subject, Observable } from 'rxjs';
import {
  distinctUntilChanged,
  debounceTime,
  filter,
  switchMap,
  tap,
} from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';

import { GithubService } from '../../github.service';
import { GitHubOrg } from '../../githubOrganization.model';

@Component({
  selector: 'app-list-orgs',
  templateUrl: './list-orgs.component.html',
  styleUrls: ['./list-orgs.component.css'],
})
export class ListOrgsComponent implements OnInit {
  dataSource: MatTableDataSource<GitHubOrg>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  formOrg: FormGroup;
  searchOrg$ = new Subject<string>();
  searchOrgResults$: Observable<GitHubOrg[]>;
  displayedColumns: string[] = ['avatar', 'login', 'url'];
  error = '';

  constructor(private githubService: GithubService, private router: Router) {}

  ngOnInit(): void {
    this.formOrg = new FormGroup({
      organization: new FormControl(),
    });

    /**
     * http request of search-string after 750ms and changed value
     */
    this.searchOrgResults$ = this.searchOrg$.pipe(
      // tap((val) => console.log('searchOrg$', val)),
      debounceTime(750),
      distinctUntilChanged(),
      filter((searchText) => !!searchText),
      switchMap((searchText) =>
        this.githubService.getGithubOrganizations(searchText)
      )
    );

    /**
     * assign search result to mat-table
     */
    this.searchOrgResults$.subscribe(
      (orgs: GitHubOrg[]) => {
        this.dataSource = new MatTableDataSource(orgs);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.error = '';
      },
      (err) => {
        console.log('ListOrgs Error', err);
        this.error = err;
      }
    );
  }

  /**
   * new search request
   */
  searchOrgs(searchText: string) {
    this.searchOrg$.next(searchText);
  }

  onSelect(selectedOrg: string) {
    this.githubService.selectedOrg.next(selectedOrg);
    this.router.navigate(['/orgs/repos/api']);
  }

  clearSearchValue() {
    this.formOrg.reset();
    this.searchOrg$.next('');
  }
}
