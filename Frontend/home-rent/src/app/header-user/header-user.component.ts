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

  admin: boolean;
  unapproved: Users[];
  aitimata: number;

  constructor(private router: Router, @Inject(LOCAL_STORAGE) private storage: StorageService, private http: HttpClient) { }

  ngOnInit(): void {
    this.admin = false;
    let token = this.storage.get(this.STORAGE_KEY);
    for(let i = 0; i < token.roles.length; i++) {
      if(token.roles[i] == 1) {
        this.admin = true;

        let header = new HttpHeaders({'Authorization': 'Bearer ' + this.storage.get('token').accessToken});
        this.http.get<Users[]>('http://localhost:8080/api/admin/users/unapproved', {headers: header}).subscribe(data => {
          // console.log(data);
          this.unapproved = data;

          this.aitimata = this.unapproved.length;

        });

      }
    }
  }

  logOut() {
    this.storage.clear(); // clear token
    this.router.navigate(['/']); // go to welcome page
  }

}
