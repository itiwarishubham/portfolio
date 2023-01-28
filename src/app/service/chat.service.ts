import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { map } from 'rxjs/operators';
import { Message } from '../entity/message';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  list!: AngularFireList<any>;
  msgRef!: AngularFireList<any>;
  
  constructor(private db: AngularFireDatabase) {}

  sendMessage(message: Message) {
    this.db.list('/chat-messages').push(message);
  }

  getMessages() {
    this.msgRef = this.db.list('chat-messages');
    return this.msgRef;
  }
}
