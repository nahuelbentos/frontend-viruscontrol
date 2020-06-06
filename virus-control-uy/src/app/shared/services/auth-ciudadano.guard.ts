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

@Injectable({
  providedIn: 'root',
})
export class AuthCiudadanoGuard implements CanActivate {
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
    const tipo = localStorage.getItem('tipoUsuario');
    console.log('guard-ciudadano loggedIn: ', loggedIn);
    console.log('guard-ciudadano tipo: ', tipo);
    console.log(
      'guard-ciudadano loggedIn && tipo === ciudadano: ',
      loggedIn && tipo === 'ciudadano'
    );

    if (!(loggedIn && tipo === 'ciudadano')) {
      this.router.navigate(['/login']);
    }
    return loggedIn && tipo === 'ciudadano';
  }
}
