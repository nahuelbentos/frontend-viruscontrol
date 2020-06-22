import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuxiliaresService {

  constructor(private http: HttpClient, private firestore: AngularFirestore) { }


  getCountries() {
    return this.http.get('https://restcountries.eu/rest/v2/all?fields=name;capital;currencies;alpha2Code;alpha3Code;demonym');
  }

  guardarDonacion(monto){
    const donacion = {
      'donacion': monto
    };

    this.firestore.collection("Donaciones").add(donacion);

  }

  getDonaciones(){
    return this.firestore.collection('Donaciones').snapshotChanges();
  }

  getTotalDonacion(){
    return this.firestore.doc('totalDonacion').get();
  }

  setTotalDonacion(monto){
    const donacion = {
      'donacion': monto
    };

    this.firestore.doc('totalDonacion').update(donacion);
  }

}
