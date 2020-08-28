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
      for (let i = 0; i < data.roles.length; i++) {
        console.log(data.roles[i]);
        if (data.roles[i] == 'ROLE_ADMIN') {
          this.router.navigate(['/admin']);
        }
      }

      const token = {
        roles: [1],
        type: data.tokenType,
        accessToken: data.accessToken
      };

      // store in local memory the token
      this.storage.set(this.STORAGE_KEY, token);

    });

  }

  goRegister() {
    this.router.navigate(['register']);
  }
}
