import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuxiliaresService {

  constructor(private http: HttpClient) { }


  getCountries() {
    return this.http.get('https://restcountries.eu/rest/v2/all?fields=name;capital;currencies;alpha2Code;alpha3Code;demonym');
  }
}
