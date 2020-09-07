import {ChangeDetectorRef, Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {Observable} from 'rxjs';
import {MatTableDataSource} from '@angular/material/table';
import {Home} from '../home';
import {FormControl, FormGroup} from '@angular/forms';
import {NominatimService} from '../nominatim.service';
import {LOCAL_STORAGE, StorageService} from 'ngx-webstorage-service';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  obs: Observable<any>;
  dataSource: MatTableDataSource<Home>;

  selected: Home = undefined;
  homes: Home[] = [];
  my_info: any;
  user: boolean = false;


  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

  constructor(private nominatimService: NominatimService, @Inject(LOCAL_STORAGE) private storage: StorageService, private router: Router,
              private http: HttpClient, private changeDetectorRef: ChangeDetectorRef, private dialog: MatDialog) { }

  ngOnInit(): void {

    this.my_info = this.storage.get('my_info');
    let token = this.storage.get('token');
    if(token == undefined) {
      this.router.navigate(['/not-found']);
    }
    else {
      let found = false;
      for(let i = 0; i < token.roles.length; i++) {
        if(token.roles[i] == 2) {
          found = true;
        }
      }
      if(found == false) {
        this.router.navigate(['/not-found']);

      }
    }

    if(this.my_info.roles.length == 2) { //tow roles
      this.user = true;
    }

  }

}
