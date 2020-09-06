import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Signup} from '../signup';
import {Response} from '../response';
import {Router} from '@angular/router';
import {SigninResp} from '../signin-resp';
import {Signin} from '../signin';
import {LOCAL_STORAGE, StorageService} from 'ngx-webstorage-service';

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

  STORAGE_KEY = 'token';

  body: Signup;
  selectedFile: File;

  constructor(private http: HttpClient, private router: Router, @Inject(LOCAL_STORAGE) private storage: StorageService) { }

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

        let signin: Signin;
        signin = new Signin();
        signin.username = this.body.username;
        signin.password = this.body.password;
        this.http.post<SigninResp>('http://localhost:8080/api/auth/signin', signin).subscribe(data => {
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
              next_page = '/mod';

              if(data.approved == "0") {
                alert('The account has not been approved from the administrator yet!');
                return;
              }
            }
            if (data.roles[0] == 'ROLE_USER') {
              token.roles.push(3);
              next_page = '/user';
            }
          }
          else { // tow roles, user and mod
            token.roles.push(2);
            token.roles.push(3);
            next_page = '/both'
          }

          // store in local memory the token
          this.storage.set(this.STORAGE_KEY, token);
          this.storage.set('my_info', data);


          let user_id = data.id;
          this.onUpload(user_id);

          this.router.navigate([next_page]); // go to the next page

        });
      }
      else {
        alert(data.message);
      }
    });
  }

  onFileChanged(event) {
    this.selectedFile = event.target.files[0];
  }

  onUpload(id) {
    // upload code goes here

    const formData: FormData = new FormData();
    formData.append('imagefile', this.selectedFile, this.selectedFile.name);
    this.http.post('http://localhost:8080/api/public/user/' + id.toString() + '/image', formData).subscribe( data => {
    });
  }

}
