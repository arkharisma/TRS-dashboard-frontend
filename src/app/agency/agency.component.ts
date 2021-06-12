import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AgencyService } from '../_services/agency.service';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-agency',
  templateUrl: './agency.component.html',
  styleUrls: ['./agency.component.css']
})
export class AgencyComponent implements OnInit {

  form: any = {
    name: null,
    detail: null
  };

  dataContent?: any;
  content?: string;
  page: string = 'Agency';
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(private agencyService: AgencyService, private tokenStorage: TokenStorageService, private router: Router) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
    if(this.isLoggedIn === true && !(this.roles.indexOf('ROLE_USER') == null)) {
      this.agencyService.getDataByUserId(this.tokenStorage.getToken(), this.tokenStorage.getUser().id).subscribe(
        data => {
          this.dataContent = data.object;
          this.form = {
            name: data.object.name,
            detail: data.object.details
          };
        },
        err => {
          this.content = JSON.parse(err.error).message;
        }
      );
    } else {
      this.router.navigate(['login']);
    }
  }

  onSubmit(form: NgForm): void {
    const { name, detail } = this.form;

    this.agencyService.putData(this.tokenStorage.getToken(), this.tokenStorage.getUser().id, name, detail).subscribe(
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
