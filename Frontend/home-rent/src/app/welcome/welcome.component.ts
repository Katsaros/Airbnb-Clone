import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Search} from '../search';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

    synoikia = new FormControl();
    poli = new FormControl();
    xora = new FormControl();
    visitors = new FormControl();

    constructor(private router: Router) { }

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

  ngOnInit(): void {
  }

  search() {

      let body: Search;

      this.router.navigate(['/search']);
  }





}
