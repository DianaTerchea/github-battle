import { User } from './../models/user';
import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, tap, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GetProfileService {
  private readonly api: string = 'https://api.github.com/users/';
  private readonly token: string = '5e03d1cde83454a1291da4d87c4a722c450b58c6';
  private response: any;
  constructor(private http: HttpClient) {
    console.log('service is ready');
  }
    private extractData(res: Response) {
      const body = res;
      const smth = JSON.parse(JSON.stringify(body));
      return body || {};
    }

    getUser(username: string): Observable<any> {
      const urlValue = `${this.api}${username}`;
      return this.http.get(urlValue).pipe(
            map(this.extractData),
            catchError(this.handleError)
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
