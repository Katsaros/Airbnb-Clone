import {Component, Inject, OnInit} from '@angular/core';
import {Chats, Messages, NewMessage} from '../chats';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {LOCAL_STORAGE, StorageService} from 'ngx-webstorage-service';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.css']
})
export class ChatsComponent implements OnInit {

  chatList: Chats[] = [];
  messages: Messages[] = [];
  my_id: number;
  selected_id: number = null;
  constructor(@Inject(LOCAL_STORAGE) private storage: StorageService, private http: HttpClient) { }

  ngOnInit(): void {
    this.my_id = this.storage.get('my_info').id;
    // this.getAllMessages();
    this.receive();
  }

  getAllMessages() {
    let header = new HttpHeaders({'Authorization': 'Bearer ' + this.storage.get('token').accessToken});
    this.http.get<Chats[]>('http://localhost:8080/api/secure/messages', {headers: header}).subscribe(data => {
      this.chatList = data;
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
    this.http.post<Messages>(url, body, {headers: header}).subscribe(data => {
      this.messages.push(data);
    });
  }

  receive() {

    setInterval(() => {
      // console.log('receive');
      if(this.selected_id != null) {
        this.getMessages(this.selected_id);
      }
      this.getAllMessages();
    }, 2000);

  }

}
