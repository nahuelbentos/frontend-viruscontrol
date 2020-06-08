import { TipoRecurso } from './TipoRecurso';

export interface Recurso{
    id?: number;
    nombre?: string;
    tipoRecurso?: TipoRecurso;
    tipoRecursoNombre?: string;
    direccion?: string;
    barrio?: string;
    ciudad?: string;
    enfermedades?: string[];
}

/*

recurso{
  	nombre: string;
  	tipoRecursoNombre: string
 	direccion?: string;
  	barrio?:string;
  	ciudad?: string;
  	enfermedeades: string[];
}
*/