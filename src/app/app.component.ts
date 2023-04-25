import { Component } from '@angular/core';
import { UserService } from './service/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'portfolio';
  storage = window.localStorage;
  constructor(private userService: UserService) {
    this.setUUID()
  }

  setUUID(){
    const value = this.storage.getItem('uuid');
    if(value === null) this.storage.setItem('uuid', this.userService.generateUuid());
  }
}
