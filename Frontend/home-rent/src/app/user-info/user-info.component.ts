import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {

  username: string;
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  roles: string[];
  oikodespotis_to_be: boolean;


  constructor() { }

  ngOnInit(): void {
    this.username = 'ckats';
    this.first_name = 'christina';
    this.last_name = 'kats';
    this.phone = '6944997931';
    this.email = 'ckats@di.uoa.gr';
    this.roles = [];
    this.roles.push('Ενοικιαστής');
    this.roles.push('Ενοικιαστής');
    this.oikodespotis_to_be = true;
  }

  accept() {

  }
}
