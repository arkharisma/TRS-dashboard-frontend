import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AgencyService } from '../_services/agency.service';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-agency',
  templateUrl: './agency.component.html',
  styleUrls: ['./agency.component.css']
})
export class AgencyComponent implements OnInit {

  form = new FormGroup({
    name: new FormControl('', Validators.required),
    detail: new FormControl('', Validators.required)
  });

  get name() { return this.form.get('name'); }
  get detail() { return this.form.get('detail'); }

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
      this.agencyService.getDataByUser(this.tokenStorage.getToken()).subscribe(
        data => {
          this.dataContent = data.object;
          this.form.setValue({
            name: data.object.name,
            detail: data.object.details,
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

  onSubmit(): void {
    const formData =this.form.value;

    if(this.form.valid){
      this.agencyService.putData(this.tokenStorage.getToken(), formData.name, formData.detail).subscribe(
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
