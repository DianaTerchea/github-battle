import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class GetProfileService {

  private readonly api: string = ' https://api.github.com/users/DianaTerchea';
  private readonly token: string = '5e03d1cde83454a1291da4d87c4a722c450b58c6';
  constructor(private http: HttpClient) {
    console.log('service is ready');
  }
  getInfo(): Observable<any>
  {
    console.log('sunt aici in serviciu');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer' + `${this.token}`
    });
    console.log('sunt aici inainte de return');
    return this.http.get<any>(this.api, { headers });
  }

}
