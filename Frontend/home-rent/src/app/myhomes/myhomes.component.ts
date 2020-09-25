import {ChangeDetectorRef, Component, Inject, NgModule, OnInit, ViewChild} from '@angular/core';
import {LOCAL_STORAGE, StorageService} from 'ngx-webstorage-service';
import {Router} from '@angular/router';
import {Home, HomeCategory} from '../home';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Users} from '../users';
import {MatTableDataSource} from '@angular/material/table';
import {Observable} from 'rxjs';
import {MatPaginator} from '@angular/material/paginator';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormControl, FormGroup} from '@angular/forms';
import {Task} from '../new-home/new-home.component';
import {NominatimResponse} from '../nominati-response';
import {NominatimService} from '../nominatim.service';
import {DomSanitizer} from '@angular/platform-browser';

declare var ol: any;


@Component({
  selector: 'app-myhomes',
  templateUrl: './myhomes.component.html',
  styleUrls: ['./myhomes.component.css']
})
export class MyhomesComponent implements OnInit {

  constructor(private nominatimService: NominatimService, @Inject(LOCAL_STORAGE) private storage: StorageService, private router: Router,
              private http: HttpClient, private changeDetectorRef: ChangeDetectorRef, private dialog: MatDialog, private sanitizer: DomSanitizer) {
  }

  user: boolean = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  obs: Observable<any>;
  dataSource: MatTableDataSource<Home>;

  selected: Home = undefined;
  homes: Home[] = [];
  my_info: any;
  imageUrl = [];
  stars: string[] = [];

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

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

    // get my homes
    let header = new HttpHeaders({'Authorization': 'Bearer ' + this.storage.get('token').accessToken});
    this.http.get<Home[]>('http://localhost:8080/api/host/' + this.my_info.id + '/homes', {headers: header}).subscribe(data => {
      this.homes = data;

      this.changeDetectorRef.detectChanges();
      this.dataSource = new MatTableDataSource<Home>(this.homes);
      this.dataSource.paginator = this.paginator;
      this.obs = this.dataSource.connect();

      for(let i = 0; i < this.homes.length; i ++) {
        if(this.homes[i].image != null) {
          this.imageUrl.push(this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(this.homes[i].image)));
        }
        else {
          this.imageUrl.push(null);
        }

        if(this.homes[i].reservations.length != 0) {
          this.http.get<any>('http://localhost:8080/api/public/home/' + this.homes[i].id + '/reviews', {headers: header}).subscribe(data => {
            this.stars.push(data.average.toString());
          });
        }
        else {
          this.stars.push('-');
        }
      }
    });

  }

  openDialog(card): void {
    this.storage.set('home', card);
    this.router.navigate(['/newhome', card.id]);
  }

  delete(id) {
    let header = new HttpHeaders({'Authorization': 'Bearer ' + this.storage.get('token').accessToken});
    this.http.delete<any>('http://localhost:8080/api/home/' + id.toString() + '/delete', {headers: header}).subscribe(data => {
      // get my homes
      this.http.get<Home[]>('http://localhost:8080/api/host/' + this.my_info.id + '/homes', {headers: header}).subscribe(data => {
        this.homes = data;
        this.changeDetectorRef.detectChanges();
        this.dataSource = new MatTableDataSource<Home>(this.homes);
        this.dataSource.paginator = this.paginator;
        this.obs = this.dataSource.connect();

      });
    });
  }

  goSearch() {

  }

}
