import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:8081/api/v1/user/';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }

  getDataByUserId(token: string | null): Observable<any> {
    return this.http.get(API_URL + 'user', {
      headers: {
        'Authorization': 'Bearer ' + token
      },
      responseType: 'json'
    });
  }

  putData(token:string | null, firstName: string, lastName: string, mobileNumber: string): Observable<any> {
    return this.http.put(API_URL, 
    {
      'first_name': firstName,
      'last_name': lastName,
      'mobile_number': mobileNumber
    },
    {
      headers: {
        'Authorization': 'Bearer ' + token
      },
      responseType: 'json'
    });
  }

  changePassword(token: string | null, password: string): Observable<any> {
    return this.http.put(API_URL + 'changepassword', 
    {
      'password': password
    },
    {
      headers: {
        'Authorization': 'Bearer ' + token
      },
      responseType: 'json'
    });
  }
}
