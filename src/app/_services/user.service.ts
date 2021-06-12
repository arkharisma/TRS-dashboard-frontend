import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:8081/api/v1/user/';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }

  getDataByUserId(token: string | null, id: string): Observable<any> {
    return this.http.get(API_URL + id, {
      headers: {
        'Authorization': 'Bearer ' + token
      },
      responseType: 'json'
    });
  }

  putData(token:string | null, id: string, firstName: string, lastName: string, mobileNumber: string): Observable<any> {
    return this.http.put(API_URL + id, 
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

  changePassword(token: string | null, id: string, password: string): Observable<any> {
    return this.http.put(API_URL + 'changepassword/' + id, 
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
