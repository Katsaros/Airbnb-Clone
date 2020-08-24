import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';

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

  enoikiastis_check: boolean = true;
  oikodespotis_check: boolean = false;

  role = new FormControl('', [Validators.required]);
  roleList: string[] = ['Ενοικιαστής', 'Οικοδεσπότης'];



  constructor() {
    this.disabled = true;
    this.username = 'ckats';
    this.password = 'mpla';
  }

  ngOnInit(): void {
  }

  change_disabled() {
    this.disabled = !this.disabled;
  }

  save() {
    this.disabled = !this.disabled;
  }

  cancel() {
    this.disabled = !this.disabled;
  }

  delete_account() {

  }


}
