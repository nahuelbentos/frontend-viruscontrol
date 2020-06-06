import { Enfermedad } from './Enfermedad';

export interface MapaInteractivo {
  ultimaActualizacion: Date;
  mapa: Mapa[];
}

export interface Mapa {
  nombre: string;
  enfermedades: Enfermedad[];
}
