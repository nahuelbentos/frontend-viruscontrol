import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { AutenticacionService } from './autenticacion.service';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  baseUrl = `${environment.url_backend}/medico`;
  constructor(private http: HttpClient, private autenticacionService: AutenticacionService) { }

  public getVisitasPendientes() {
    console.log('this.autenticacionService.user.email', this.autenticacionService.user);



    return this.http.get(`${environment.url_backend}/medico/${this.autenticacionService.user.username}/visita_pendiente/all`);
  }

  public getEnfermedades(){
    return this.http.get(`${this.baseUrl}/enfermedadesaprobadas`);
  }

  public getExamenes(id: number){
    return this.http.get(`${this.baseUrl}/examenesenfermedades/${id}`);
  }

  public getCiudadanosDeMedico(){ // TODO: Darle el id del medico cuando cambie el ws
    return this.http.get(`${this.baseUrl}/ciudadanos`);
  }

  public getProveedoresDeExamenes(id: number){
    console.log('getproveedoresexamenes');
    return this.http.get(`${this.baseUrl}/proveedoresexamen/${id}`);
  }

  public getDepartamentos(){
    return this.http.get(`${this.baseUrl}/departamentos`);
  }

  public solicitarExamen(solicitarExamen: RequestSolicitarExamen){

    return this.http.post(`${this.baseUrl}/nuevocaso`, solicitarExamen);
    // http://localhost:8080/viruscontrol-web/rest/medico/nuevocaso
  }



}



export interface RequestSolicitarExamen {
  idDepartamento: number;
  idExamen: number;
  idEnfermedad: number;
  idPaciente: number;
  idMedico: number;
}
