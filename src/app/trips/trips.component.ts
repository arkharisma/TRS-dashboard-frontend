import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenStorageService } from '../_services/token-storage.service';
import { TripsService } from '../_services/trips.service';

@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.css']
})
export class TripsComponent implements OnInit {

  form = new FormGroup({
    busCode: new FormControl('', Validators.required),
    sourceStop: new FormControl('', Validators.required),
    destStop: new FormControl('', Validators.required),
    duration: new FormControl('', Validators.required),
    fare: new FormControl('', Validators.required)
  });

  get busCode() { return this.form.get('busCode'); }
  get sourceStop() { return this.form.get('sourceStop'); }
  get destStop() { return this.form.get('destStop'); }
  get duration() { return this.form.get('duration'); }
  get fare() { return this.form.get('fare'); }

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

  onSubmit(): void {
    const formData = this.form.value;

    let busCode = formData.busCode;
    let sourceStop = formData.sourceStop;
    let destStop = formData.destStop;
    let duration = formData.duration;
    let fare = formData.fare;

    if(busCode !== "" && sourceStop !== "" && destStop !== "" && (duration !== "" || duration !== 0) && (fare !== "" && fare !== 0)){
      this.tripsService.postData(this.tokenStorage.getToken(), busCode, sourceStop, destStop, duration, fare).subscribe(
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
