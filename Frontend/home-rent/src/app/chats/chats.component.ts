import {Component, Inject, OnInit} from '@angular/core';
import {Chats, Messages, NewMessage} from '../chats';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {LOCAL_STORAGE, StorageService} from 'ngx-webstorage-service';
import {FormControl} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.css']
})
export class ChatsComponent implements OnInit {

  newMess: FormControl = new FormControl();
  chatList: Chats[] = [];
  messages: Messages[] = [];
  my_id: number;
  selected_id: number = null;
  constructor(@Inject(LOCAL_STORAGE) private storage: StorageService, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {

    console.log(this.router.url);
    this.my_id = this.storage.get('my_info').id;
    // this.getAllMessages();
    if(this.router.url === '/chats/new') {
      let chat = new Chats();
      chat.senderId = this.my_id;
      chat.receiverId = this.storage.get('home').ownerId;
      chat.receiverName = this.storage.get('home').ownerUsername;
      this.chatList.push(chat);

      this.selected_id = chat.receiverId;

      this.getMessages(this.selected_id);

    }
    else {
      this.receive();
    }
  }

  getAllMessages() {
    let header = new HttpHeaders({'Authorization': 'Bearer ' + this.storage.get('token').accessToken});
    this.http.get<Chats[]>('http://localhost:8080/api/secure/messages', {headers: header}).subscribe(data => {

      while(this.chatList.length != 0) {
        this.chatList.pop();
      }

      for(let i = 0; i < data.length; i++) {
        if (data[i].receiverId != this.my_id) {
          this.chatList.push(data[i]);
        }
      }
    });
  }

  getMessages(id) {
    let header = new HttpHeaders({'Authorization': 'Bearer ' + this.storage.get('token').accessToken});
    let url = 'http://localhost:8080/api/secure/messages/sender/' + id + '/receiver/' + this.my_id;
    this.selected_id = id;
    this.http.get<Messages[]>(url, {headers: header}).subscribe(data => {
      this.messages = data;
    });
  }

  send() {
    let header = new HttpHeaders({'Authorization': 'Bearer ' + this.storage.get('token').accessToken});
    let url = 'http://localhost:8080/api/secure/message/send';
    let body: NewMessage = new NewMessage();
    // if(this.newMess.value != null) {
      body.message = this.newMess.value;
    // }
    // else {
    //   return;
    // }
    body.read = false;
    body.senderId = this.my_id;
    body.receiverId = this.selected_id;
    this.http.post<Messages>(url, body, {headers: header}).subscribe(data => {
      // this.messages.push(data);
      this.getMessages(this.selected_id);
    });

    if(this.router.url === '/chat/new') {
      this.receive();
    }
  }

  receive() {
    setInterval(() => {
      if(this.selected_id != null) {
        this.getMessages(this.selected_id);
      }
      this.getAllMessages();
    }, 2000);
  }

}
