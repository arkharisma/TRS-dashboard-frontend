import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form = new FormGroup({
    username: new FormControl('', Validators.required),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    mobileNumber: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    agencyName: new FormControl('', Validators.required),
    agencyCode: new FormControl('', Validators.required),
    agencyDetails: new FormControl('', Validators.required)
  });

  get username() { return this.form.get('username'); }
  get firstName() { return this.form.get('firstName'); }
  get lastName() { return this.form.get('lastName'); }
  get mobileNumber() { return this.form.get('mobileNumber'); }
  get password() { return this.form.get('password'); }
  get agencyName() { return this.form.get('agencyName'); }
  get agencyCode() { return this.form.get('agencyCode'); }
  get agencyDetails() { return this.form.get('agencyDetails'); }

  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  isLoggedIn = false;

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    const formData = this.form.value;

    if(this.form.valid){
      this.authService.register(formData.username, formData.firstName, formData.lastName, formData.mobileNumber, formData.password, formData.agencyName, formData.agencyCode, formData.agencyDetails).subscribe(
        data => {
          this.isSuccessful = true;
          this.isSignUpFailed = false;

          this.login(formData.username, formData.password);
        },
        err => {
          this.errorMessage = err.error.message;
          this.isSignUpFailed = true;
        }
      );
    }
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
