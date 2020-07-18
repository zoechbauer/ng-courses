import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';

import { GithubService } from '../../github.service';
import { GitHubOrgRepo } from '../../githubOrganization.model';
import { SelectOption } from '../../selectOption.model';
import { reposFakeData } from '../../GithubRepos.fakedata';

@Component({
  selector: 'app-list-repos',
  templateUrl: './list-repos.component.html',
  styleUrls: ['./list-repos.component.css'],
})
export class ListReposComponent implements OnInit, OnDestroy {
  isFakeReposList = false; // true: use fakedReposList for layout-design; ONLY FOR LAYOUT-CHANGES;
  filterForm: FormGroup;
  organization: string;
  githubOrgRepos: GitHubOrgRepo[] = [];
  reposSub: Subscription;
  orgSub: Subscription;
  pageSub: Subscription;
  topicsSub: Subscription;
  reposCounter: number;
  sortOrder: string;
  searchString: string;
  searchProperty: string;
  numberFilterType: string = '';

  filterProps: SelectOption[] = [
    { name: 'Repo-Name', value: 'name' },
    { name: 'Beschreibung', value: 'description' },
    { name: 'Programmier-Sprache', value: 'language' },
    { name: 'Offene Issues', value: 'open_issues' },
    { name: 'Watchers', value: 'watchers' },
    { name: 'Forks', value: 'forks' },
    { name: 'Größe', value: 'size' },
  ];

  numberCompareProps: SelectOption[] = [
    { name: '\u003E', value: 'gt' },
    { name: '\u003C', value: 'lt' },
    { name: '\u003D', value: 'eq' },
    { name: '\u2265', value: 'ge' },
    { name: '\u2264', value: 'le' },
  ];

  constructor(public githubService: GithubService) {}

  ngOnInit(): void {
    this.filterForm = new FormGroup({
      numberCompare: new FormControl('gt'),
      filterString: new FormControl(''),
      filterProperty: new FormControl('name'),
      sortOrder: new FormControl('asc'),
    });

    // org changed
    this.orgSub = this.githubService.selectedOrg.subscribe((selectedOrg) => {
      console.log('selectedOrg', selectedOrg);

      this.organization = selectedOrg;
      if (selectedOrg) {
        this.getOrgRepos(selectedOrg, 1);
      }
    });
    // pagenumber changed
    this.pageSub = this.githubService.pageNumberSubject.subscribe((page) => {
      console.log('page', page);
      this.getOrgRepos(this.organization, page);
    });

    // search fields changed
    this.filterForm.valueChanges.subscribe(() => {
      this.filterRepos();
    });

    // load faked data is defined in isFakeReposList
    if (this.isFakeReposList) {
      this.organization = 'angular - Faked Data!!!';
      this.githubOrgRepos = reposFakeData;
    }
  }

  /**
   * filter the data in githubOrgRepos array with form filter data.
   * Filtering and sorting is implemented with pipes in template.
   * The properties for the FilterPipe and SortPipe are set
   */
  filterRepos() {
    console.log('filterRepos');

    this.sortOrder = this.filterForm.value.sortOrder;
    this.searchProperty = this.filterForm.value.filterProperty;
    if (this.searchProperty === 'size') {
      // convert entered value in KB because size is displayed in kb but stored in bytes
      this.searchString = (parseFloat(this.searchString) * 1000).toString();
    } else {
      this.searchString = this.filterForm.value.filterString;
    }
    this.numberFilterType = this.filterForm.value.numberCompare;
    this.setDefaultFilterType(this.searchProperty);
  }

  /**
   * Set filtertype to blank for strings and to 'gt' for numbers
   * @param searchProperty
   */
  setDefaultFilterType(searchProperty: string) {
    if (
      searchProperty === 'name' ||
      searchProperty === 'description' ||
      searchProperty === 'language'
    ) {
      this.numberFilterType = '';
      console.log(
        'setDefaultFilterType numberFilterType',
        this.numberFilterType
      );
    } else {
      this.numberFilterType = this.filterForm.value.numberCompare;
      console.log(
        'setDefaultFilterType numberFilterType',
        this.numberFilterType
      );
    }
  }

  /**
   * get topics for repo and insert into dom
   * @param repo
   */
  onGetReposTopics(repo: GitHubOrgRepo) {
    this.githubService
      .getGithubReposTopics(repo.owner.login, repo.name)
      .subscribe((topics: string[]) => {
        let topicsString;
        if (topics.length > 0) {
          topicsString = topics.join(', ');
        } else {
          topicsString = 'nicht vorhanden';
        }
        this.insertTopicsIntoDom(repo.id, topicsString);
      });
  }

  /**
   * generate table element with topics data
   * @param repoId
   * @param topics
   */
  insertTopicsIntoDom(repoId: number, topics: string) {
    const repoEl = document.getElementById(repoId.toString());
    const newTopicsEl = `<table><tr><td>Topics</td><td>${topics}</td></tr></table>`;
    repoEl.insertAdjacentHTML('afterend', newTopicsEl);
  }

  /**
   * get 100 repos of the org starting at the desired page number
   * @param org
   * @param page
   */
  getOrgRepos(org: string, page: number) {
    console.log('org/page', org, page);

    this.reposSub = this.githubService
      .getGitHubOrgRepos(org, page)
      .subscribe((repos) => {
        if (repos.length > 0) {
          console.log('repos', repos);
          this.githubOrgRepos.push(...repos);
          this.githubOrgRepos.sort((a, b) => {
            return a['name'] < b['name'] ? -1 : 1;
          });
          console.log(
            '***org/page/repos/total',
            org,
            page,
            repos,
            this.githubOrgRepos
          );
        } else {
          // not possible because of access restrictions by GitHub
          // this.getTopicsOfAllRepos();
        }
      });
  }

  // Github does not allow to get the topics of all repos because of access restrictions
  // solution: selecting a repo in template will read and display the topics of the selected repo
  getTopicsOfAllRepos() {
    this.reposCounter = this.githubOrgRepos.length;
    this.githubOrgRepos.forEach((repo) => {
      this.getReposTopics(this.organization, repo.owner.login, repo.name);
    });
    if (this.reposCounter !== this.githubOrgRepos.length) {
      console.error(
        'Error in getTopicsOfAllRepos: different arr.length from start/end',
        this.reposCounter,
        this.githubOrgRepos.length
      );
    }
  }

  /**
   * get topics of a repo
   * @param org
   * @param owner
   * @param repo
   */
  getReposTopics(org: string, owner: string, repo: string) {
    console.log('getReposTopics for org/owner/repos', org, owner, repo);

    this.topicsSub = this.githubService
      .getGithubReposTopics(owner, repo)
      .subscribe((topics) => {
        console.log('topics for repo', repo, topics);
      });
  }

  ngOnDestroy() {
    if (this.reposSub) {
      this.reposSub.unsubscribe();
    }
    if (this.orgSub) {
      this.orgSub.unsubscribe();
    }
    if (this.pageSub) {
      this.pageSub.unsubscribe();
    }
    if (this.topicsSub) {
      this.topicsSub.unsubscribe();
    }
  }
}
