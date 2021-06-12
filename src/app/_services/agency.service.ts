import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:8081/api/v1/agency/';

@Injectable({
  providedIn: 'root'
})
export class AgencyService {

  constructor(private http: HttpClient) { }

  getDataByUser(token: string | null): Observable<any> {
    return this.http.get(API_URL + 'user', {
      headers: {
        'Authorization': 'Bearer ' + token
      },
      responseType: 'json'
    });
  }

  putData(token:string | null, name: string, detail: string): Observable<any> {
    return this.http.put(API_URL, 
    {
      'name': name,
      'details': detail
    },
    {
      headers: {
        'Authorization': 'Bearer ' + token
      },
      responseType: 'json'
    });
  }
}
