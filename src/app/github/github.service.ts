import { Injectable } from '@angular/core';
import { Observable, throwError, Subject, BehaviorSubject, of } from 'rxjs';
import { tap, map, catchError, take } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GitHubOrgRepo, GitHubOrg } from './githubOrganization.model';
import { SelectOption } from './selectOption.model';

@Injectable({
  providedIn: 'root',
})
export class GithubService {
  private filterProps: SelectOption[] = [
    { name: 'Name', value: 'name' },
    { name: 'Description', value: 'description' },
    { name: 'Language', value: 'language' },
    { name: 'Watchers', value: 'watchers' },
    { name: 'Forks', value: 'forks' },
    { name: 'Size', value: 'size' },
  ];

  private filterOrg: string;
  private pageNumber: number;
  pageNumberSubject = new Subject<number>();
  totalCountOrgSubject = new Subject<number>();
  selectedOrg = new BehaviorSubject<string>('');

  constructor(private http: HttpClient) {}

  DETAIL_LOG_INFOS = false;

  UrlType = {
    Organization: 1,
    OrganizationRepositories: 2,
    RepoTopics: 3,
  };

  /**
   * create url for desired urlType
   * @param urlType
   * @param org
   * @param owner- optional
   * @param repo - optional
   */
  getUrl(urlType: any, org: string, owner: string = '', repo: string = '') {
    // return 'https://api.github.com/users/zoechbauer';
    // return 'https://api.github.com/search/users?q=type:org';

    let baseUrl = '';
    let query = '';
    let url = '';

    switch (urlType) {
      case this.UrlType.Organization:
        // const url = 'https://api.github.com/organizations';
        baseUrl = 'https://api.github.com/search/users';
        query = `?q=${org} type:organization&per_page=100`;
        break;

      case this.UrlType.OrganizationRepositories:
        // return 'https://api.github.com/orgs/angular/repos';
        baseUrl = `https://api.github.com/orgs/${this.filterOrg.toLocaleLowerCase()}/repos`;
        query = `?${this.getPage()}`;
        break;

      case this.UrlType.RepoTopics:
        // GET /repos/:owner/:repo/topics
        baseUrl = `https://api.github.com/repos/${owner.toLowerCase()}/${repo.toLowerCase()}/topics`;
        break;
    }
    url = baseUrl + query;
    console.log('url', url);
    return url;
  }

  /**
   * increment pagenumber as Github allows only 100 records per httm request
   */
  getPage(): string {
    // for organization repos you cannot search for the required sesarch fields
    // how can I search?
    // I increased resultset from 30 items per page to the allowed maximum & I am using pagination to get all records
    return `page=${this.pageNumber}&per_page=100`;
  }

  /**
   * Read 100 repos of the desired ORG. If the returned array size is 100 then send a BehaviorSubject to get the next 100 revords.
   * With this algo all repos of an Org are retrieved and from the caller merged.
   * @param org
   * @param pageNumber
   */
  getGitHubOrgRepos(
    org: string,
    pageNumber: number
  ): Observable<GitHubOrgRepo[]> {
    this.filterOrg = org;
    this.pageNumber = pageNumber;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/vnd.github.v3.+json',
    });
    const options = {
      headers: headers,
      crossDomain: true,
    };

    return this.http
      .get<GitHubOrgRepo[]>(
        this.getUrl(this.UrlType.OrganizationRepositories, org),
        options
      )
      .pipe(
        tap((repos: GitHubOrgRepo[]) => {
          console.log(
            'getGitHubOrgRepos: org, page, url',
            org,
            pageNumber,
            this.getUrl(this.UrlType.OrganizationRepositories, org)
          );

          // loop through api until all records are retrieved
          const nextPageNumber = repos.length > 0 ? this.pageNumber + 1 : 0;
          if (nextPageNumber > 0) {
            this.pageNumberSubject.next(nextPageNumber);
          }
          if (this.DETAIL_LOG_INFOS) {
            repos.forEach((repo) => {
              console.log(
                repo.full_name,
                repo.name,
                repo.private,
                repo.owner.login,
                repo.description,
                repo.html_url,
                repo.homepage,
                repo.size,
                repo.language,
                repo.has_wiki
              );
            });
          }
        }),
        catchError((err) => {
          console.error(err);
          return throwError(err);
        })
      );
  }

  getFilterProperties(): SelectOption[] {
    return this.filterProps.slice();
  }

  /**
   * Get the topics of a repo from an org and owner
   * GET /repos/:owner/:repo/topics
   * @param org
   * @param owner
   * @param repo
   */
  getGithubReposTopics(
    org: string,
    owner: string,
    repo: string
  ): Observable<any> {
    if (
      org === undefined ||
      org === '' ||
      owner === undefined ||
      owner === '' ||
      repo === undefined ||
      repo === ''
    ) {
      console.log(
        'ERROR in getGithubReposTopics: invalid search fields',
        org,
        owner,
        repo
      );
      return;
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/vnd.github.mercy-preview+json',
    });
    const options = {
      headers: headers,
      crossDomain: true,
    };

    return this.http
      .get<any>(this.getUrl(this.UrlType.RepoTopics, org, owner, repo), options)
      .pipe(
        tap((res) => {
          console.log('topics from api', res);
        }),
        map((res) => res.names)
      );

    // simulation
    // https://developer.github.com/v3/repos/#get-all-repository-topics
    // return of({
    //   names: [
    //     'angular9',
    //     'api',
    //     'angular-material',
    //     'angularfire',
    //     'flex-layout',
    //     'jasmine-tests',
    //     'compodoc-documentation',
    //     'cypress-e2e',
    //   ],
    // }).pipe(map((res) => res.names));
  }

  /**
   * Get all Organizations that starts with the org param
   * @param org
   */
  getGithubOrganizations(org: string): Observable<GitHubOrg[]> {
    if (org === undefined || org === '') {
      console.log('ERROR in getGithubOrganizations: empty Org', org);
      return;
    }
    return this.http.get(this.getUrl(this.UrlType.Organization, org)).pipe(
      tap((res: any) => {
        // console.log('items', res);
        // const items = res.items;
        // console.log(items[0].login);
        console.log('total_count', res.total_count);
        this.totalCountOrgSubject.next(res.total_count);
        // throw new Error('Test Fehler simulation');
      }),
      map((res: any) =>
        res.items.map((item) => {
          const orgItem: GitHubOrg = {
            login: item.login,
            avatar: item.avatar_url,
            url: item.html_url,
          };
          return orgItem;
        })
      ),
      // tap((res) => console.log('org-result', res)),
      catchError((err) => {
        console.error(`Error in getGithubOrganizations(${org}): ${err}`);
        return throwError(
          'Es ist ein Fehler aufgetreten. Versuchen Sie es später nochmals'
        );
      })
    );
  }
}
