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

  public getVisitasPendientes(){
    console.log('this.autenticacionService.user.email', this.autenticacionService.user);



    return this.http.get(`${environment.url_backend}/medico/rodrigo.lame96@gmail.com/visita_pendiente/all`);
  }

  public getExamenes(){
    return this.http.get(`${this.baseUrl}/examenesenfermedad/100`);
  }

  public getCiudadanosDeMedico(){ // TODO: Darle el id del medico cuando cambie el ws
    return this.http.get(`${this.baseUrl}/ciudadanos`);
  }

  public getProveedoresDeExamenes(id: number){
    return this.http.get(`${this.baseUrl}/proveedoresexamen/${id}`);
  }



}
