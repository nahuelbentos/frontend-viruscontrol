import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { HttpClient } from '@angular/common/http';
import { AutenticacionService } from './autenticacion.service';

@Injectable({
  providedIn: 'root'
})
export class CiudadanoService {
  baseUrl = `${environment.url_backend}/ciudadano`;

  constructor(private http: HttpClient, private autenticacionService: AutenticacionService) {}

  public getResultadosExamenes() {
    return this.http.get(`${this.baseUrl}/obtenerexamenes/${this.autenticacionService.user.idUsuario}`);
  }

  public getBarrios() {
    return this.http.get(`${environment.url_backend}/home/barrios`);
  }

  public getTipoRecursos() {
    return this.http.get(`${environment.url_backend}/home/tipo-recursos`);
  }

  public postSuscripcionRecurso(suscripcionRecurso: RequestSuscripcionRecursos) {
    console.log(suscripcionRecurso);
    return this.http.post(`${this.baseUrl}/suscribirseARecurso`, suscripcionRecurso);
  }
}


export interface RequestSuscripcionRecursos {
  ciudadanoId: number;
  barrio: string;
  recurso: string;
}
