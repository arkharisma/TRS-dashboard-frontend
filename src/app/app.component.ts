import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { TokenStorageService } from './_services/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;
  first_name?: string;
  last_name?: string;
  mobile_number?: string;
  route?: string;

  constructor(private tokenStorageService: TokenStorageService, private location: Location) {}

  ngOnInit(): void {
    // this.isLoggedIn = !!this.tokenStorageService.getToken();
    this.route = location.pathname;
    
    if (this.tokenStorageService.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorageService.getUser().roles;
    }

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_AGENCY');

      this.username = user.username;
      this.first_name = user.first_name;
      this.last_name = user.last_name;
      this.mobile_number = user.mobile_number;
    }
  }
}
