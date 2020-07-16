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
        }
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
  }
}
