import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = 'http://localhost:8081/api/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'auth', {
      username,
      password
    }, httpOptions);
  }

  register(username: string, first_name: string, last_name: string, mobile_number: string, password: string, agency_name: string, agency_code: string, agency_details: string): Observable<any> {
    return this.http.post(AUTH_API + 'v1/user/agency/signup', {
      'username': username,
      'firstName': first_name,
      'lastName': last_name,
      'mobileNumber': mobile_number,
      'password': password,
      'role': ['agency'],
      'code': agency_code,
      'name': agency_name,
      'details': agency_details
    }, httpOptions);
  }
}
