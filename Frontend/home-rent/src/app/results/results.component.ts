import { Component, OnInit } from '@angular/core';
import {Router, NavigationExtras} from '@angular/router';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

  data: string;

  constructor(private route: Router) {
    this.data = JSON.parse(JSON.stringify(this.route.getCurrentNavigation().extras.state.data));
  }

  ngOnInit(): void {
  }

}
