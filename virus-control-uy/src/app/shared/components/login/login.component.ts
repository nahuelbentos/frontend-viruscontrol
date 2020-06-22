import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import {
  AuthService,
  FacebookLoginProvider,
  SocialUser,
} from 'angularx-social-login';
import { AutenticacionService } from '../../services/autenticacion.service';
import { Router, NavigationExtras } from '@angular/router';
import { Usuario } from '@shared/model/Usuario';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuxiliaresService } from '@shared/services/auxiliares.service';
import { Country } from '@shared/model/Country';
import { ChatService } from '@shared/services/chat.service';
import { errorMensaje } from '@shared/utils/sweet-alert';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, AfterViewInit {
  applicationId: string;
  user: SocialUser;
  loggedIn: boolean;
  loginForm: FormGroup;

  showSppiner = false;
  tipoUsuarioSelected: string; // { value: string, description: string };
  tipoUsuarios = [
    {
      value: 'ciudadano',
      description: 'Ciudadano',
    },
    {
      value: 'medico',
      description: 'Médico',
    },
  ];

  constructor(
    private autenticacionService: AutenticacionService,
    private router: Router,
    private fb: FormBuilder,
    private auxiliaresService: AuxiliaresService,
    private chatService: ChatService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      selectTipoUsuario: [null, [Validators.required]],
    });

    this.autenticacionService.authStateFB().subscribe((user) => {
      this.user = user;
      this.loggedIn = user != null;
    });
  }

  get selectTipoUsuarioField() {
    return this.loginForm.get('selectTipoUsuario');
  }

  ngAfterViewInit() {}

  loginWithFB() {
    if (this.loginForm.invalid) {
      return;
    }
    this.showSppiner = true;
    this.autenticacionService
      .loginWithFB()
      .then((res) => {
        this.loginBackend(res);
      })
      .catch((reject) => {
        console.log('reject login: ', reject);
        console.log('reject login: ', reject);

        this.showSppiner = false;
        // this.user = null;
        // this.loggedIn = false;
      });
  }

  loginWithGoogle() {
    if (this.loginForm.invalid) {
      return;
    }

    this.showSppiner = true;
    this.autenticacionService
      .loginWithGoogle()
      .then((res) => {
        console.log('res login: ', res);
        // this.user = this.autenticacionService.user;
        // this.loggedIn = this.autenticacionService.loggedIn;

        this.loginBackend(res);
      })
      .catch((reject) => {
        console.log('reject login: ', reject);
        this.showSppiner = false;
        // this.user = null;
        // this.loggedIn = false;
      });
  }

  logout() {
    this.showSppiner = true;
    this.autenticacionService
      .logout()
      .then((res) => {
        this.showSppiner = false;
        console.log('res logut: ', res);
        this.setUser(null, false);
      })
      .catch((reject) => {
        this.showSppiner = false;
        console.log('reject logut: ', reject);
      });
  }

  loginBackend(response: SocialUser) {
    const usuario: Usuario = {
      nombre: response.firstName,
      apellido: response.lastName,
      correo: response.email,
      username: response.email,
    };

    this.autenticacionService
      .loginBackend(usuario, this.tipoUsuarioSelected)
      .subscribe((res: any) => {
        // si el usuario es ciudadano y es primer ingreso => voy al perfil
        if (res.response === 'FAILED') {
          this.logout();
          errorMensaje(
            'Cuenta ya registrada',
            'La cuenta que está ingresando, ya esta registrada en la plataforma como Médico, ingrese con otra.'
          );
        } else {
          localStorage.setItem('loggedIn', 'true');
          localStorage.setItem('tipoUsuario', this.tipoUsuarioSelected);

          this.autenticacionService.setloggedIn(true);
          this.setUser(response, this.autenticacionService.getLoggedIn());

          const usuario: Usuario = res.usuario;
          usuario.sessionToken = res.sessionToken;
          usuario.photoUrl = response.photoUrl;
          usuario.fechaNacimiento = new Date(res.usuario.fechaNacimiento);
          console.log('res usuario.fechaNacimiento: ', usuario.fechaNacimiento);
          this.autenticacionService.setUser(usuario);

          if (
            this.tipoUsuarioSelected === 'ciudadano' &&
            res.response === 'PRIMERINGRESO'
          ) {
            this.getPaises(res.usuario, res.response);
          } else {
            if (this.tipoUsuarioSelected === 'medico') {
              this.chatService
                .createUsuario(usuario)
                .then((res) => {
                  console.log('Response de firebase: ', res);
                })
                .catch((err) => {
                  console.error('Error de firebase: ', err);
                });
            }else {
              this.chatService
                .createCiudadano(usuario)
                .then((res) => {
                  console.log('Response de firebase: ', res);
                })
                .catch((err) => {
                  console.error('Error de firebase: ', err);
                });
            }

            this.goHome(this.tipoUsuarioSelected, res.usuario);
          }
        }
      });
  }

  goHome(modulo: string, usuario: any, perfil?: string) {
    const url = perfil ? `/${modulo}/perfil` : `/${modulo}/home`;
    localStorage.setItem('usuario', JSON.stringify(usuario));
    // temporal - luego se va
    localStorage.setItem('usuarioLogueado', JSON.stringify(usuario));
    this.router.navigate([url]);
  }

  setUser(user: SocialUser, loggedIn: boolean) {
    this.showSppiner = false;
    this.user = user;
    this.loggedIn = loggedIn;
  }

  getPaises(usuario, response) {
    this.auxiliaresService.getCountries().subscribe((res: Country[]) => {
      // const reformattedArray
      const paises = res.map((obj) => {
        const rObj = {};

        // tslint:disable-next-line: no-string-literal
        rObj['nombre'] = obj.name;
        return obj.name;
      });

      localStorage.setItem('paises', JSON.stringify(paises));
      this.goHome(this.tipoUsuarioSelected, usuario, response);
    });
  }
}
