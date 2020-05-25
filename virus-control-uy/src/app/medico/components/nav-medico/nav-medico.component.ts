import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AutenticacionService } from '@shared/services/autenticacion.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-medico',
  templateUrl: './nav-medico.component.html',
  styleUrls: ['./nav-medico.component.scss']
})
export class NavMedicoComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private autenticacionService: AutenticacionService,
    private router: Router) { }


  logout() {
    this.autenticacionService.logoutBackend()
      .subscribe(res => {
        console.log('res logutbackend: ', res);
        this.autenticacionService.logout().then(response => {
          console.log('response: ', response);
          this.autenticacionService.setUser(null);
          this.router.navigate(['/home']);

        })
          .catch(reject => {
            console.log('reject logut: ', reject);
          });
      });
  }

}
