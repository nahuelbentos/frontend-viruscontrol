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


    // let headers = new Headers({ 'Content-Type': 'application/json' });
    // headers.append('Authorization', 'Bearer ');
    // let options = new RequestOptions({ headers: headers });

    return this.http.get(`${environment.url_backend}/medico/${this.autenticacionService.user.username}/visita_pendiente/all`);
  }


  public getExamenes(){
    
    return this.http.get(`${this.baseUrl}/examenesenfermedad/100`);
  }

  public getCiudadanosDeMedico(){ // TODO: Darle el id del medico cuando cambie el ws
    return this.http.get(`${this.baseUrl}/ciudadanos`);
  }

  public getProveedoresDeExamenes(id: number){
    console.log('getproveedoresexamenes');
    return this.http.get(`${this.baseUrl}/proveedoresexamen/${id}`);
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
