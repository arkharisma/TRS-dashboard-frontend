import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenStorageService } from '../_services/token-storage.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  formUpdate = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    mobileNumber: new FormControl('', Validators.required)
  });

  get firstName() { return this.formUpdate.get('firstName'); }
  get lastName() { return this.formUpdate.get('lastName'); }
  get mobileNumber() { return this.formUpdate.get('mobileNumber'); }

  formChangePassword = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  get username() { return this.formChangePassword.get('username'); }
  get password() { return this.formChangePassword.get('password'); }


  content?: any;
  page: string = 'Profile';
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  currentUser: any;

  constructor(private userService: UserService, private tokenStorage: TokenStorageService, private router: Router) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.currentUser = this.tokenStorage.getUser();
      this.roles = this.tokenStorage.getUser().roles;
    }
    if(this.isLoggedIn === true && !(this.roles.indexOf('ROLE_USER') == null)) {
      this.userService.getDataByUserId(this.tokenStorage.getToken()).subscribe(
        data => {
          this.content = data.object;
          this.formUpdate.setValue({
            firstName: data.object.first_name,
            lastName: data.object.last_name,
            mobileNumber: data.object.mobile_number
          });
          this.formChangePassword.setValue({
            username: data.object.username,
            password: ''
          });
        },
        err => {
          this.content = JSON.parse(err.error).message;
        }
      );
    } else {
      this.router.navigate(['login']);
    }
  }

  updateSubmit(): void {
    const formUpdateTemp = this.formUpdate.value;
    let firstName = formUpdateTemp.firstName;
    let lastName = formUpdateTemp.lastName;
    let mobileNumber = formUpdateTemp.mobileNumber;

    if(firstName !== "" && lastName !== "" && (mobileNumber !== 0 || mobileNumber !== "")){
      this.userService.putData(this.tokenStorage.getToken(), firstName, lastName, mobileNumber).subscribe(
        data => {
          if(data.success === true){
            this.ngOnInit();
          } else {
            this.content = JSON.parse(data.message).message;
          }
        },
        err => {
          this.content = JSON.parse(err.error).message;
        }
      );
    }
    
  }

  submitChange(): void {
    const formChangePasswordTemp = this.formChangePassword.value;

    let password = formChangePasswordTemp.password;
    if(password !== ""){
      this.userService.changePassword(this.tokenStorage.getToken(), password).subscribe(
        data => {
          if(data.success === true){
            this.ngOnInit();
          } else {
            this.content = JSON.parse(data.message).message;
          }
        },
        err => {
          this.content = JSON.parse(err.error).message;
        }
      );
    }
    
  }
}
