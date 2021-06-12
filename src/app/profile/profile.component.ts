import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
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
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    mobileNumber: new FormControl('')
  });

  formChangePassword = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  });

  // form: any = {
  //   firstName: null,
  //   lastName: null,
  //   mobileNumber: null
  // };

  // changePassword: any = {
  //   username: null,
  //   password: null
  // };

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
      this.userService.getDataByUserId(this.tokenStorage.getToken(), this.tokenStorage.getUser().id).subscribe(
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
          // this.form = {
          //   firstName: data.object.first_name,
          //   lastName: data.object.last_name,
          //   mobileNumber: data.object.mobile_number
          // };
          // this.changePassword = {
          //   username: data.object.username
          // };
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
    // const { firstName, lastName, mobileNumber } = this.form;

    this.userService.putData(this.tokenStorage.getToken(), this.tokenStorage.getUser().id, firstName, lastName, mobileNumber).subscribe(
      data => {
        if(data.success === true){
          // this.dataContent = data.data;
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

  submitChange(): void {
    const formChangePasswordTemp = this.formChangePassword.value;

    let password = formChangePasswordTemp.password;

    console.log(password);

    this.userService.changePassword(this.tokenStorage.getToken(), this.tokenStorage.getUser().id, password).subscribe(
      data => {
        if(data.success === true){
          // this.dataContent = data.data;
          // form.resetForm();
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
