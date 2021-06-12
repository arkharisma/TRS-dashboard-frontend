import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from '../_services/token-storage.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  content?: string;
  page: string = 'Dashboard';
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(private userService: UserService, private tokenStorage: TokenStorageService, private router: Router) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
    if(this.isLoggedIn === true && !(this.roles.indexOf('ROLE_USER') == null)) {
      // this.userService.getPublicContent().subscribe(
      //   data => {
      //     this.content = data;
      //   },
      //   err => {
      //     this.content = JSON.parse(err.error).message;
      //   }
      // );
    } else {
      window.location.href = "/login";
      // this.router.navigate(['login']);
    }
  }
}
