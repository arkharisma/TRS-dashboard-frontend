import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenStorageService } from '../_services/token-storage.service';
import { TripsService } from '../_services/trips.service';

@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.css']
})
export class TripsComponent implements OnInit {

  form: any = {
    busCode: null,
    sourceStop: null,
    destStop: null,
    duration: null,
    fare: null
  };

  dataContent?: any[];
  dataBus?: any[];
  dataStop?: any[];
  page: string = 'Trips';
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(private tripsService: TripsService, private tokenStorage: TokenStorageService, private router: Router) { }

  ngOnInit(): void {
    this.tripsService.getAllData(this.tokenStorage.getToken()).subscribe(
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

    this.tripsService.getBusData(this.tokenStorage.getToken()).subscribe(
      data => {
        if(data.success === true){
          this.dataBus = data.data;
        } else {
          this.dataBus = [];
        }
      },
      err => {
        this.dataBus = [];
      }
    );

    this.tripsService.getStopData(this.tokenStorage.getToken()).subscribe(
      data => {
        if(data.success === true){
          this.dataStop = data.data;
        } else {
          this.dataStop = [];
        }
      },
      err => {
        this.dataStop = [];
      }
    );

  }

  onSubmit(form: NgForm): void {
    const { busCode, sourceStop, destStop, duration, fare } = this.form;

    this.tripsService.postData(this.tokenStorage.getToken(), busCode, sourceStop, destStop, duration, fare).subscribe(
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
