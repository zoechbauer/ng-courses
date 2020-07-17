import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { GithubService } from '../../github.service';
import { GitHubOrgRepo } from '../../githubOrganization.model';

@Component({
  selector: 'app-list-repos',
  templateUrl: './list-repos.component.html',
  styleUrls: ['./list-repos.component.css'],
})
export class ListReposComponent implements OnInit, OnDestroy {
  organization: string;
  githubOrgRepos: GitHubOrgRepo[] = [];
  reposSub: Subscription;
  orgSub: Subscription;
  pageSub: Subscription;
  topicsSub: Subscription;
  reposCounter: number;

  constructor(private githubService: GithubService) {}

  ngOnInit(): void {
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
  }

  onGetReposTopics(repo: GitHubOrgRepo) {
    console.log('selected repo for topics', repo);
    this.githubService
      .getGithubReposTopics(repo.owner.login, repo.name)
      .subscribe((topics: string[]) => {
        console.log('topics', topics);
        let topicsString;
        if (topics.length > 0) {
          topicsString = topics.join(', ');
        } else {
          topicsString = 'nicht vorhanden';
        }
        this.insertTopicsIntoDom(repo.id, topicsString);
      });
  }

  insertTopicsIntoDom(repoId: number, topics: string) {
    console.log('insertTopicsIntoDom', repoId, topics);
    const repoEl = document.getElementById(repoId.toString());
    const newTopicsEl = `<table><tr><td>Topics</td><td>${topics}</td></tr></table>`;
    console.log(newTopicsEl);
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
