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
  logged_in: boolean;

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

  constructor(private nominatimService: NominatimService, @Inject(LOCAL_STORAGE) private storage: StorageService, private router: Router,
              private http: HttpClient, private changeDetectorRef: ChangeDetectorRef, private dialog: MatDialog) { }

  ngOnInit(): void {

    this.my_info = this.storage.get('my_info');
    if(this.my_info == null) {
      this.logged_in = false;
    }
    else {
      this.logged_in = true;
    }

    this.search();
  }

  search() {
    let url = this.storage.get('url');

    this.http.get<any>(url).subscribe(data => {
      this.homes = data.homes;
      console.log(this.homes);

    });
  }

  openDialog(card): void {
    this.storage.set('home', card);
    this.router.navigate(['/home_info', card.id]);
  }
}
