import {Component, Inject, OnInit} from '@angular/core';
import {NominatimResponse} from '../nominati-response';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {NominatimService} from '../nominatim.service';
import {FormControl, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {HomeCategory, NewHome} from '../home';
import {LOCAL_STORAGE, StorageService} from 'ngx-webstorage-service';
import {Response} from '../response';

declare var ol: any;

export interface Task {
  name: string;
  completed: boolean;
  subtasks?: Task[];
}


@Component({
  selector: 'app-new-home',
  templateUrl: './new-home.component.html',
  styleUrls: ['./new-home.component.css']
})



export class NewHomeComponent implements OnInit {

  constructor(private nominatimService: NominatimService, private router: Router, private http: HttpClient, @Inject(LOCAL_STORAGE) private storage: StorageService) { }

  newHome: NewHome = new NewHome();

  dieuthinsi: FormControl = new FormControl();
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



  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

  searchResults: NominatimResponse[];

  mouseX: number;
  mouseY: number;

  mymap: any;


  long: number = 23.729762;
  lat: number = 37.973393;

  allComplete: boolean = false;

  task: Task = {
    name: 'Επιλογή Όλων',
    completed: false,
    // color: 'primary',
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

    this.mymap.on('click', e => {
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
        // console.log(data.display_name);
        this.dieuthinsi.setValue(data.display_name);
      });

    });
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


  save() {
    let my_info = this.storage.get('my_info');
    this.newHome.address = this.dieuthinsi.value;
    this.newHome.latitude = this.lat.toString();
    this.newHome.longtitude = this.long.toString();
    this.newHome.maxPeople = this.atoma.value;
    this.newHome.openBooking = this.range.value.start;
    this.newHome.closeBooking = this.range.value.end;
    this.newHome.extraPersonPrice = this.epipleontimi.value;
    this.newHome.price = this.timi.value;
    this.newHome.ownerUsername = my_info.username;
    this.newHome.ownerId = my_info.id;
    this.newHome.description = this.perigrafi.value;
    this.newHome.transport = this.odigies.value;
    this.newHome.squareMeters = this.tetragonika.value;
    this.newHome.overnightPrice = this.timi.value;
    this.newHome.minOvernights = this.min_dianikt.value;
    this.newHome.bedrooms = this.bedrooms.value;
    this.newHome.beds = this.beds.value;
    this.newHome.bathrooms = this.bathrooms.value;
    this.newHome.transport = this.odigies.value;
    this.newHome.neighborhood = this.geitonia.value;
    this.newHome.houseRules = this.kanonismoi.value;
    this.newHome.events = this.events.value;
    this.newHome.ac = this.task.subtasks[0].completed;
    this.newHome.heating = this.task.subtasks[1].completed;
    this.newHome.wifi = this.task.subtasks[2].completed;
    this.newHome.elevator = this.task.subtasks[3].completed;
    this.newHome.kitchen = this.task.subtasks[4].completed;
    this.newHome.parking = this.task.subtasks[5].completed;
    this.newHome.tv = this.task.subtasks[6].completed;
    this.newHome.smoking = this.task.subtasks[7].completed;
    this.newHome.pets = this.task.subtasks[8].completed;
    this.newHome.events = this.events.value;
    this.newHome.homeCategory = new HomeCategory();
    this.newHome.homeCategory.homeCategoryTitle = this.eidos.value;

    let url = 'http://localhost:8080/api/host/home/new';
    let header = new HttpHeaders({'Authorization': 'Bearer ' + this.storage.get('token').accessToken});

    this.http.post<Response>(url, this.newHome, {headers: header} ).subscribe(data =>{});

  }

  updateAllComplete() {
    this.allComplete = this.task.subtasks != null && this.task.subtasks.every(t => t.completed);
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



}