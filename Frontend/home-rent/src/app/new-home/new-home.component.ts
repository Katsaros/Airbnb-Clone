import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {BASE_NOMINATIM_URL, DEFAULT_VIEW_BOX} from '../app-constants';
import {NominatimResponse} from '../nominati-response';
import {HttpClient} from '@angular/common/http';
import {NominatimService} from '../nominatim.service';
import {FormControl, FormGroup} from '@angular/forms';

declare var ol: any;

@Component({
  selector: 'app-new-home',
  templateUrl: './new-home.component.html',
  styleUrls: ['./new-home.component.css']
})

export class NewHomeComponent implements OnInit {

  constructor(private nominatimService: NominatimService) { }

  latitude: number = 37.994785;
  longitude: number = 23.726975;

  dieuthinsi: FormControl = new FormControl();
  odigies: FormControl = new FormControl();
  atoma: FormControl = new FormControl();

  timi: FormControl = new FormControl();
  epipleontimi: FormControl = new FormControl();


  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });
  searchResults: NominatimResponse[];

  mouseX: number;
  mouseY: number;

  mymap: any;

  ngOnInit() {


    var mousePositionControl = new ol.control.MousePosition({
      coordinateFormat: ol.coordinate.createStringXY(4),
      projection: 'EPSG:4326',
      // comment the following two lines to have the mouse position
      // be placed within the map.
      // className: 'custom-mouse-position',
      // target: document.getElementById('mouse-position'),
      // undefinedHTML: '&nbsp;'
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
        center: ol.proj.fromLonLat([this.longitude, this.latitude]),
        zoom: 8
      })
    });

    this.mymap.on('click', e => {
      let coordinates = ol.proj.transform(e.coordinate, 'EPSG:3857', 'EPSG:4326');
      console.log(coordinates);


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

      console.log(this.mymap.getLayers().N);

      this.mymap.addLayer(layer);
    });
  }

  addressLookup(event: any) {
    let address = event.target.value;
    if (address.length > 3) {
      this.nominatimService.addressLookup(address).subscribe(results => {
        this.searchResults = results;
      });
    } else {
      this.searchResults = [];
    }

    console.log(this.searchResults);
    // this.onSearch.emit(this.searchResults);
  }


}