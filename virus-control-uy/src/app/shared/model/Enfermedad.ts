import { Caso } from './caso.model';

export interface Enfermedad {
  id?: number;
  nombre?: string;
  casos?: Caso[];
  nombreEnfermedad?: string;
}
