import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';

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

  role = new FormControl('', [Validators.required]);
  roleList: string[] = ['Ενοικιαστής', 'Οικοδεσπότης'];

  selectedFile: File;

  constructor() { }

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
        this.username.hasError('required') || this.password.hasError('required') || this.passVerif.hasError('required') ||
        this.role.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  register() {

  }


  onFileChanged(event) {
    this.selectedFile = event.target.files[0];
  }

  onUpload() {
    // upload code goes here
  }

}
