import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { BusesService } from '../_services/buses.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-buses',
  templateUrl: './buses.component.html',
  styleUrls: ['./buses.component.css'],
})
export class BusesComponent implements OnInit {

  form: any = {
    code: null,
    capacity: null,
    make: null
  };

  dataContent?: any[];
  page: string = 'Buses';
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(private busesService: BusesService, private tokenStorage: TokenStorageService, private router: Router) { }

  ngOnInit(): void {
    this.busesService.getAllData(this.tokenStorage.getToken()).subscribe(
      data => {
        if(data.success === true){
          this.dataContent = data.data;
        } else {
          this.dataContent = [];
        }
      },
      err => {
        this.dataContent = [];
      }
    );
  }

  onSubmit(form: NgForm): void {
    const { code, capacity, make } = this.form;

    this.busesService.postData(this.tokenStorage.getToken(), code, capacity, make).subscribe(
      data => {
        if(data.success === true){
          // this.dataContent = data.data;
          form.resetForm();
          this.ngOnInit();
        } else {
          this.dataContent = JSON.parse(data.message).message;
        }
      },
      err => {
        this.dataContent = JSON.parse(err.error).message;
      }
    );
    
  }
}
