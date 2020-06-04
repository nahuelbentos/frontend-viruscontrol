// export class Marcador {

import { Enfermedad } from './Enfermedad';

//     constructor( public lat: number, public lng: number ) { }

// }

export class Marcador {
  public lat: number;
  public lng: number;

  public titulo = 'Sin Título';
  public desc = 'Sin Descripción';

  public enfermedades: Enfermedad[] = [];
  

  constructor(titulo: string, lat: number, lng: number, enferemedades?: Enfermedad[]) {
    this.lat = lat;
    this.lng = lng;
    this.titulo = titulo;
    this.enfermedades = enferemedades;
  }
}
