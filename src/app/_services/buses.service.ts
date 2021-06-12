import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:8081/api/v1/bus/';

@Injectable({
  providedIn: 'root'
})
export class BusesService {

  constructor(private http: HttpClient) { }

  getAllData(token: string | null): Observable<any> {
    return this.http.get(API_URL + 'list/user', {
      headers: {
        'Authorization': 'Bearer ' + token
      },
      responseType: 'json'
    });
  }

  postData(token:string | null, code: string, capacity: number, make: string): Observable<any> {
    return this.http.post(API_URL + 'add/user', 
    {
      'code': code,
      'capacity': capacity,
      'make': make
    },
    {
      headers: {
        'Authorization': 'Bearer ' + token
      },
      responseType: 'json'
    });
  }
}
