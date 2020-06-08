import { Recurso } from './Recurso';

export interface ProveedorRecursos{
    id?: number;
    nombre?: string;
    direccion?: string;
    barrio?: string;
    ciudad?: string;
    rangoHorario?: any;
    deleted?: boolean;
    codigoPeriferico?: string;
}