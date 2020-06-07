import { TipoRecurso } from './TipoRecurso';

export interface Recurso{
    id: number;
    nombre: string;
    tipoRecurso: TipoRecurso;
    enfermedades: string[];
}
