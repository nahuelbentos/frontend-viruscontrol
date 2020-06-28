import { Injectable } from '@angular/core';
import { Usuario } from '@shared/model/Usuario';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { Observable, merge } from 'rxjs';

import { Chat } from '@shared/model/chat/chat.model';
import { Conversacion } from '@shared/model/chat/conversacion.model';
import { map } from 'rxjs/operators';
import { Mensaje } from '@shared/model/chat/mensaje.model';
import { firestore } from 'firebase';

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

  getChatsCiudadanos() {
    return this.firestore.collection('chat').snapshotChanges();
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
    this.setMensajeLeido(
      this.conversacion.idConversacion,
      this.conversacion.mensajes
    ).then((res) => console.log('setMensajeLeido, res: ', res));
    return this.firestore
      .doc<Conversacion>('conversacion/' + this.conversacion.idConversacion)
      .valueChanges();
  }

  setMensajeLeido(idConversacion: string, mensajes) {
    console.log('1)setMensaje leido, mensajes:  ', mensajes);

    if (mensajes.length > 0) {
      const index = mensajes.length - 1;
      mensajes[index].mensajeReceptorVisto = true;
    }
    console.log('2)setMensaje leido, mensajes:  ', mensajes);

    // Seteo todos los mensajes devuelta, con el mensaje leido porque arme mal la estructura en firebase
    return this.firestore
      .doc('conversacion/' + idConversacion)
      .update({ mensajes });
  }

  getChatPorUsuario(usuario: Usuario, usuarioEmisor: Usuario) {
    // const query1 = this.firestore.collection('chat', ref => ref.where('usuarioEmisor', '==', usuario.correo)).valueChanges();
    return this.firestore
      .collection(
        'chat',
        (ref) => ref.where('usuarioReceptor', '==', usuario.correo)
        .where('usuarioEmisor', '==', usuarioEmisor.correo)
      )
      .snapshotChanges();
  }

  getChatPorUsuarioEmisor(usuario: Usuario, usuarioEmisor: Usuario) {
    // const query1 = this.firestore.collection('chat', ref => ref.where('usuarioEmisor', '==', usuario.correo)).valueChanges();
    return this.firestore
      .collection('chat', (ref) =>
        ref
          .where('usuarioEmisor', '==', usuario.correo)
          .where('usuarioReceptor', '==', usuarioEmisor.correo)
      )
      .snapshotChanges();
  }

  getConversacionPorChat(idChat) {
    return this.firestore
      .collection('conversacion', (ref) => ref.where('idChat', '==', idChat))
      .snapshotChanges();
  }
}
