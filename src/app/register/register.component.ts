import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: any = {
    username: null,
    firstName: null,
    lastName: null,
    mobileNumber: null,
    password: null,
    agencyName: null,
    agencyCode:null,
    agencyDetails: null
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  isLoggedIn = false;

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    const { username, firstName, lastName, mobileNumber, password, agencyName, agencyCode, agencyDetails} = this.form;

    console.log(this.form);

    this.authService.register(username, firstName, lastName, mobileNumber, password, agencyName, agencyCode, agencyDetails).subscribe(
      data => {
        this.isSuccessful = true;
        this.isSignUpFailed = false;

        this.login(username, password);
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );
  }

  login(username: string, password: string): void{
    this.authService.login(username, password).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);

        this.isLoggedIn = true;
        window.location.href = '/home';
      },
      err => {
        this.errorMessage = err.error.message;
      }
    );
  }
}
