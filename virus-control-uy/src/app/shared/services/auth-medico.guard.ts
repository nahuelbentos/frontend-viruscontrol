import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AutenticacionService } from './autenticacion.service';

@Injectable({
  providedIn: 'root',
})
export class AuthMedicoGuard implements CanActivate {
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
    console.log('guard-medico loggedIn: ', loggedIn);
    console.log('guard-medico tipo: ', tipo);
    console.log('guard-medico loggedIn && tipo === medico: ', loggedIn && tipo === 'medico');

    if (!(loggedIn && tipo === 'medico')) {
      this.router.navigate(['/login']);
    }
    return loggedIn && tipo === 'medico';
  }
}
