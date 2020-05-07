import { User, Repo, Stats, Language } from './../models/user';
import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError, BehaviorSubject} from 'rxjs';
import {catchError, tap, map, retry} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class GetProfileService {
  private readonly api: string = 'https://api.github.com/users/';
  private readonly repoApi: string = 'https://api.github.com/repos/';
  private readonly popularApi: string = 'https://api.github.com/search/repositories?q=stars:%3E1&language:';
  private readonly token: string = '5e03d1cde83454a1291da4d87c4a722c450b58c6';
  public isLoading$: BehaviorSubject<boolean> = new BehaviorSubject(true);
  constructor(private http: HttpClient) {
    console.log('service is ready');
  }
    private extractData(res: Response) {
      const body = JSON.parse(JSON.stringify(res));
      const user = new User();
      user.setUserNameAndId(body.login, body.id);
      user.setAvatarRepoAddressAndLink( body.avatar_url, body.html_url, body.repos_url);
      user.setRepoAndFollowers(body.public_repos, body.followers);
      return user;
    }

    private extractRepos(res: Response) {
      let i = 0;
      const repos: string[] = [];
      const body = JSON.parse(JSON.stringify(res));
      for (i = 0; i < body.length; i++) {
        repos[i] = body[i].name;
      }
      return repos;
    }

    private extractStats(res: Response, repoName: string) {
      let i = 0;
      const body = JSON.parse(JSON.stringify(res));
      const stats = new Stats(repoName);
      const weeks = body[0].weeks;
      for ( i = 0; i < weeks.length; i++) {
        stats.addition[i] = weeks[i].a;
        stats.deletion[i] = weeks[i].d;
        stats.commits[i] = weeks[i].c;
      }
      return stats;
    }
    private extractPopular(res: Response) {
      let i = 0;
      const repos: Repo[] = [];
      const body = JSON.parse(JSON.stringify(res));
      for (i = 0; i < 30; i++) {
        const repo = new Repo(body.items[i].owner.login);
        repo.setAvatarAndRepos( body.items[i].owner.avatar_url, body.items[i].html_url)
        repo.setForks(body.items[i].forks_count);
        repos[i] = repo;
      }
      return repos;
    }

  getUser(username: string): Observable<User> {
    const urlValue = `${this.api}${username}`;
    return this.http.get<any>(urlValue).pipe(
      catchError(this.handleError),
      map(this.extractData)
    );
    }

  public getRepos(username: string): Observable<string[]> {
    const url = `${this.api}${username}/repos`;
    return this.http.get<any>(url).pipe(
    catchError(this.handleError),
    map(this.extractRepos)
    );
 }

 public getStats(repoName: string): Observable<Stats> {
  const url = `${this.repoApi}DianaTerchea/${repoName}/stats/contributors`;
  return this.http.get<any>(url).pipe(
  catchError(this.handleError),
  map((res) => this.extractStats(res, repoName))
  );
 }

 public getPopularRepos(selectedLanguage: Language): Observable<Repo[]> {
  this.isLoading$.next(true);
  const url = `${this.popularApi}${selectedLanguage}&sort=forks&order=desc`;
  console.log(url);
  return this.http.get<any>(url).pipe(tap(() => this.isLoading$.next(false)),
    map(this.extractPopular)
  );
}

private handleError(err: HttpErrorResponse) {
        let errorMessage = '';
        if (err.error instanceof ErrorEvent) {
            errorMessage = `An error occurred: ${err.error.message}`;
        } else {
            errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
        }
        console.error(errorMessage);
        return throwError(errorMessage);
      }
  }
