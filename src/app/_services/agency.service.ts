import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:8081/api/v1/agency/';

@Injectable({
  providedIn: 'root'
})
export class AgencyService {

  constructor(private http: HttpClient) { }

  getAllData(token: string | null, id: string): Observable<any> {
    return this.http.get(API_URL + 'list/user/' + id, {
      headers: {
        'Authorization': 'Bearer ' + token
      },
      responseType: 'json'
    });
  }

  getDataByUserId(token: string | null, id: string): Observable<any> {
    return this.http.get(API_URL + 'user/' + id, {
      headers: {
        'Authorization': 'Bearer ' + token
      },
      responseType: 'json'
    });
  }

  putData(token:string | null, id: string, name: string, detail: string): Observable<any> {
    return this.http.put(API_URL + id, 
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
