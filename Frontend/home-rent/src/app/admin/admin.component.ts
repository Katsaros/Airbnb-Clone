import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {LOCAL_STORAGE, StorageService} from 'ngx-webstorage-service';
import {NavigationExtras, Router} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Users} from '../users';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  // dataSource = ['kati', 'kati allo', 'kati trito'];
  dataSource;

  displayedColumns: string[] = ['name', 'weight', 'symbol'];

  // displayedColumns: string[];
  unapproved: Users[];

  aitimata: number;
  constructor(@Inject(LOCAL_STORAGE) private storage: StorageService, private router: Router, private http: HttpClient) {
    this.displayedColumns = ['name', 'weight', 'symbol'];
    // this.aitimata = 0;
  }

  ngOnInit(): void {

    // check if the user is admin and if he is signed in
    let token = this.storage.get('token');
    if(token == undefined) {
      this.router.navigate(['/not-found']);
    }
    else {
      let found = false;
      for(let i = 0; i < token.roles.length; i++) {
        if(token.roles[i] == 1) {
          found = true;
        }
      }
      if(found == false) {
        this.router.navigate(['/not-found']);

      }
    }

    // get all users
    let header = new HttpHeaders({'Authorization': 'Bearer ' + this.storage.get('token').accessToken});
    this.http.get<Users[]>('http://localhost:8080/api/admin/users', {headers: header}).subscribe(data => {
      console.log(data);
      this.dataSource = new MatTableDataSource<Users>(data);
      this.dataSource.paginator = this.paginator;


    });

    this.http.get<Users[]>('http://localhost:8080/api/admin/users/unapproved', {headers: header}).subscribe(data => {
      console.log(data);
      this.unapproved = data;

      this.aitimata = this.unapproved.length;

    });


  }

  userInfo(id: number) {
    console.log(id);
    this.router.navigate(['/userinfo', id]);
  }

  export(type: string) {
    let url = 'http://localhost:8080/api/admin/export/homes/details?format=' + type;



    // export file
    let header = new HttpHeaders({'Authorization': 'Bearer ' + this.storage.get('token').accessToken});

    this.http.get<any>(url, {headers: header}).subscribe(data => {
      console.log(data);
      // let str = JSON.parse(data);

      let navigationExtras: NavigationExtras = {
        state: {
          data: data
        }
      }
      this.router.navigate(['/results'], navigationExtras);

    });
  }
}
