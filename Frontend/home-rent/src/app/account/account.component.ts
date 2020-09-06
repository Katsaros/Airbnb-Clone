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

  // username = new FormControl();

  enoikiastis_check: boolean = false;
  oikodespotis_check: boolean = false;

  role = new FormControl('', [Validators.required]);
  roleList: string[] = ['Ενοικιαστής', 'Οικοδεσπότης'];

  // my_info: SigninResp;

  my_info: any;

  constructor(@Inject(LOCAL_STORAGE) private storage: StorageService, private router: Router, private http: HttpClient) {
    this.my_info = this.storage.get('my_info');
    this.disabled = true;
    this.username = this.my_info.username;
    this.password = '';
    this.name = this.my_info.firstName;
    this.last_name = this.my_info.lastName;
    this.email = this.my_info.email;
    this.phone = this.my_info.telephone;

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
    let changed_user: SigninResp = new SigninResp();
    changed_user.id = id;
    changed_user.username = this.username;
    changed_user.lastname = this.last_name;
    changed_user.telephone = this.phone;
    changed_user.firstname = this.name;

    console.log(changed_user);


    // change account details
    let header = new HttpHeaders({'Authorization': 'Bearer ' + this.storage.get('token').accessToken});
    this.http.put<SigninResp>('http://localhost:8080/api/secure/user', changed_user,{headers: header}).subscribe(data => {
      console.log(data);

    });

    this.disabled = !this.disabled;
  }

  cancel() {
    this.username = this.my_info.username;
    this.password = '';
    this.name = this.my_info.firstName;
    this.last_name = this.my_info.lastName;
    this.email = this.my_info.email;
    this.phone = this.my_info.telephone;

    console.log(this.username);

    this.disabled = !this.disabled;

  }

  change_photo() {

  }


}
