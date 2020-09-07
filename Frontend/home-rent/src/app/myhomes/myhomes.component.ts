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

declare var ol: any;


@Component({
  selector: 'app-myhomes',
  templateUrl: './myhomes.component.html',
  styleUrls: ['./myhomes.component.css']
})
export class MyhomesComponent implements OnInit {

  constructor(private nominatimService: NominatimService, @Inject(LOCAL_STORAGE) private storage: StorageService, private router: Router,
              private http: HttpClient, private changeDetectorRef: ChangeDetectorRef, private dialog: MatDialog) {
  }

  user: boolean = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  obs: Observable<any>;
  dataSource: MatTableDataSource<Home>;

  selected: Home = undefined;
  homes: Home[] = [];
  my_info: any;


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



    // let ahome: Home = new Home();
    // ahome.id = 1;
    // ahome.ownerId = 1;
    // ahome.ownerUsername = "mpla";
    // ahome.reservations = [];
    // ahome.openBooking = "string";
    // ahome.closeBooking = "string";
    // ahome.image = [];
    // ahome.price = 10;
    // ahome.address = "string";
    // ahome.latitude = "string";
    // ahome.longtitude = "string";
    // ahome.homeCategory = new HomeCategory();
    // ahome.homeCategory.homeCategoryTitle = "mpla";
    // ahome.description = "string";
    // ahome.squareMeters = 10;
    // ahome.overnightPrice = 13;
    // ahome.extraPersonPrice = 2;
    // ahome.maxPeople = 3;
    // ahome.minOvernights = 1;
    // ahome.beds = 4;
    // ahome.bathrooms = 8;
    // ahome.bedrooms = 0;
    // ahome.transport = "mpla";
    // ahome.neighborhood = "mpla";
    // ahome.houseRules = "string";
    // ahome.elevator = false;
    // ahome.heating = false;
    // ahome.kitchen = false;
    // ahome.parking = false;
    // ahome.tv = true;
    // ahome.wifi = true;
    // ahome.ac = true;
    // ahome.smoking = true;
    // ahome.pets = true;
    // ahome.events = "true";
    //
    // for(let i = 0; i < 10; i++) {
    //   this.homes.push(ahome);
    // }


    // get my homes
    let header = new HttpHeaders({'Authorization': 'Bearer ' + this.storage.get('token').accessToken});
    this.http.get<Home[]>('http://localhost:8080/api/host/' + this.my_info.id + '/homes', {headers: header}).subscribe(data => {
      this.homes = data;

      this.changeDetectorRef.detectChanges();
      this.dataSource = new MatTableDataSource<Home>(this.homes);
      this.dataSource.paginator = this.paginator;
      this.obs = this.dataSource.connect();
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
