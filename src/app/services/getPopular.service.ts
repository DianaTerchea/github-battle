import { Observable, BehaviorSubject } from 'rxjs';
import { Language, User, Repo } from './../models/user';
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, tap, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GetPopularService {
public isLoading$: BehaviorSubject<boolean> = new BehaviorSubject(true);
private readonly api = 'https://api.github.com/search/repositories?q=stars:%3E1&language:';
constructor(private http: HttpClient) {
}
private extractData(res: Response) {
  let i = 0;
  const repos: Repo[] = [];
  const body = JSON.parse(JSON.stringify(res));
  for (i = 0; i < 30; i++) {
    const repo = new Repo();
    repo.owner = body.items[i].owner.login;
    repo.avatar = body.items[i].owner.avatar_url;
    repo.repoUrl = body.items[i].html_url;
    repo.forks = body.items[i].forks_count;
    repos[i] = repo;
  }
  return repos;
}
public getPopularRepos(selectedLanguage: Language): Observable<Repo[]> {
   this.isLoading$.next(true);
   const url = `${this.api}${selectedLanguage}&sort=forks&order=desc`;
   console.log(url);
   return this.http.get<any>(url).pipe(tap(() => this.isLoading$.next(false)),
     map(this.extractData)
   );
}

}
