import { Component, OnInit } from '@angular/core';
import { ChatService } from '@shared/services/chat.service';
import { Usuario } from '@shared/model/Usuario';
import { AutenticacionService } from '@shared/services/autenticacion.service';
import { Chat } from '@shared/model/chat/chat.model';
import { JsonPipe } from '@angular/common';
import { Conversacion } from '@shared/model/chat/conversacion.model';
import { AngularFirestoreCollection } from '@angular/fire/firestore/public_api';
import { Mensaje } from '@shared/model/chat/mensaje.model';

@Component({
  selector: 'app-sala-chat',
  templateUrl: './sala-chat.component.html',
  styleUrls: ['./sala-chat.component.scss'],
})
export class SalaChatComponent implements OnInit {
  currentUser: Usuario;
  usuarios: Usuario[] = [];

  showMensajes = false; // Toggle to select a conversation.
  public mensajes: Array<any> = []; // messages array/
  mensaje = ''; // the  message to be sent

  constructor(
    private chatService: ChatService,
    private autenticacionService: AutenticacionService
  ) {}

  ngOnInit(): void {
    this.chatService.getUsuarios().subscribe((data) => {
      const usersFirebase: any = data.map((e) => {
        console.log('data: ', e.payload.doc.data());
        return e.payload.doc.data();
      });

      const temp = usersFirebase.filter(
        (usuario) =>
          usuario.username !== this.autenticacionService.user.username
      );

      for (const user of temp) {
        const usuario: Usuario = {
          nombre: user.nombre,
          apellido: user.apellido,
          correo: user.correo,
          username: user.username,
          idUsuario: user.idUsuario,
        };
        this.usuarios.push(usuario);
      }
      console.log('this.usuarios: ', this.usuarios);
    });

    this.currentUser = this.autenticacionService.user;
  }

  seleccionarUsuario(usuario: Usuario) {
    console.log(usuario);
    const chat: Chat = {
      // idChat: this.chatService.createId(),
      usuarioEmisor: this.currentUser.username,
      usuarioReceptor: usuario.username,
    };

    const chatReceptor: Chat = {
      // idChat: this.chatService.createId(),
      usuarioReceptor: this.currentUser.username,
      usuarioEmisor: usuario.username,
    };

    this.chatService.getChats().subscribe((querySnapshot) => {
      console.log('querySnapshot: ', querySnapshot);
      let chatCurrent: Chat;

      querySnapshot.forEach((doc) => {
        // Chat del currentUser
        if (
          doc.data().usuarioReceptor === usuario.username &&
          doc.data().usuarioEmisor === this.currentUser.username
        ) {
          chatCurrent = {
            idChat: doc.id, // data().idChat,
            usuarioEmisor: doc.data().usuarioEmisor,
            usuarioReceptor: doc.data().usuarioReceptor,
          };
          console.log('1) chat: ', chatCurrent);
          return;
        } else {
          // Chat donde el currentUser es receptor
          if (
            doc.data().usuarioEmisor === usuario.username &&
            doc.data().usuarioReceptor === this.currentUser.username
          ) {
            chatCurrent = {
              idChat: doc.id, // data().idChat,
              usuarioEmisor: doc.data().usuarioEmisor,
              usuarioReceptor: doc.data().usuarioReceptor,
            };
            console.log('2) chat: ', chatCurrent);
            return;
          }
          console.log('3) chat: ', chatCurrent);
          // const usuario: Usuario = doc.data().usuarioReceptor;
          console.log(
            'doc.data().usuarioReceptor: ',
            doc.data().usuarioReceptor
          );
          console.log('doc.data().usuarioEmisor: ', doc.data().usuarioEmisor);
        }

        // console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
      });
      console.log('chatCurrent: ', chatCurrent);

      if (!chatCurrent) {
        this.chatService.createChat(chat).then((ref) => {
          console.log('create chat ref: ', ref);
          const conversacion: Conversacion = {
            idChat: ref.id,
            mensajes: [],
          };

          this.chatService.createConversacion(conversacion).then((refConv) => {
            console.log('create conversacion ref: ', refConv);
            const conv: Conversacion = {
              idChat: conversacion.idChat,
              mensajes: [],
              idConversacion: refConv.id,
            };
            console.log('seteo la conv');
            this.chatService.setCurrentConversacion(conv);

            this.chatService.cargarMensajes().subscribe((data) => {
              console.log('data>? ', data);
              console.log('mensajes>? ', data.mensajes);
              this.mensajes = data.mensajes;
            });
          });
        });
      } else {
        let convCurrent: Conversacion;
        this.chatService.getConversaciones().subscribe((querySnapshot) => {
          console.log('querySnapshot: ', querySnapshot);

          querySnapshot.forEach((doc) => {
            // Conversacion del currentUser
            if (doc.data().idChat === chatCurrent.idChat) {
              convCurrent = {
                idConversacion: doc.id, // data().idChat,
                idChat: doc.data().idChat,
                mensajes: doc.data().mensajes,
              };
              console.log('1) convCurrent: ', convCurrent);

              this.mensajes = convCurrent.mensajes;
              this.chatService.setCurrentConversacion(convCurrent);

              this.chatService.cargarMensajes().subscribe((data) => {
                console.log('data>? ', data);
                console.log('mensajes>? ', data.mensajes);
                this.mensajes = data.mensajes;
              });
              return;
            }
          });
        });
      }

      this.showMensajes = true;
    });
  }

  enviarMensaje() {
    // If message string is empty
    if (this.mensaje === '') {
      alert('Enter mensaje');
      return;
    }
    // set the mensaje object
    const msg = {
      usuarioEmisor: this.currentUser.username,
      emisorNombre: this.currentUser.nombre,
      timestamp: new Date(),
      contenido: this.mensaje,
    };
    // empty mensaje
    this.mensaje = '';
    // update
    this.mensajes.push(msg);
    console.log('list', this.mensajes);

    this.chatService.enviarMensaje(this.mensajes).then(() => {
      console.log('sent');
    });
  }
}
