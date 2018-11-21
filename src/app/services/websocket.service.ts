import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Usuario } from '../classes/usuario';
import { callbackify } from 'util';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  public socketStatus: boolean = false;
  public usuario: Usuario;

  constructor( private socket: Socket ) {
    this.getStorage();
    this.checkStatus();
  }


  checkStatus() {

    this.socket.on( 'connect', () => {
      console.log('Conectado al servidor socket.');
      this.socketStatus = true;
    });

    this.socket.on( 'disconnect', () => {
      console.log('Desconectado del servidor socket.');
      this.socketStatus = false;
    });

  }


  emit( event: string, payload?: any, callback?: Function ) {

    // emit( event, payload, callback )
    console.log('Emitiendo evento por socket.');

    this.socket.emit( event, payload, callback );
  }

  listen( event: string ) {
    return this.socket.fromEvent( event );
  }

  loginWS( nombre: string ) {

    return new Promise( (resolve, reject) => {

      this.emit('configurar-usuario', { nombre }, (resp) => {

        this.usuario = new Usuario( nombre );
        this.guardarStorage();

        resolve();

      });

    });

  }

  getUsuario() {
    return this.usuario;
  }

  guardarStorage() {

    localStorage.setItem( 'usuario', JSON.stringify( this.usuario ));

  }

  getStorage() {

    if ( localStorage.getItem('usuario') ) {
      this.usuario = JSON.parse( localStorage.getItem( 'usuario') );
      this.loginWS( this.usuario.nombre );
    }

  }

}
