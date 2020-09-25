import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NominatimService} from '../nominatim.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {LOCAL_STORAGE, StorageService} from 'ngx-webstorage-service';
import {Book, BookResp, Home, HomeCategory, NewHome, Reservations} from '../home';
import {FormControl, FormGroup} from '@angular/forms';
import {NominatimResponse} from '../nominati-response';
import {Task} from '../new-home/new-home.component';
import {DomSanitizer} from '@angular/platform-browser';
import { StarRatingComponent } from 'ng-starrating';

declare var ol: any;

@Component({
  selector: 'app-home-info',
  templateUrl: './home-info.component.html',
  styleUrls: ['./home-info.component.css']
})

export class HomeInfoComponent implements OnInit {

  constructor(private route: ActivatedRoute, private sanitizer: DomSanitizer, private nominatimService: NominatimService, private router: Router, private http: HttpClient, @Inject(LOCAL_STORAGE) private storage: StorageService) { }

  newHome: NewHome = new NewHome();
  totalstar: number = 5;
  stars_owner: number;
  stars_home: number;

  loggedin: Boolean = false;
  current_home: Home = new Home();
  dieuthinsi: FormControl = new FormControl({disabled: true});
  perigrafi: FormControl = new FormControl();
  tetragonika: FormControl = new FormControl();
  odigies: FormControl = new FormControl();
  atoma: FormControl = new FormControl();
  min_dianikt: FormControl = new FormControl();
  beds: FormControl = new FormControl();
  bathrooms: FormControl = new FormControl();
  bedrooms: FormControl = new FormControl();
  timi: FormControl = new FormControl();
  epipleontimi: FormControl = new FormControl();
  geitonia: FormControl = new FormControl();
  kanonismoi: FormControl = new FormControl();
  events: FormControl = new FormControl();
  eidos: FormControl = new FormControl();
  homeDescr: FormControl = new FormControl();
  ownerDescr: FormControl = new FormControl();

  my_reservation: Reservations;

  slides: any = [[]];

  imageUrls = null;
  extras;

  write_review: boolean = false;
  reservations: Reservations[];

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

  searchResults: NominatimResponse[];

  mouseX: number;
  mouseY: number;

  mymap: any;
  disabled: boolean;

  long: number = 23.729762;
  lat: number = 37.973393;

  allComplete: boolean = false;

  task: Task = {
    name: 'Select All',
    completed: false,
    subtasks: [
      {name: 'A/C', completed: false},
      {name: 'Θέρμανση', completed: false},
      {name: 'WiFi', completed: false},
      {name: 'Ασανσέρ', completed: false},
      {name: 'Κουζίνα', completed: false},
      {name: 'Parking', completed: false},
      {name: 'TV', completed: false},
      {name: 'Καπνίζοντες', completed: false},
      {name: 'Κατοικίδια', completed: false},
    ]
  };

  ngOnInit() {
    if(this.storage.get('my_info') != null) {
      this.loggedin = true;
    }

    var mousePositionControl = new ol.control.MousePosition({
      coordinateFormat: ol.coordinate.createStringXY(4),
      projection: 'EPSG:4326',
    });

    this.mymap = new ol.Map({
      target: 'map',
      controls: ol.control.defaults({
        attributionOptions: {
          collapsible: false
        }
      }).extend([mousePositionControl]),
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM()
        })
      ],
      view: new ol.View({
        center: ol.proj.fromLonLat([this.long, this.lat]),
        zoom: 8
      })
    });

    if(this.storage.get('home') != null) {
      this.long = this.storage.get('home').longitude;
      this.lat = this.storage.get('home').latitude;
      let layer = new ol.layer.Vector({
        source: new ol.source.Vector({
          features: [
            new ol.Feature({
              geometry: new ol.geom.Point(ol.proj.fromLonLat([this.long, this.lat]))
            })
          ]
        })
      });

      if (this.mymap.getLayers().N.length > 1) {
        this.mymap.getLayers().removeAt(1);
      }
      this.mymap.addLayer(layer);
    }


    this.mymap.on('click', e => {
      if(this.disabled == false) {

        let coordinates = ol.proj.transform(e.coordinate, 'EPSG:3857', 'EPSG:4326');

        this.long = coordinates[0];
        this.lat = coordinates[1];
        let layer = new ol.layer.Vector({
          source: new ol.source.Vector({
            features: [
              new ol.Feature({
                geometry: new ol.geom.Point(ol.proj.fromLonLat([coordinates[0], coordinates[1]]))
              })
            ]
          })
        });

        if (this.mymap.getLayers().N.length > 1) {
          this.mymap.getLayers().removeAt(1);
        }

        this.mymap.addLayer(layer);

        let url_address = 'https://nominatim.openstreetmap.org/reverse?format=json&addressdetails=1&lon=' + this.long.toString() + '&lat=' + this.lat.toString();
        this.http.get<any>(url_address).subscribe(data => {
          this.dieuthinsi.setValue(data.display_name);
        });
      }

    });
      this.current_home = this.storage.get('home');
      this.disabled = true;
      this.dieuthinsi.setValue(this.current_home.address);
      this.dieuthinsi.disable();
      this.atoma.setValue(this.current_home.maxPeople);
      this.atoma.disable();

      this.range.setValue({start: this.current_home.openBooking, end: this.current_home.closeBooking});
      this.epipleontimi.setValue(this.current_home.extraPersonPrice);
      this.epipleontimi.disable();
      this.timi.setValue(this.current_home.price);
      this.timi.disable();
      this.perigrafi.setValue(this.current_home.description);
      this.perigrafi.disable();
      this.odigies.setValue(this.current_home.transport);
      this.odigies.disable();
      this.tetragonika.setValue(this.current_home.squareMeters);
      this.tetragonika.disable();
      this.min_dianikt.setValue(this.current_home.minOvernights);
      this.min_dianikt.disable();
      this.bedrooms.setValue(this.current_home.bedrooms);
      this.bedrooms.disable();
      this.beds.setValue(this.current_home.beds);
      this.beds.disable();
      this.bathrooms.setValue(this.current_home.bathrooms);
      this.bathrooms.disable();
      this.geitonia.setValue(this.current_home.neighborhood);
      this.geitonia.disable();
      this.kanonismoi.setValue(this.current_home.houseRules);
      this.kanonismoi.disable();
      this.events.setValue(this.current_home.events);
      this.events.disable();
      this.task.subtasks[0].completed = this.current_home.ac
      this.task.subtasks[1].completed = this.current_home.heating;
      this.task.subtasks[2].completed = this.current_home.wifi;
      this.task.subtasks[3].completed =this.current_home.elevator;
      this.task.subtasks[4].completed = this.current_home.kitchen;
      this.task.subtasks[5].completed = this.current_home.parking;
      this.task.subtasks[6].completed = this.current_home.tv;
      this.task.subtasks[7].completed = this.current_home.smoking;
      this.task.subtasks[8].completed = this.current_home.pets;
      this.eidos.setValue(this.current_home.homeCategory.homeCategoryTitle);
      this.eidos.disable();

      this.reservations = this.current_home.reservations;

      if(this.loggedin == true) {
        for(let i = 0; i < this.reservations.length; i++) {
          if(this.reservations[i].userIdBooked == this.storage.get('my_info').id) {
            this.my_reservation = this.reservations[i];
            this.write_review = true;
          }
        }
      }

      this.slides = this.chunk(this.reservations, 3);
      this.imageUrls = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(this.current_home.image));
  }

  search() {

    this.http.get<any>('https://api.opencagedata.com/geocode/v1/json?key=cfd032737bac482c9b20abb4ffdc3cb2&q='
        + this.dieuthinsi.value).subscribe(data => {

      this.long = Number(data.results[0].annotations.DMS.lng.split(' ')[0].split('\xB0')[0]) +
          Number(data.results[0].annotations.DMS.lng.split(' ')[1].split('\'')[0]) / 60 +
          Number(data.results[0].annotations.DMS.lng.split(' ')[2].split('\'\'')[0]) / 3600;

      this.lat = Number(data.results[0].annotations.DMS.lat.split(' ')[0].split('\xB0')[0]) +
          Number(data.results[0].annotations.DMS.lat.split(' ')[1].split('\'')[0]) / 60 +
          Number(data.results[0].annotations.DMS.lat.split(' ')[2].split('\'\'')[0]) / 3600;


      let layer = new ol.layer.Vector({
        source: new ol.source.Vector({
          features: [
            new ol.Feature({
              geometry: new ol.geom.Point(ol.proj.fromLonLat([this.long, this.lat]))
            })
          ]
        })
      });

      if (this.mymap.getLayers().N.length > 1) {
        this.mymap.getLayers().removeAt(1);
      }
      this.mymap.addLayer(layer);
    });
  }

  chunk(arr, chunkSize) {
    let R = [];
    for (let i = 0, len = arr.length; i < len; i += chunkSize) {
      R.push(arr.slice(i, i + chunkSize));
    }
    return R;
  }

  someComplete(): boolean {
    if (this.task.subtasks == null) {
      return false;
    }
    return this.task.subtasks.filter(t => t.completed).length > 0 && !this.allComplete;
  }

  setAll(completed: boolean) {
    this.allComplete = completed;
    if (this.task.subtasks == null) {
      return;
    }
    this.task.subtasks.forEach(t => t.completed = completed);
  }

  book() {
    let header = new HttpHeaders({'Authorization': 'Bearer ' + this.storage.get('token').accessToken});
    let url = 'http://localhost:8080/api/secure/home/book/';
    let body = new Book();
    let home: Home = this.storage.get('home');
    body.bookedHomeId = home.id;
    body.homeReviewDescription = null;
    body.homeReviewStars = 0;
    body.hostReviewDescription = null;
    body.hostReviewStars = 0;
    body.isBooked = 1;
    body.userIdBooked = this.storage.get('my_info').id;
    body.userNameBooked = this.storage.get('my_info').username;

    let dates = this.storage.get('dates');
    body.bookedDate = dates.start;
    body.leaveDate = dates.end;

    this.http.post<BookResp[]>(url, body, {headers: header}).subscribe(data => {
      alert("Booked successfully!")
      if(this.storage.get('my_info').roles.length == 2) {
        this.router.navigate(['/myhomes']);
      }
      else {
        if(this.storage.get('my_info').roles[0] == 'ROLE_USER') {
          this.router.navigate(['/account']);
        }
        else {
          this.router.navigate(['/myhomes']);
        }
      }
      this.router.navigate(['/']);
    });
  }

  message() {
    this.router.navigate(['/chats/new']);
  }

  submit() {
    this.my_reservation.homeReviewDescription = this.homeDescr.value;
    this.my_reservation.homeReviewStars = this.stars_home;
    this.my_reservation.hostReviewDescription = this.ownerDescr.value;
    this.my_reservation.hostReviewStars = this.stars_owner;

    let header = new HttpHeaders({'Authorization': 'Bearer ' + this.storage.get('token').accessToken});
    let url = 'http://localhost:8080/api/secure/book/';

    this.http.put<BookResp[]>(url, this.my_reservation, {headers: header}).subscribe(data => {
      console.log(data);
    });

  }



}
