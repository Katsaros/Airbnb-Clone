import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Signup} from '../signup';
import {Response} from '../response';

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
  password = new FormControl('', [Validators.required]);
  passVerif = new FormControl('', [Validators.required]);
  telephone = new FormControl('', [Validators.required, Validators.minLength(10)]);

  role = new FormControl();
  // mpla = new FormControl();

  // role: string;
  roleList: string[] = ['Ενοικιαστής', 'Οικοδεσπότης'];

  body: Signup;
  selectedFile: File;

  constructor(private http: HttpClient) { }

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
        this.username.hasError('required') || this.password.hasError('required') || this.passVerif.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  register() {

    this.body = new Signup();
    this.body.email = this.email.value;
    this.body.username = this.username.value;
    this.body.firstname = this.firstName.value;
    this.body.lastname = this.lastName.value;
    this.body.password = this.password.value;
    this.body.role = this.role.value;
    this.body.telephone = this.telephone.value;

    // console.log(this.body);

    this.http.post<Response>('http://localhost:8080/api/auth/signup', this.body).subscribe(data => {
      console.log(data);

    });
  }


  onFileChanged(event) {
    this.selectedFile = event.target.files[0];
  }

  onUpload() {
    // upload code goes here
  }

}
