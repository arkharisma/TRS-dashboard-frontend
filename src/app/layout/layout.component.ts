import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from '../_services/token-storage.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  content?: string;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  currentUser: any;
  roles: string[] = [];

  constructor(private tokenStorage: TokenStorageService, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.currentUser = this.tokenStorage.getUser();
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
      this.router.navigate(['login']);
    }
  }

  logout(): void {
    this.tokenStorage.signOut();
    window.location.reload();
  }

}
