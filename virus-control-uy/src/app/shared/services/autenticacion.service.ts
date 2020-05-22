import { Injectable } from '@angular/core';
import { AuthService, FacebookLoginProvider, SocialUser, GoogleLoginProvider } from 'angularx-social-login';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { Usuario } from '@shared/model/Usuario';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {

  user: SocialUser;
  loggedIn: boolean;
  baseUrl = `${environment.url_backend}/autenticacion`;
  constructor(private authService: AuthService, private http: HttpClient) { }

  loginWithFB() {
    return this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);

  }

  loginWithGoogle() {
    return this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  logout() {
    return this.authService.signOut();

  }

  authStateFB(): Observable<SocialUser> {
    return this.authService.authState;
  }


  loginBackend(usuario: Usuario, tipo: string) {
    const url = `${this.baseUrl}/entrar/${tipo}`;
    console.log('url: ', url);
    return this.http.post(url, usuario);
  }

  validaDatos(usuario: Usuario) {
    return this.http.put(`${this.baseUrl}/validaDatos`, usuario);
  }
}

