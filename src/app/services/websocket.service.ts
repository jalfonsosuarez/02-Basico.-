import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  public socketStatus: boolean = false;

  constructor(
    private socket: Socket
  ) {
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

}
