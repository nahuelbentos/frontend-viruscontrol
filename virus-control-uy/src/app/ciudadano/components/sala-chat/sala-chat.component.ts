import { Component, OnInit } from '@angular/core';
import { ChatService } from '@shared/services/chat.service';
import { Usuario } from '@shared/model/Usuario';
import { AutenticacionService } from '@shared/services/autenticacion.service';
import { Chat } from '@shared/model/chat/chat.model';

import { Conversacion } from '@shared/model/chat/conversacion.model';


import {
  ScrollToService,
  ScrollToConfigOptions,
} from '@nicky-lenaers/ngx-scroll-to';

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

  userFilter = { nombre: '' };

  constructor(
    private chatService: ChatService,
    private scrollToService: ScrollToService,
    private autenticacionService: AutenticacionService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.autenticacionService.user;

    this.chatService.getUsuarios().subscribe((data) => {
      const usersFirebase: any = data.map((e) => {
        return e.payload.doc.data();
      });

      const temp = usersFirebase.filter(
        (usuario) =>
          usuario.username !== this.autenticacionService.user.username
      );

      this.usuarios = [];
      for (const user of temp) {
        const usuario: Usuario = {
          nombre: user.nombre,
          apellido: user.apellido,
          correo: user.correo,
          username: user.username,
          idUsuario: user.idUsuario,
        };

        this.chatService
          .getChatPorUsuario(this.currentUser, usuario)
          .subscribe((respChat) => {
            // chat = respChat.algo;

            if (respChat.length === 0) {
              return;
            }

            const idChatArray: string[] = respChat.map((e) => {
              return e.payload.doc.id;
            });
            // chanchada pero funciona
            const idChat: string = idChatArray.find((e) => e);

            this.chatService
              .getConversacionPorChat(idChat)
              .subscribe((conversacionChanges) => {

                // tslint:disable-next-line: no-shadowed-variable
                const temp: any = conversacionChanges.map((e) => {
                  return e.payload.doc.data();
                });

                const element = temp.find((e) => e);

                if (element) {

                  const conversacion: Conversacion = {
                    idChat: element.idChat,
                    idConversacion: element.idConversacion,
                    mensajes: element.mensajes,
                  };

                  if (conversacion.mensajes.length > 0) {
                    const index = conversacion.mensajes.length - 1;
                    if (!conversacion.mensajes[index].mensajeReceptorVisto) {

                      this.usuarios = this.usuarios.map((u) => {
                        if (u.username === usuario.username) {

                          if ( conversacion.mensajes[index].usuarioEmisor === u.username) {
                            u.mensajeVisto = conversacion.mensajes[index].mensajeReceptorVisto;
                            u.mensajeTimestamp = conversacion.mensajes[index].timestamp;
                          }

                        }
                        return u;
                      });

                    }
                  }

                }
              });
          });

        this.usuarios.push(usuario);
      }

    });
  }

  seleccionarUsuario(usuario: Usuario) {

    const chat: Chat = {
      usuarioEmisor: this.currentUser.username,
      usuarioReceptor: usuario.username,
    };

    this.usuarios = this.usuarios.map((u) => {
      if (u.username === usuario.username) {
        u.mensajeVisto = true;
      }
      return u;
    });


    this.chatService.getChats().subscribe((querySnapshot) => {

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

          return;
        } else {

          // Chat donde el currentUser es receptor
          if (doc.data().usuarioEmisor === usuario.username &&
            doc.data().usuarioReceptor === this.currentUser.username) {

            chatCurrent = {
              idChat: doc.id, // data().idChat,
              usuarioEmisor: doc.data().usuarioEmisor,
              usuarioReceptor: doc.data().usuarioReceptor,
            };

            return;
          }
        }

      });

      if (!chatCurrent) {
        this.chatService.createChat(chat).then((ref) => {

          const conversacion: Conversacion = {
            idChat: ref.id,
            mensajes: [],
          };

          this.chatService.createConversacion(conversacion).then((refConv) => {

            const conv: Conversacion = {
              idChat: conversacion.idChat,
              mensajes: [],
              idConversacion: refConv.id,
            };

            this.chatService.setCurrentConversacion(conv);

            this.chatService.cargarMensajes().subscribe((data) => {
              console.log('data>? ', data);
              console.log('mensajes>? ', data.mensajes);
              this.mensajes = data.mensajes;
              setTimeout(() => {
                this.triggerScrollTo(); // scroll to bottom
              }, 1000);
            });
          });
        });
      } else {

        let convCurrent: Conversacion;
        // tslint:disable-next-line: no-shadowed-variable
        this.chatService.getConversaciones().subscribe((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            // Conversacion del currentUser
            if (doc.data().idChat === chatCurrent.idChat) {
              convCurrent = {
                idConversacion: doc.id, // data().idChat,
                idChat: doc.data().idChat,
                mensajes: doc.data().mensajes,
              };

              this.mensajes = convCurrent.mensajes;
              this.chatService.setCurrentConversacion(convCurrent);

              this.chatService.cargarMensajes().subscribe((data) => {
                console.log('data>? ', data);
                console.log('mensajes>? ', data.mensajes);
                this.mensajes = data.mensajes;
                setTimeout(() => {
                  this.triggerScrollTo(); // scroll to bottom
                }, 1000);
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
      return;
    }
    // set the mensaje object
    const msg = {
      usuarioEmisor: this.currentUser.username,
      emisorNombre: this.currentUser.nombre,
      emisorFoto: this.currentUser.photoUrl,
      timestamp: new Date(),
      fecha: new Date(),
      contenido: this.mensaje,
      mensajeEmisorVisto: true,
      mensajeReceptorVisto: false,
    };
    // empty mensaje
    this.mensaje = '';
    // update
    this.mensajes.push(msg);

    this.chatService.enviarMensaje(this.mensajes).then(() => {
      console.log('enviado');
    });
  }

  // Scroll to the bottom
  public triggerScrollTo() {
    const config: ScrollToConfigOptions = {
      target: 'destination',
    };
    this.scrollToService.scrollTo(config);
  }
}
