import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { AutenticacionService } from './autenticacion.service';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  constructor(private http: HttpClient, private autenticacionService: AutenticacionService) { }

  public getVisitasPendientes() {
    console.log('this.autenticacionService.user.email', this.autenticacionService.user);



    return this.http.get(`${environment.url_backend}/medico/${this.autenticacionService.user.username}/visita_pendiente/all`);
  }

}
