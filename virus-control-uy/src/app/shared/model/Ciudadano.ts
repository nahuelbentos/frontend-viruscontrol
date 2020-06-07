import { Sintoma } from './Sintoma';

export interface Ciudadano{
    id: number;
    nombre: string;
    apellido: string;
    direccion: string;
    fecha: Date;
    sintomas?: Sintoma[];
    }
