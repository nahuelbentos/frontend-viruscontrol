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
}
