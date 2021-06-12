import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from '../_services/token-storage.service';
import { UserService } from '../_services/user.service';
import * as Prism from 'prismjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, AfterViewInit {
  content?: string;
  page: string = 'Dashboard';
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  chartBarOptions: any;
  chartBarData: any;
  chartDonutOptions: any;
  chartDonutData: any;

  constructor(private userService: UserService, private tokenStorage: TokenStorageService, private router: Router) { }

  ngAfterViewInit(): void {
    Prism.highlightAll();
  }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
    if(this.isLoggedIn === true && !(this.roles.indexOf('ROLE_USER') == null)) {
      this.chartBarData = [
        {y: 'Mon',a: 10,b: 30}, 
        {y: 'Tue',a: 100,b: 25}, 
        {y: 'Wed',a: 60,b: 25}, 
        {y: 'Thu',a: 75,b: 35}, 
        {y: 'Fri',a: 90,b: 20}, 
        {y: 'Sat',a: 75,b: 15}, 
        {y: 'Sun',a: 50,b: 10}
      ];
      this.chartBarOptions = {
        xkey: 'y',
        ykeys: ['a', 'b'],
        labels: ['Ample', 'Pixel'],
        resize: true,
        hideHover: 'auto'
      };

      this.chartDonutOptions = {
        resize: true
      };
      this.chartDonutData = [
        {label: "Mobile",value: 32}, 
        {label: "Dekstop",value: 18}, 
        {label: "Tablet",value: 20}
      ];
    } else {
      window.location.href = "/login";
    }
  }
}
