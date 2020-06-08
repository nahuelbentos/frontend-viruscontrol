import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { AutenticacionService } from './autenticacion.service';
import { Ciudadano } from '@shared/model/Ciudadano';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {
  baseUrl = `${environment.url_backend}/medico`;
  constructor(private http: HttpClient, private autenticacionService: AutenticacionService) { }

  public getVisitasPendientes() {
    console.log('this.autenticacionService.user.email', this.autenticacionService.user);


    // let headers = new Headers({ 'Content-Type': 'application/json' });
    // headers.append('Authorization', 'Bearer ');
    // let options = new RequestOptions({ headers: headers });

    return this.http.get(`${environment.url_backend}/medico/${this.autenticacionService.user.username}/visita_pendiente/all`);
  }

  public getEnfermedades(){
    return this.http.get(`${this.baseUrl}/enfermedadesaprobadas`);
  }
  public confirmarVisitaPendiente(idVisita: number) {
    return this.http.put(`${environment.url_backend}/medico/${this.autenticacionService.user.username}/visita_pendiente/${idVisita}`,{});
  }

  public getExamenes(id: number){
    return this.http.get(`${this.baseUrl}/examenesenfermedades/${id}`);
  }

  public getCiudadanosDeMedico(){ // TODO: Darle el id del medico cuando cambie el ws
    return this.http.get(`${this.baseUrl}/ciudadanos`);
  }

  public getProveedoresDeExamenesById(id: number){
    console.log('getproveedoresexamenes');
    return this.http.get(`${this.baseUrl}/proveedoresexamen/${id}`);
  }

  public getProveedoresDeExamenes(){
    console.log('getproveedoresexamenes');
    return this.http.get(`${this.baseUrl}/proveedoresexamen`);
  }

  public getDepartamentos(){
    return this.http.get(`${this.baseUrl}/departamentos`);
  }

  public solicitarExamen(solicitarExamen: RequestSolicitarExamen){
    console.log(solicitarExamen);
    return this.http.post(`${this.baseUrl}/nuevocaso`, solicitarExamen);

  }




}



export interface RequestSolicitarExamen {
  idDepartamento: number;
  idExamen: number;
  idEnfermedad: number;
  idPaciente: number;
  idMedico: number;
  idProveedorExamen: number;
}
