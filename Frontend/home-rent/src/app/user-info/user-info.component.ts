import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Users} from '../users';
import {LOCAL_STORAGE, StorageService} from 'ngx-webstorage-service';
import {SigninResp} from '../signin-resp';
import {DomSanitizer} from '@angular/platform-browser';

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
  imageURL = null;

  constructor(private route: ActivatedRoute, @Inject(LOCAL_STORAGE) private storage: StorageService, private http: HttpClient,
              private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    let header = new HttpHeaders({'Authorization': 'Bearer ' + this.storage.get('token').accessToken});
    this.http.get<Users>('http://localhost:8080/api/admin/users/' + this.id.toString(), {headers: header}).subscribe(data => {

      this.username = data.username;
      this.first_name = data.firstname;
      this.last_name = data.lastname;
      this.phone = data.telephone;
      if(this.phone == undefined || this.phone == null) {
        this.phone = '-';
      }
      this.email = data.email;

      this.getPhoto(data.id);
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

  getPhoto(id) {
    let header = new HttpHeaders({'Authorization': 'Bearer ' + this.storage.get('token').accessToken});
    let url = 'http://localhost:8080/api/secure/user/' + id + '/image';
    this.http.get(url, {headers: header, responseType: 'blob'}).subscribe(data => {
      this.imageURL = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(data));
    });

  }


  accept() {
    let header = new HttpHeaders({'Authorization': 'Bearer ' + this.storage.get('token').accessToken});
    this.http.get<Users>('http://localhost:8080/api/admin/users/' + this.id.toString() + '/approve', {headers: header, observe: 'response'}).subscribe(data => {
      alert(data.statusText);
    });
  }

  delete_account() {
    // delete user
    let header = new HttpHeaders({'Authorization': 'Bearer ' + this.storage.get('token').accessToken});
    this.http.delete<any>('http://localhost:8080/api/admin/users/' + this.id, {headers: header, observe: 'response'}).subscribe(data => {
      // console.log(data);
      alert(data.statusText);
    });


  }

}
