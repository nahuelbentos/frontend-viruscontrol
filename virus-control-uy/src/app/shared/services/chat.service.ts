import { Injectable } from '@angular/core';
import { Usuario } from '@shared/model/Usuario';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Chat } from '@shared/model/chat/chat.model';
import { Conversacion } from '@shared/model/chat/conversacion.model';
import { map } from 'rxjs/operators';
import { Mensaje } from '@shared/model/chat/mensaje.model';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  public usuarios: Observable<Usuario[]>;

  public mensajes: Array<any> = []; // mensajes array/
  temp: any; // for handling temporory data from observables.
  showMensajes = false; // Toggle to select a conversation.
  mensaje = ''; // the  message to be sent

  private mensajesCollection: AngularFirestoreCollection<Mensaje>;

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

  // Ciudadano
  createCiudadano(usuario: Usuario) {
    return this.firestore.doc('ciudadanos/' + usuario.username).set(usuario);
  }

  updateCiudadano(usuario: Usuario) {
    return this.firestore
      .doc<Usuario>('ciudadanos/' + usuario.username)
      .update(usuario);
  }

  getCiudadanos() {
    return this.firestore.collection('ciudadanos').snapshotChanges();
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

  setCurrentConversacion(conversacion: Conversacion) {
    this.conversacion = conversacion;
  }

  getConversaciones() {
    return this.firestore.collection('conversacion').get();
  }

  enviarMensaje(mensajes) {
    console.log('idconversacion: ', this.conversacion);
    console.log('idconversacion: ', this.conversacion.idConversacion);

    return this.firestore
      .doc('conversacion/' + this.conversacion.idConversacion)
      .update({ mensajes });
  }

  // Mensajes

  cargarMensajes() {
    return this.firestore
      .doc<Conversacion>('conversacion/' + this.conversacion.idConversacion)
      .valueChanges();
  }

  // cargarMensajes() {
  //   this.mensajesCollection = this.firestore.collection<Mensaje>('chats', (ref) =>
  //     ref.orderBy('fecha', 'desc').limit(5)
  //   );

  //   return this.itemsCollection.valueChanges().map((mensajes: Mensaje[]) => {
  //     console.log(mensajes);

  //     this.chats = [];

  //     for (let mensaje of mensajes) {
  //       this.chats.unshift(mensaje);
  //     }

  //     return this.chats;
  //   });
  // }
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
