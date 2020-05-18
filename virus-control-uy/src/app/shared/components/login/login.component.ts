import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { AuthService, FacebookLoginProvider, SocialUser } from 'angularx-social-login';
import { AutenticacionService } from '../../services/autenticacion.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewInit {
  applicationId: string;
  user: SocialUser;
  loggedIn: boolean;

  constructor(
    private autenticacionService: AutenticacionService
  ) {

  }

  ngOnInit(): void {


    this.autenticacionService.authStateFB()
      .subscribe((user) => {
        this.user = user;
        this.loggedIn = (user != null);
        console.log('usuario: ', this.user);
      });


  }

  ngAfterViewInit() {
  }

  loginWithFB() {

    this.autenticacionService.loginWithFB()
      .then(res => {
        console.log('res login: ', res);
      })
      .catch(reject => {
        console.log('reject login: ', reject);
      });

    this.setUser();
  }

  logout() {
    this.autenticacionService.logoutWithFB()
      .then(res => {
        console.log('res logut: ', res);
      })
      .catch(reject => {
        console.log('reject logut: ', reject);
      })
    this.setUser();
  }

  setUser() {
    this.user = this.autenticacionService.user;
    this.loggedIn = this.autenticacionService.loggedIn;
  }


}
