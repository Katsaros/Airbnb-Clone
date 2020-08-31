import {Component, Inject, OnInit} from '@angular/core';
import {LOCAL_STORAGE, StorageService} from 'ngx-webstorage-service';
import {Router} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Users} from '../users';
import {Response} from '../response';

@Component({
  selector: 'app-user-requests',
  templateUrl: './user-requests.component.html',
  styleUrls: ['./user-requests.component.css']
})
export class UserRequestsComponent implements OnInit {
  dataSource;
  displayedColumns: string[] = ['name', 'weight', 'symbol'];

  unapproved: Users[];
  aitimata: number;

  id: number;
  username: string;
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  roles: string[];
  oikodespotis_to_be: boolean;

  selected = false;

  constructor(@Inject(LOCAL_STORAGE) private storage: StorageService, private router: Router, private http: HttpClient) { }

  ngOnInit(): void {

    // check if the user is admin and if he is signed in
    let token = this.storage.get('token');
    if(token == undefined) {
      this.router.navigate(['/not-found']);
    }
    else {
      let found = false;
      for(let i = 0; i < token.roles.length; i++) {
        if(token.roles[i] == 1) {
          found = true;
        }
      }
      if(found == false) {
        this.router.navigate(['/not-found']);

      }
    }

    let header = new HttpHeaders({'Authorization': 'Bearer ' + this.storage.get('token').accessToken});
    this.http.get<Users[]>('http://localhost:8080/api/admin/users/unapproved', {headers: header}).subscribe(data => {
      console.log(data);
      this.unapproved = data;
      this.aitimata = this.unapproved.length;
      this.dataSource = this.unapproved;

    });
  }

  userInfo(id: number) {
    this.selected = true;
    this.id = id;
    // console.log(id);

    let header = new HttpHeaders({'Authorization': 'Bearer ' + this.storage.get('token').accessToken});
    this.http.get<Users>('http://localhost:8080/api/admin/users/' + id.toString(), {headers: header}).subscribe(data => {

      console.log(data);
      this.username = data.username;
      this.first_name = data.firstname;
      this.last_name = data.lastname;
      this.phone = data.telephone;
      if (this.phone == undefined || this.phone == null) {
        this.phone = '-';
      }
      this.email = data.email;
    });
  }

  accept() {
    let header = new HttpHeaders({'Authorization': 'Bearer ' + this.storage.get('token').accessToken});
    this.http.post<Response>('http://localhost:8080/api/admin/users/' + this.id.toString() + '/approve', null, {headers: header}).subscribe(data => {
      alert(data.message);
    });
  }

}
