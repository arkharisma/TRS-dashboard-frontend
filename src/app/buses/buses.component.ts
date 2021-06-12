import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
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

  form = new FormGroup({
    code: new FormControl('', Validators.required),
    capacity: new FormControl('', Validators.required),
    make: new FormControl('', Validators.required)
  });

  get code() { return this.form.get('code'); }
  get capacity() { return this.form.get('capacity'); }
  get make() { return this.form.get('make'); }

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

  onSubmit(): void {
    const formData = this.form.value;

    if(this.form.valid){
      this.busesService.postData(this.tokenStorage.getToken(), formData.code, formData.capacity, formData.make).subscribe(
        data => {
          if(data.success === true){
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
}
