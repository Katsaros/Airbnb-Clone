import {Component, Inject, OnInit} from '@angular/core';
import {Form, FormControl, Validators} from '@angular/forms';
import {LOCAL_STORAGE, StorageService} from 'ngx-webstorage-service';
import {Router} from '@angular/router';
import {ChangedUser, ChangedUserPass, SigninResp} from '../signin-resp';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})


export class AccountComponent implements OnInit {

  disabled: boolean;
  username: FormControl = new FormControl();
  name: FormControl = new FormControl();
  last_name: FormControl = new FormControl();
  password: FormControl = new FormControl();
  email: FormControl = new FormControl();
  phone: FormControl = new FormControl();

  hide = true;

  imageUrl: any;

  photo: any;

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
    this.username.setValue(this.my_info.username);
    this.username.disable();
    this.password.setValue('');
    this.password.disable();
    this.name.setValue(this.my_info.firstName);
    this.name.disable();
    this.last_name.setValue(this.my_info.lastName);
    this.last_name.disable();
    this.email.setValue(this.my_info.email);
    this.email.disable();
    this.phone.setValue(this.my_info.telephone);
    this.phone.disable();


    // this.getPhoto();

    // this.photo = this.getPhoto();


  }

  ngOnInit(): void {

    let token = this.storage.get('token');
    if(token == undefined) {
      this.router.navigate(['/not-found']);
    }

    // this.getPhoto();
    // this.photo = this.getPhoto();
  }

  change_disabled() {
    this.disabled = !this.disabled;
  }

  save() {
    if(this.password.value != '') {
      let id = this.my_info.id;
      let changed_user: ChangedUserPass = new ChangedUserPass();
      changed_user.id = id;
      changed_user.username = this.username.value;
      changed_user.lastname = this.last_name.value;
      changed_user.telephone = this.phone.value;
      changed_user.firstname = this.name.value;
      changed_user.password = this.password.value;

      console.log(changed_user);

      // change account details
      let header = new HttpHeaders({'Authorization': 'Bearer ' + this.storage.get('token').accessToken});
      this.http.put<SigninResp>('http://localhost:8080/api/secure/user', changed_user,{headers: header}).subscribe(data => {
        console.log(data);
        this.storage.set('my_info', data);
        this.my_info = this.storage.get('my_info');

      });
    }
    else {
      let id = this.my_info.id;
      let changed_user: ChangedUser = new ChangedUser();
      changed_user.id = id;
      changed_user.username = this.username.value;
      changed_user.lastname = this.last_name.value;
      changed_user.telephone = this.phone.value;
      changed_user.firstname = this.name.value;

      console.log(changed_user);

      // change account details
      let header = new HttpHeaders({'Authorization': 'Bearer ' + this.storage.get('token').accessToken});
      this.http.put<SigninResp>('http://localhost:8080/api/secure/user', changed_user,{headers: header}).subscribe(data => {
        console.log(data);

        this.storage.set('my_info', data);
        this.my_info = this.storage.get('my_info');

      });
    }

    this.disabled = !this.disabled;
    this.username.disable();
    this.password.disable();
    this.name.disable();
    this.last_name.disable();
    this.email.disable();
    this.phone.disable();
  }

  cancel() {
    this.username.setValue(this.my_info.username);
    // this.password = '';
    this.name = this.my_info.firstName;
    this.last_name = this.my_info.lastName;
    this.email = this.my_info.email;
    this.phone = this.my_info.telephone;

    console.log(this.username);

    this.disabled = !this.disabled;

  }

  change_photo() {

  }

  getPhoto() {

    let header = new HttpHeaders({'Authorization': 'Bearer ' + this.storage.get('token').accessToken});
    // header.append('Content-Type', 'image/jpeg');
    let url = 'http://localhost:8080/api/secure/user/' + this.my_info.id + '/image';
    this.http.get(url, {headers: header}).subscribe(data => {
      // this.imageUrl = URL.createObjectURL(data);
    });



  }

}
