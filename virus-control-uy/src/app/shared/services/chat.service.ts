import { Injectable } from '@angular/core';
import { Usuario } from '@shared/model/Usuario';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Chat } from '@shared/model/chat/chat.model';
import { Conversacion } from '@shared/model/chat/conversacion.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  public usuarios: Observable<Usuario[]>;

  public mensajes: Array<any> = []; // mensajes array/
  temp: any; // for handling temporory data from observables.
  showMensajes = false; // Toggle to select a conversation.
  mensaje = ''; // the  message to be sent

  public messages = [];

  public conversacion: Conversacion = {
    idChat: '',
    mensajes: [],
  };  

  conversationId;

  constructor(private firestore: AngularFirestore) {}

  createId() {
    return this.firestore.createId();
  }
  // Usuarios
  createUsuario(usuario: Usuario) {
    return this.firestore.doc('usuarios/' + usuario.username).set(usuario);
  }

  updateUsuario(usuario: Usuario) {
    return this.firestore
      .doc<Usuario>('usuarios/' + usuario.username)
      .update(usuario);
  }

  getUsuarios() {
    return this.firestore.collection('usuarios').snapshotChanges();
  }

  // Chat
  createChat(chat: Chat) {
    return this.firestore.collection('chat').add(chat);
  }

  getChats() {
    return this.firestore.collection('chat').get();
    // return this.firestore.doc('chat').ref() collection('chat', (ref) => ref
    //     .where('usuarioEmisor', '==', usuarioEmisor)
    //     .where('usuarioRecptor', '==', usuarioReceptor)).valueChanges();
  }

  // Conversacion
  createConversacion(conversacion: Conversacion) {
    return this.firestore.collection('conversacion').add(conversacion);
  }

  setCurrentConversacion(conversacion: Conversacion){
    this.conversacion = conversacion;
  }

  getConversaciones() {
    return this.firestore.collection('conversacion').get();
  }

  enviarMensaje( mensajes ) {
    console.log('idconversacion: ', this.conversacion);
    console.log('idconversacion: ', this.conversacion.idConversacion);
    
    return this.firestore.doc('conversacion/' + this.conversacion.idConversacion).update({ mensajes });
  }

  // Mensajes

  cargarMensajes(){
    return this.firestore.doc('conversacion/' + this.conversacion.idConversacion).valueChanges();
  }
  // getConversacion(usuarioEmisor: string, usuarioReceptor: string) {
  //   return this.firestore.collection('chat', (ref) =>
  //     ref
  //       .where('usuarioEmisor', '==', usuarioEmisor)
  //       .where('usuarioRecptor', '==', usuarioReceptor)
  //   );
  // }

  // Usuarios
  // createUsuario(usuario: Usuario) {
  //   this.firestore.collection('usuarios').add(usuario);
  // }

  // getUsuarios() {
  //   this.usuarios = this.firestore
  //     .collection<Usuario>('usuarios')
  //     .valueChanges();
  // }

  // updateUsuario(usuario: Usuario) {
  //   this.firestore.doc<Usuario>('usuarios/' + usuario.username).update(usuario);
  // }
}
