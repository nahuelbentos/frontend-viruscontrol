import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AutenticacionService } from '@shared/services/autenticacion.service';
import { Router } from '@angular/router';
import { MedicoService } from '@shared/services/medico.service';
import { AuxiliaresService } from '@shared/services/auxiliares.service';
import { Ciudadano } from '@shared/model/Ciudadano';

@Component({
  selector: 'app-nav-medico',
  templateUrl: './nav-medico.component.html',
  styleUrls: ['./nav-medico.component.scss'],
})
export class NavMedicoComponent implements OnInit {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(['(max-width: 1325px)'])
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private autenticacionService: AutenticacionService,
    private router: Router,
    private medicoService: MedicoService,
    private auxiliarService: AuxiliaresService
  ) {}

  ngOnInit(): void {
    this.breakpointObserver
      .observe(['(max-width: 1200px)'])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          
          console.log('state ::::: ', state);
        } else {
          
          console.log('else state ::::: ', state);
        }
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

  getUsuariosCoordenadas() {
    this.medicoService
      .getVisitasPendientes()
      .subscribe((ciudadanos: Ciudadano[]) => {
        console.log('1) ciudadanos: ', ciudadanos);
        ciudadanos.forEach((ciudadano) => {
          // ciudadano.coords = this.getCoordenadas(ciudadano);
          const direccion = ciudadano.direccion.replace(' ', '+');
          const direccionTotal = direccion + ',+Montevideo';
          console.log('direccionTotal', direccionTotal);
          this.auxiliarService
            .getCoordenadas(direccionTotal)
            .subscribe((res: any) => {
              console.log('getCoordenadas', res);
              ciudadano.coords = {
                lat: res.results[0].geometry.location.lat,
                lng: res.results[0].geometry.location.lng,
              };
              localStorage.setItem(
                'usuariosCoordenadas',
                JSON.stringify(ciudadanos)
              );
            });
        });
        console.log('2) ciudadanos: ', ciudadanos);
        // this.dataSource = new MatTableDataSource(ciudadanos);

        // localStorage.setItem('usuariosCoordenadas', JSON.stringify(ciudadanos));
        this.router.navigate(['medico/listar-visitas']);
      });
  }
}
