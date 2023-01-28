import { Component, OnInit } from '@angular/core';
import { Message } from '../entity/message';
import { ChatService } from '../service/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  messages!: Message[];
  message!: Message;
  constructor(private chatService: ChatService) { }

  ngOnInit() {
    this.chatService.getMessages().valueChanges().subscribe(data => {
      this.messages = data;
    })
  }

  send(){
    this.chatService.sendMessage(this.message );
    this.message = {username:'', text: ''};
  }

}
