import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  dataSource = ['kati', 'kati allo', 'kati trito'];
  displayedColumns: string[];
  aitimata: number;
  constructor() {
    this.displayedColumns = ['select', 'position', 'name', 'weight', 'symbol'];
    this.aitimata = 0;
  }

  ngOnInit(): void {
  }

  open(content, pos) {

  }

}
