import { Injectable } from '@angular/core';
import { AuthService, FacebookLoginProvider, SocialUser, GoogleLoginProvider } from 'angularx-social-login';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {

  user: SocialUser;
  loggedIn: boolean;
  constructor(private authService: AuthService) { }

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
}
