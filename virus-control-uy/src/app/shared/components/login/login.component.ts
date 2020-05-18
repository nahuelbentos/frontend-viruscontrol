import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { AuthService, FacebookLoginProvider, SocialUser } from 'angularx-social-login';
import { AutenticacionService } from '../../services/autenticacion.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewInit {
  applicationId: string;
  user: SocialUser;
  loggedIn: boolean;

  showSppiner = false;
  tipoUsuarioSelected: string; // { value: string, description: string };
  tipoUsuarios = [{
    value: 'CIUDADANO',
    description: 'Ciudadano'
  }, {
    value: 'MEDICO',
    description: 'Médico'
  }];

  constructor(
    private autenticacionService: AutenticacionService,
    private router: Router
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
    this.showSppiner = true;
    this.autenticacionService.loginWithFB()
      .then(res => {
        console.log('res login: ', res);

        this.setUser(this.autenticacionService.user, this.autenticacionService.loggedIn);
      })
      .catch(reject => {
        console.log('reject login: ', reject);
        console.log('reject login: ', reject);

        this.showSppiner = false;
        // this.user = null;
        // this.loggedIn = false;
      });

  }


  loginWithGoogle() {

    this.showSppiner = true;
    this.autenticacionService.loginWithGoogle()
      .then(res => {
        console.log('res login: ', res);
        // this.user = this.autenticacionService.user;
        // this.loggedIn = this.autenticacionService.loggedIn;
        this.setUser(this.autenticacionService.user, this.autenticacionService.loggedIn);

        // this.autenticacionService.loginBackend();
      })
      .catch(reject => {
        console.log('reject login: ', reject);
        this.showSppiner = false;
        // this.user = null;
        // this.loggedIn = false;
      });

  }

  logout() {
    this.showSppiner = true;
    this.autenticacionService.logout()
      .then(res => {
        console.log('res logut: ', res);
        this.setUser(null, false);
      })
      .catch(reject => {
        this.showSppiner = false;
        console.log('reject logut: ', reject);
      });
  }

  goHome(modulo: string, perfil?: string) {
    const url = (perfil) ? `/${modulo}/perfil` : `/${modulo}/home-${modulo}`;
    this.router.navigate([url]);

  }

  setUser(user: SocialUser, loggedIn: boolean) {
    this.showSppiner = false;
    this.user = user;
    this.loggedIn = loggedIn;
  }


}
