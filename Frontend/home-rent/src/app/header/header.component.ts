import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Signin} from '../signin';
import {SigninResp} from '../signin-resp';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import {catchError, map} from 'rxjs/operators';
import {DomSanitizer} from '@angular/platform-browser';

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

  imageUrl;

  username = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);

  constructor(fb: FormBuilder, private router: Router, private http: HttpClient, @Inject(LOCAL_STORAGE) private storage: StorageService,
              private sanitizer: DomSanitizer) {
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

    this.http.post<SigninResp>('http://localhost:8080/api/auth/signin', body)
        .subscribe(
        data => {
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
            if (data.roles[0] == 'ROLE_MODERATOR') {
              token.roles.push(2);
              next_page = '/myhomes';

              if(data.approved == "0") {
                alert('The account has not been approved from the administrator yet!');
                return;
              }
            }
            if (data.roles[0] == 'ROLE_USER') {
              token.roles.push(3);
              next_page = '/welcome';
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
          this.getPhoto(data.id);
        }, error => { alert('Invalid Credentials')}


    );

  }

  handleError() {

  }


  getPhoto(id) {

    let header = new HttpHeaders({'Authorization': 'Bearer ' + this.storage.get('token').accessToken});
    let url = 'http://localhost:8080/api/secure/user/' + id + '/image';
    this.http.get(url, {headers: header, responseType: 'blob'}).subscribe(data => {
      this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(data));
      this.storage.set('photo', this.imageUrl);

    });

  }
  goRegister() {
    this.router.navigate(['register']);
  }
}
