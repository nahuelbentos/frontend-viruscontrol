import { Injectable } from '@angular/core';
import { AuthService, FacebookLoginProvider, SocialUser } from 'angularx-social-login';
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

  logoutWithFB() {
    return this.authService.signOut();

  }

  authStateFB(): Observable<SocialUser> {
    return this.authService.authState;
  }
}
