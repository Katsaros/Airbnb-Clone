import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {Signin} from '../signin';
import {Response} from '../response';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  options: FormGroup;
  hideRequiredControl = new FormControl(false);
  floatLabelControl = new FormControl('auto');
  hide = true;

  username = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);

  constructor(fb: FormBuilder, private router: Router, private http: HttpClient) {
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

    this.http.post<Response>('https://localhost:8080/api/auth/signin', body).subscribe(data => {
      console.log(data);

    });

  }

  goRegister() {
    this.router.navigate(['register']);
  }
}
