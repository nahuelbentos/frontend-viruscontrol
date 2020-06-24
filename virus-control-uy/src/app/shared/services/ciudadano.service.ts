import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AutenticacionService } from './autenticacion.service';

@Injectable({
  providedIn: 'root',
})
export class CiudadanoService {
  baseUrl = `${environment.url_backend}/ciudadano`;

  constructor(
    private http: HttpClient,
    private autenticacionService: AutenticacionService
  ) {}

  public getResultadosExamenes() {
    return this.http.get(
      `${this.baseUrl}/obtenerexamenes/${this.autenticacionService.user.idUsuario}`
    );
  }

  public getBarrios() {
    return this.http.get(`${this.baseUrl}/obtenerBarrios`);
  }

  public getRecursosDeBarrio(barrio: string) {
    return this.http.get(
      `${environment.url_backend}/recursos/disponibles/ciudad/-/barrio/${barrio}`
    );
  }

  public postSuscripcionRecurso(
    suscripcionRecurso: RequestSuscripcionRecursos
  ) {
    console.log(suscripcionRecurso);
    return this.http.post(
      `${this.baseUrl}/suscribirseARecurso`,
      suscripcionRecurso
    );
  }

  public getPDF(idCaso) {

    const headers = new HttpHeaders();
    // headers.set('Content-Type', 'application/pdf;');
    headers.set('Aceppt', 'application/pdf;');
    // headers.set('Content-Disposition', 'attachment;');
    /*
    , {
      headers: headers,
      responseType: 'blob' as 'json',
    }
    */
    return this.http.get(`${this.baseUrl}/resultado/pdf/${idCaso}`, {
      headers,
      responseType: 'blob' as 'json',
    });
  }
}


export interface RequestSuscripcionRecursos {
  barrio: string;
  recurso: number;
}
