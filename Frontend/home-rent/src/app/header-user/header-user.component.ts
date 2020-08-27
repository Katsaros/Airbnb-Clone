import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header-user',
  templateUrl: './header-user.component.html',
  styleUrls: ['./header-user.component.css']
})
export class HeaderUserComponent implements OnInit {

  admin: boolean;
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.admin = false;
  }

  logOut() {
    this.router.navigate(['/']);
  }

}
