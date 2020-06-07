import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { AutenticacionService } from './autenticacion.service';

@Injectable({
  providedIn: 'root'
})
export class CiudadanoService {
  baseUrl = `${environment.url_backend}/medico`;
  constructor(private http: HttpClient, private autenticacionService: AutenticacionService) { }


}
