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

}
