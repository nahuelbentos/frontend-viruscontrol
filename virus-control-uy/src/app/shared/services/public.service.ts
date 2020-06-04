import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PublicService {
  baseUrl = `${environment.url_backend}/home`;
  
  constructor(
    private http: HttpClient
  ) {}

  getMapaInteractivo() {
    return this.http.get(`${this.baseUrl}/mapa-interactivo`);
  }


}
