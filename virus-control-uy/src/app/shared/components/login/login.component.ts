import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { AuthService, FacebookLoginProvider, SocialUser } from 'angularx-social-login';
import { AutenticacionService } from '../../services/autenticacion.service';
import { Router, NavigationExtras } from '@angular/router';
import { Usuario } from '@shared/model/Usuario';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuxiliaresService } from '@shared/services/auxiliares.service';
import { Country } from '@shared/model/Country';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewInit {
  applicationId: string;
  user: SocialUser;
  loggedIn: boolean;
  loginForm: FormGroup;

  showSppiner = false;
  tipoUsuarioSelected: string; // { value: string, description: string };
  tipoUsuarios = [{
    value: 'ciudadano',
    description: 'Ciudadano'
  }, {
    value: 'medico',
    description: 'Médico'
  }];

  constructor(
    private autenticacionService: AutenticacionService,
    private router: Router,
    private fb: FormBuilder,
    private auxiliaresService: AuxiliaresService
  ) {

  }

  ngOnInit(): void {

    this.loginForm = this.fb.group({
      selectTipoUsuario: [null, [Validators.required]],
    });

    this.autenticacionService.authStateFB()
      .subscribe((user) => {
        this.user = user;
        this.loggedIn = (user != null);
        console.log('usuario: ', this.user);
      });


  }


  get selectTipoUsuarioField() {
    return this.loginForm.get('selectTipoUsuario');
  }

  ngAfterViewInit() {
  }

  loginWithFB() {
    if (this.loginForm.invalid) {
      return;
    }
    this.showSppiner = true;
    this.autenticacionService.loginWithFB()
      .then(res => {
        console.log('res login: ', res);

        this.loginBackend(res);
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
    if (this.loginForm.invalid) {
      return;
    }

    this.showSppiner = true;
    this.autenticacionService.loginWithGoogle()
      .then(res => {
        console.log('res login: ', res);
        // this.user = this.autenticacionService.user;
        // this.loggedIn = this.autenticacionService.loggedIn;

        this.loginBackend(res);

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

  loginBackend(response: SocialUser) {
    const usuario: Usuario = {
      nombre: response.firstName,
      apellido: response.lastName,
      correo: response.email,
      username: response.email
    };

    this.autenticacionService.loginBackend(usuario, this.tipoUsuarioSelected).subscribe((res: any) => {
      console.log('res backend: ', res);

      localStorage.setItem('loggedIn', 'true');
      localStorage.setItem('tipoUsuario', this.tipoUsuarioSelected);
      this.autenticacionService.setloggedIn(true);
      this.setUser(response, this.autenticacionService.getLoggedIn());
      this.autenticacionService.setUser(res.usuario);
      // si el usuario es ciudadano y es primer ingreso => voy al perfil
      if (this.tipoUsuarioSelected === 'ciudadano' && res.response === 'PRIMERINGRESO') {
        this.getPaises(res.usuario, res.response);
      } else {
        this.goHome(this.tipoUsuarioSelected, res.usuario);

      }

    });
  }

  goHome(modulo: string, usuario: any, perfil?: string) {
    console.log('Perfil: ', perfil);
    const url = (perfil) ? `/${modulo}/perfil` : `/${modulo}/home`;
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
    console.log('1 getPaises: ');
    this.auxiliaresService.getCountries()
      .subscribe((res: Country[]) => {
        console.log('Res paises: ', res);

        // const reformattedArray 
        const paises = res.map(obj => {
          const rObj = {};

          // tslint:disable-next-line: no-string-literal
          rObj['nombre'] = obj.name;
          return obj.name;
        });

        console.log('Res paises: ', paises);

        localStorage.setItem('paises', JSON.stringify(paises));
        this.goHome(this.tipoUsuarioSelected, usuario, response);

      });
  }

}
