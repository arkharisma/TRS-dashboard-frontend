import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:8081/api/v1/trip/';

@Injectable({
  providedIn: 'root'
})
export class TripsService {

  constructor(private http: HttpClient) { }

  getAllData(token: string | null): Observable<any> {
    return this.http.get(API_URL + 'list/user', {
      headers: {
        'Authorization': 'Bearer ' + token
      },
      responseType: 'json'
    });
  }

  getBusData(token: string | null): Observable<any> {
    return this.http.get('http://localhost:8081/api/v1/bus/list/user', {
      headers: {
        'Authorization': 'Bearer ' + token
      },
      responseType: 'json'
    });
  }

  getStopData(token: string | null): Observable<any> {
    return this.http.get('http://localhost:8081/api/v1/stop/', {
      headers: {
        'Authorization': 'Bearer ' + token
      },
      responseType: 'json'
    });
  }

  postData(token:string | null, busCode: string, sourceStop: string, destStop: string, duration: string, fare: number): Observable<any> {
    return this.http.post(API_URL + 'user', 
    {
      'bus': busCode,
      'sourceStop': sourceStop,
      'destStop': destStop,
      'journey_time': duration,
      'fare': fare
    },
    {
      headers: {
        'Authorization': 'Bearer ' + token
      },
      responseType: 'json'
    });
  }
}
