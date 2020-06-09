import { Mensaje } from './mensaje.model';

export interface Conversacion{
  idConversacion?: string;
  idChat: string;
  mensajes: Mensaje[];
}
