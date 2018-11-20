import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {

  public texto: string = '';
  public msgSubs: Subscription;
  public mensajes: any[] = [];
  public elemento: HTMLElement;

  constructor( public chatService: ChatService) { }

  ngOnInit() {

    this.elemento = document.getElementById('chat-mensajes');

    this.msgSubs = this.chatService.getMessages().subscribe( msg => {

      this.mensajes.push( msg );
      setTimeout(() => {
        this.elemento.scrollTop = this.elemento.scrollHeight;
      }, 50);

    });

  }

  ngOnDestroy() {
    this.msgSubs.unsubscribe();
  }

  enviar() {

    if ( this.texto.trim().length === 0 ) {
      return;
    }

    this.chatService.sendMessage( this.texto );

    this.texto = '';

  }

}
