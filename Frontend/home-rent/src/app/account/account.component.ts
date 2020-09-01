import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {LOCAL_STORAGE, StorageService} from 'ngx-webstorage-service';
import {Router} from '@angular/router';
import {Users} from '../users';
import {SigninResp} from '../signin-resp';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  disabled: boolean;
  username: string;
  name: string;
  last_name: string;
  password: string;
  email: string;
  phone: string;

  hide = true;

  enoikiastis_check: boolean = false;
  oikodespotis_check: boolean = false;

  role = new FormControl('', [Validators.required]);
  roleList: string[] = ['Ενοικιαστής', 'Οικοδεσπότης'];

  my_info: SigninResp;

  constructor(@Inject(LOCAL_STORAGE) private storage: StorageService, private router: Router, private http: HttpClient) {
    this.my_info = this.storage.get('my_info');
    this.disabled = true;
    this.username = this.my_info.username;
    this.password = '';

    // let roles = this.storage.get('token').roles;
    // for(let i = 0; i < roles.length; i ++) {
    //   if(roles[i] == "ROLE_USER") {
    //     this.enoikiastis_check = true;
    //   }
    //   else if(roles[i] == "ROLE_MOD") {
    //     this.oikodespotis_check = true;
    //   }
    // }
  }

  ngOnInit(): void {

    let token = this.storage.get('token');
    if(token == undefined) {
      this.router.navigate(['/not-found']);
    }
  }

  change_disabled() {
    this.disabled = !this.disabled;
  }

  save() {

    let id = this.my_info.id;
    let changed_user: {
      id: number;
      username: string;
      firstname: string;
      lastname: string;
      email: string;
      telephone: string;
      approved: 1;
      image: null;
    }
    changed_user.id = id;
    changed_user.username = this.username;
    changed_user.lastname = this.last_name;
    changed_user.telephone = this.phone;
    changed_user.firstname = this.name;


    // change account details
    let header = new HttpHeaders({'Authorization': 'Bearer ' + this.storage.get('token').accessToken});
    this.http.put<SigninResp>('http://localhost:8080/api/secure/user', changed_user,{headers: header}).subscribe(data => {
      console.log(data);

    });

    this.disabled = !this.disabled;
  }

  cancel() {
    this.disabled = !this.disabled;
  }

  // delete_account() {
  //
  // }

  change_photo() {

  }


}
