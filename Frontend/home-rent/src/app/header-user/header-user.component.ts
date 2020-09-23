import {Component, Inject, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {LOCAL_STORAGE, StorageService} from 'ngx-webstorage-service';
import {Users} from '../users';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-header-user',
  templateUrl: './header-user.component.html',
  styleUrls: ['./header-user.component.css']
})
export class HeaderUserComponent implements OnInit {
  STORAGE_KEY = 'token';

  admin: boolean = false;
  user: boolean = false;
  mod: boolean = false;

  unapproved: Users[];
  aitimata: number;

  imageUrl;
  arxiki: string;
  constructor(public router: Router, @Inject(LOCAL_STORAGE) private storage: StorageService, private http: HttpClient) { }

  ngOnInit(): void {

    // this.admin = false;
    let token = this.storage.get(this.STORAGE_KEY);

    if(token.roles.length == 1) { // one role
      if(token.roles[0] == 1) {
        this.admin = true;
        this.arxiki = '/admin';

        let header = new HttpHeaders({'Authorization': 'Bearer ' + this.storage.get('token').accessToken});
        this.http.get<Users[]>('http://localhost:8080/api/admin/users/unapproved', {headers: header}).subscribe(data => {
          // console.log(data);
          this.unapproved = data;

          this.aitimata = this.unapproved.length;

        });
      }
      else if(token.roles[0] == 2) {
        this.mod = true;
        this.arxiki = '/myhomes';
      }
      else {
        this.user = true;
        this.arxiki = '/account';
      }

    }
    else { // tow roles
      this.user = true;
      this.mod = true;
      this.arxiki = '/myhomes';

    }

    this.imageUrl = this.storage.get('photo');

  }

  logOut() {
    this.storage.clear(); // clear token
    this.router.navigate(['/']); // go to welcome page
  }

}
