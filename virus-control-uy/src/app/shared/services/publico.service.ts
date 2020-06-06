import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AutenticacionService } from './autenticacion.service';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PublicoService {

  constructor(private http: HttpClient, private autenticacionService: AutenticacionService) { }

  public getRecursos(){
    return this.http.get(`${environment.url_backend}/recursos/obtenerRecursos`);
  }
}
