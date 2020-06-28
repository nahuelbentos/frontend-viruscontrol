export interface Mensaje {
  usuarioEmisor: string;
  emisorNombre: string;
  usuarioReceptor: string;
  contenido: string;
  timestamp?: Date;
  mensajeVistoEmisor?: boolean;
  mensajeReceptorVisto?: boolean;
}
