import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AutenticacionService } from '@shared/services/autenticacion.service';
import { Router } from '@angular/router';
import { AuxiliaresService } from '@shared/services/auxiliares.service';
import { Country } from '@shared/model/Country';

@Component({
  selector: 'app-nav-ciudadano',
  templateUrl: './nav-ciudadano.component.html',
  styleUrls: ['./nav-ciudadano.component.scss'],
})
export class NavCiudadanoComponent {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(['(max-width: 1325px)'])
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private autenticacionService: AutenticacionService,
    private auxiliaresService: AuxiliaresService,
    private router: Router
  ) {}

  goPerfil() {
    this.auxiliaresService.getCountries().subscribe((res: Country[]) => {
      console.log('Res paises: ', res);

      // const reformattedArray
      const paises = res.map((obj) => {
        const rObj = {};

        // tslint:disable-next-line: no-string-literal
        rObj['nombre'] = obj.name;
        return obj.name;
      });

      console.log('Res paises: ', paises);

      localStorage.setItem('paises', JSON.stringify(paises));
      this.router.navigate(['/ciudadano/perfil']);
    });
  }
  test() {
    this.autenticacionService
      .authStateFB()
      .subscribe((res) => console.log('res: ', res));
  }
  test2() {
    this.autenticacionService.logout().then((res) => {
      console.log('res: ', res);
    });
  }
  logout() {
    this.autenticacionService.logoutBackend().subscribe((res) => {
      console.log('res logutbackend: ', res);
      this.autenticacionService
        .logout()
        .then((response) => {
          console.log('response: ', response);
          this.autenticacionService.setUser(null);
          this.autenticacionService.setloggedIn(false);
          localStorage.setItem('loggedIn', 'false');
          this.router.navigate(['/home']);
        })
        .catch((reject) => {
          console.log('reject logut: ', reject);
          this.router.navigate(['/home']);
        });
    });
  }
}
