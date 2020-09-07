import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Users} from '../users';
import {LOCAL_STORAGE, StorageService} from 'ngx-webstorage-service';
import {SigninResp} from '../signin-resp';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {

  id: string;
  username: string;
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  roles: string[];
  oikodespotis_to_be: boolean;

  constructor(private route: ActivatedRoute, @Inject(LOCAL_STORAGE) private storage: StorageService, private http: HttpClient) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    let header = new HttpHeaders({'Authorization': 'Bearer ' + this.storage.get('token').accessToken});
    this.http.get<Users>('http://localhost:8080/api/admin/users/' + this.id.toString(), {headers: header}).subscribe(data => {

      console.log(data);
      this.username = data.username;
      this.first_name = data.firstname;
      this.last_name = data.lastname;
      this.phone = data.telephone;
      if(this.phone == undefined || this.phone == null) {
        this.phone = '-';
      }
      this.email = data.email;
      // this.roles = [];
      //
      // for(let i = 0; i < data.roles.length; i ++) {
      //   if(data.roles[i] == 'user') {
      //     this.roles.push('Ενοικιαστής');
      //   }
      //   else {
      //     this.roles.push('Οικοδεσπότης');
      //   }
      // }
      // this.roles.push('Ενοικιαστής');
      // this.roles.push('Ενοικιαστής');

      if(data.approved == 0) {
        this.oikodespotis_to_be = true;
      }

    });
  }

  accept() {

    let header = new HttpHeaders({'Authorization': 'Bearer ' + this.storage.get('token').accessToken});
    this.http.get<Users>('http://localhost:8080/api/admin/users/' + this.id.toString() + '/approve', {headers: header}).subscribe(data => {
      // alert(data.Status);
    });
  }

  delete_account() {

    // delete user
    let header = new HttpHeaders({'Authorization': 'Bearer ' + this.storage.get('token').accessToken});
    this.http.delete<any>('http://localhost:8080/api/admin/users/' + this.id, {headers: header}).subscribe(data => {
      // console.log(data);
      alert(data.Status);
    });


  }

}
