import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuxiliaresService {
  googleMapsKey = `${environment.googleMapsKey}`;
  constructor(private http: HttpClient) { }


  getCountries() {
    return this.http.get('https://restcountries.eu/rest/v2/all?fields=name;capital;currencies;alpha2Code;alpha3Code;demonym');
  }

  public getCoordenadas(direccion: string){
    return this.http.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${direccion}&key=${this.googleMapsKey}`);
  }
}

