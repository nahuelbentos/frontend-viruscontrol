import { Injectable } from '@angular/core';
import {
  AuthService,
  FacebookLoginProvider,
  SocialUser,
  GoogleLoginProvider,
} from 'angularx-social-login';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { Usuario } from '@shared/model/Usuario';

@Injectable({
  providedIn: 'root',
})
export class AutenticacionService {
  user: Usuario;
  private loggedIn: boolean;
  baseUrl = `${environment.url_backend}/autenticacion`;
  constructor(private authService: AuthService, private http: HttpClient) {
    // esto es temporal
    const aux: Usuario = JSON.parse(localStorage.getItem('usuarioLogueado'));
    if (aux !== null) {
      this.user = aux;
    }
  }

  loginWithFB() {
    return this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  loginWithGoogle() {
    return this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  logout() {
    this.clearStorage();
    return this.authService.signOut();
  }

  authStateFB(): Observable<SocialUser> {
    return this.authService.authState;
  }

  estaLogueadoBackend(username: string){
    return this.http.get(`${this.baseUrl}/esta-logueado/${username}`);
  }
  logoutBackend() {
    return this.http.delete(`${this.baseUrl}/salir/`);
  }

  loginBackend(usuario: Usuario, tipo: string) {
    const url = `${this.baseUrl}/entrar/${tipo}`;
    console.log('url: ', url);
    return this.http.post(url, usuario);
  }

  validaDatos(usuario: Usuario) {
    return this.http.put(`${this.baseUrl}/validar_datos`, usuario);
  }

  setUser(user: Usuario) {
    console.log('seteo el usuario: ', user);

    this.user = user;
  }

  getLoggedIn() {
    return this.loggedIn;
  }

  setloggedIn(loggedIn: boolean) {    
    localStorage.setItem('loggedIn', JSON.stringify(loggedIn));
    this.loggedIn = loggedIn;
  }

  clearStorage() {
    localStorage.removeItem('usuario');
    localStorage.removeItem('uid');
    localStorage.removeItem('usuarioId');
    localStorage.removeItem('usuarioLogueado');
    localStorage.removeItem('tipoUsuario');
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('paises');

  }
}
