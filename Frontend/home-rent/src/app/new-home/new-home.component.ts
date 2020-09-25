import {Component, Inject, OnInit} from '@angular/core';
import {NominatimResponse} from '../nominati-response';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {NominatimService} from '../nominatim.service';
import {FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Home, HomeCategory, NewHome} from '../home';
import {LOCAL_STORAGE, StorageService} from 'ngx-webstorage-service';
import {Response} from '../response';
import {DomSanitizer} from '@angular/platform-browser';

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

  constructor(private route: ActivatedRoute, private sanitizer: DomSanitizer, private nominatimService: NominatimService, private router: Router, private http: HttpClient, @Inject(LOCAL_STORAGE) public storage: StorageService) { }

  newHome: NewHome = new NewHome();

  filesSelected: File;
  current_home: Home = undefined;
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
  // eidos: FormControl = new FormControl();

  extras;
  logged_in: boolean;
  imageUrl;

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

  searchResults: NominatimResponse[];

  mouseX: number;
  mouseY: number;

  mymap: any;
  disabled: boolean = false;

  accom: string[] = ['Full House', 'Private Room', 'Shared Room'];
  event: string[] = ['Yes', 'No'];

  selected_type: string = undefined;
  selected_event: string = undefined;

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

    if (this.storage.get('my_info') == null) {
      this.logged_in = false;
    } else {
      this.logged_in = true;
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
    this.dieuthinsi.setValue('');

    this.extras = this.route.snapshot.paramMap.get('extras');
    if(this.extras != null) {
      this.current_home = new Home();
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
      // this.events.setValue(this.current_home.events);
      // this.events.disable();
      this.task.subtasks[0].completed = this.current_home.ac
      this.task.subtasks[1].completed = this.current_home.heating;
      this.task.subtasks[2].completed = this.current_home.wifi;
      this.task.subtasks[3].completed =this.current_home.elevator;
      this.task.subtasks[4].completed = this.current_home.kitchen;
      this.task.subtasks[5].completed = this.current_home.parking;
      this.task.subtasks[6].completed = this.current_home.tv;
      this.task.subtasks[7].completed = this.current_home.smoking;
      this.task.subtasks[8].completed = this.current_home.pets;
      // this.eidos.setValue(this.current_home.homeCategory.homeCategoryTitle);
      // this.eidos.disable();

      this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(this.current_home.image));

      this.search();

      }
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
    this.newHome.longitude = this.long.toString();
    this.newHome.maxPeople = this.atoma.value;
    this.newHome.openBooking = new Date(this.range.value.start);
    this.newHome.closeBooking = new Date(this.range.value.end);
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
    // this.newHome.events = this.events.value;
    this.newHome.events = this.selected_event;
    this.newHome.ac = this.task.subtasks[0].completed;
    this.newHome.heating = this.task.subtasks[1].completed;
    this.newHome.wifi = this.task.subtasks[2].completed;
    this.newHome.elevator = this.task.subtasks[3].completed;
    this.newHome.kitchen = this.task.subtasks[4].completed;
    this.newHome.parking = this.task.subtasks[5].completed;
    this.newHome.tv = this.task.subtasks[6].completed;
    if(this.task.subtasks[7].completed) {
      this.newHome.smoking = "Yes";
    }
    else {
      this.newHome.smoking = "No";
    }
    if(this.task.subtasks[8].completed) {
      this.newHome.pets = "Yes";
    }
    else {
      this.newHome.pets = "No";
    }
    // this.newHome.pets = this.task.subtasks[8].completed;
    this.newHome.events = this.selected_event;
    this.newHome.homeCategory = new HomeCategory();
    this.newHome.homeCategory.homeCategoryTitle = this.selected_type;
    this.newHome.reservations = [];
    this.newHome.image = null;
    // console.log(this.newHome);

    if(this.current_home == undefined) {
      // create new home
      let url = 'http://localhost:8080/api/host/home/new';
      let header = new HttpHeaders({'Authorization': 'Bearer ' + this.storage.get('token').accessToken});

      // console.log(this.newHome);
      this.http.post<Home>(url, this.newHome, {headers: header} ).subscribe(data =>{
        this.onUpload(data.id);
      });
    }
    else {
      // update home
      let url = 'http://localhost:8080/api/host/home/update';
      let header = new HttpHeaders({'Authorization': 'Bearer ' + this.storage.get('token').accessToken});
      this.http.put<Response>(url, this.newHome, {headers: header} ).subscribe(data =>{
        console.log(data);
        alert('Update Home successfully!');
        this.router.navigate(['/myhomes']);
      });
    }
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

  change() {
    this.disabled = !this.disabled;
    this.dieuthinsi.enable();
    this.atoma.enable();
    this.epipleontimi.enable();
    this.timi.enable();
    this.perigrafi.enable();
    this.odigies.enable();
    this.tetragonika.enable();
    this.min_dianikt.enable();
    this.bedrooms.enable();
    this.beds.enable();
    this.bathrooms.enable();
    this.geitonia.enable();
    this.kanonismoi.enable();
    // this.events.enable();
    // this.eidos.enable();
  }

  delete() {
    let url = 'http://localhost:8080/api/host/home/' + this.extras + '/delete';
    let header = new HttpHeaders({'Authorization': 'Bearer ' + this.storage.get('token').accessToken});
    this.http.delete<any>(url, {headers: header} ).subscribe(data =>{
      this.router.navigate(['/myhomes']);
    });
  }

  addImage(event) {
    this.filesSelected = event.target.files[0];
  }

  onUpload(id) {
    const formData: FormData = new FormData();
    formData.append('imagefile', this.filesSelected, this.filesSelected.name);
    this.http.post('localhost:8080/api/host/home/' + id.toString() + '/image', formData, {responseType: 'text' as 'json'}).subscribe( data => {
    });
  }
}