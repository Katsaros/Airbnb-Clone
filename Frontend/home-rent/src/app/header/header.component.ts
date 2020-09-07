import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {Signin} from '../signin';
import {SigninResp} from '../signin-resp';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  // key that is used to access the data in local storageconst
  STORAGE_KEY = 'token';
  options: FormGroup;
  hideRequiredControl = new FormControl(false);
  floatLabelControl = new FormControl('auto');
  hide = true;


  username = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);

  constructor(fb: FormBuilder, private router: Router, private http: HttpClient, @Inject(LOCAL_STORAGE) private storage: StorageService) {
    this.options = fb.group({
      hideRequired: this.hideRequiredControl,
      floatLabel: this.floatLabelControl,
    });
  }

  ngOnInit(): void {
  }

  goLanding() {
    let body: Signin;
    body = new Signin();
    body.password = this.password.value;
    body.username = this.username.value;

    this.http.post<SigninResp>('http://localhost:8080/api/auth/signin', body).subscribe(data => {
      // console.log(data);

      let token = {
        roles: [],
        type: data.tokenType,
        accessToken: data.accessToken
      };

      let next_page : string;

      if(data.roles.length == 1) { // one role
        if (data.roles[0] == 'ROLE_ADMIN') {
          token.roles.push(1);
          next_page = '/admin';
        }
        if (data.roles[0] == 'ROLE_MOD') {
          token.roles.push(2);
          next_page = '/myhomes';

          if(data.approved == "0") {
            alert('The account has not been approved from the administrator yet!');
            return;
          }
        }
        if (data.roles[0] == 'ROLE_USER') {
          token.roles.push(3);
          next_page = '/account';
        }
      }
      else { // tow roles, user and mod
        token.roles.push(2);
        token.roles.push(3);
        next_page = '/myhomes';
      }

      // store in local memory the token
      this.storage.set(this.STORAGE_KEY, token);
      this.storage.set('my_info', data);

      // console.log(next_page);
      this.router.navigate([next_page]); // go to the next page

    });

  }

  goRegister() {
    this.router.navigate(['register']);
  }
}
