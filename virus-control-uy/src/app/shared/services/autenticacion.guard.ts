import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AutenticacionService } from './autenticacion.service';
import { tap, map } from 'rxjs/operators';
import { SocialUser } from 'angularx-social-login';

@Injectable({
  providedIn: 'root',
})
export class AutenticacionGuard implements CanActivate {
  constructor(
    private autenticacionService: AutenticacionService,
    private router: Router
  ) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const loggedIn = JSON.parse(localStorage.getItem('loggedIn'));
    console.log('guard loggedIn: ', loggedIn);
    
    if (!loggedIn) {
      this.router.navigate(['/login']);
    }
    return loggedIn;
    /*
    this.autenticacionService.authStateFB().pipe(
      map((user) => {
        console.log('guard user: ', user);
        return user !== null;
      }),
      tap((existeUsuario) => {
        console.log('guard existeusuario: ', existeUsuario);
        
        if (!existeUsuario) {
          this.router.navigate(['/login']);
        }
      })
    );
      */
    /*
    console.log('guard, logueado: ', this.autenticacionService.authStateFB() .getLoggedIn());
    if (!this.autenticacionService.getLoggedIn()) {
      this.router.navigate(['/login']);
    }
    return this.autenticacionService.getLoggedIn();
    */
  }
}
