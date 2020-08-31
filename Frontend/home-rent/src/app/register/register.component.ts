import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Signup} from '../signup';
import {Response} from '../response';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  email = new FormControl('', [Validators.required, Validators.email]);
  lastName = new FormControl('', [Validators.required]);
  firstName = new FormControl('', [Validators.required]);
  username = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required, Validators.minLength(6)]);
  passVerif = new FormControl('', [Validators.required]);
  telephone = new FormControl('', [Validators.required, Validators.minLength(10)]);

  role = new FormControl();
  roleList: string[] = ['Ενοικιαστής', 'Οικοδεσπότης'];

  body: Signup;
  selectedFile: File;

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
  }

  getPhoneErrorMessage() {
    if (this.telephone.hasError('required')) {
      return 'You must enter a value';
    }

    if (this.telephone.hasError('minLength') || this.telephone.hasError('maxLength')) {
      return 'Invalid phone number';
    }
  }

  getErrorMessage() {
    if (this.email.hasError('required') || this.lastName.hasError('required') || this.firstName.hasError('required') ||
        this.username.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  getErrorMessagePass() {
    if (this.password.errors.required) {
      return 'You must enter a value';
    }
    if (this.password.errors.minlength) {
      return 'Password must has at least 6 digits length';
    }
  }

  getErrorMessagePassVer() {
    if (this.passVerif.errors.required) {
      return 'You must enter a value';
    }
  }

  register() {

    if(this.password.value != this.passVerif.value) {
      alert('Please check the password!');
      return;
    }
    this.body = new Signup();
    this.body.email = this.email.value;
    this.body.username = this.username.value;
    this.body.firstname = this.firstName.value;
    this.body.lastname = this.lastName.value;
    this.body.password = this.password.value;
    this.body.role = [];

    for(let i = 0; i < this.role.value.length; i++) {
      if(this.role.value[i] == 'Ενοικιαστής') {
        this.body.role.push('user');
      }
      else {
        this.body.role.push('mod');
      }
    }
    this.body.telephone = this.telephone.value;

    this.http.post<Response>('http://localhost:8080/api/auth/signup', this.body).subscribe(data => {
      alert(data.message);
      if(data.message == 'User registered successfully!') {
        this.router.navigate(['/welcome']);
      }
      else {
        alert(data.message);
      }
    });
  }



  onFileChanged(event) {
    this.selectedFile = event.target.files[0];
  }

  onUpload() {
    // upload code goes here
  }

}
