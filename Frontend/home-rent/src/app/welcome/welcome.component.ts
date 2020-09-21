import {Component, Input, OnInit, Output, EventEmitter, Inject} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Search} from '../search';
import {Users} from '../users';
import {HttpClient} from '@angular/common/http';
import {LOCAL_STORAGE, StorageService} from 'ngx-webstorage-service';

declare var ol: any;

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})


export class WelcomeComponent implements OnInit {

    synoikia = new FormControl();
    poli = new FormControl();
    xora = new FormControl();
    visitors = new FormControl();

    logged_in: boolean;
    constructor(@Inject(LOCAL_STORAGE) private storage: StorageService, private router: Router, private http: HttpClient) { }

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

  ngOnInit(): void {
      if(this.storage.get('my_info') == null) {
          this.logged_in = false;
          this.router.navigate(['/']);
      }
      else {
          this.logged_in = true;
          this.router.navigate(['/welcome']);
      }
  }

  search() {
    let long: number;
    let lat: number;

      this.http.get<any>('https://api.opencagedata.com/geocode/v1/json?key=cfd032737bac482c9b20abb4ffdc3cb2&q='
          + this.synoikia.value + ',' + this.poli.value + ',' + this.xora.value).subscribe(data => {
               long = Number(data.results[0].annotations.DMS.lng.split(' ')[0].split('\xB0')[0]) +
                  Number(data.results[0].annotations.DMS.lng.split(' ')[1].split('\'')[0])/60 +
                  Number(data.results[0].annotations.DMS.lng.split(' ')[2].split('\'\'')[0])/3600;

           lat = Number(data.results[0].annotations.DMS.lat.split(' ')[0].split('\xB0')[0]) +
              Number(data.results[0].annotations.DMS.lat.split(' ')[1].split('\'')[0])/60 +
              Number(data.results[0].annotations.DMS.lat.split(' ')[2].split('\'\'')[0])/3600;
              console.log(lat);


          let url = 'http://localhost:8080/api/public/homes?people=';
          url += this.visitors.value.toString();
          url += '&latitude=' + lat;
          url += '&longitude=' + long;

          url += '&arrivalDate=' + this.range.value.start.getFullYear().toString() +'-'+
              Number(this.range.value.start.getMonth() + 1).toString() + '-' +
              this.range.value.start.getDate().toString();
          url += '&departureDate='+ this.range.value.end.getFullYear().toString() +'-'+
              Number(this.range.value.end.getMonth() + 1).toString() + '-' +
              this.range.value.end.getDate().toString();

          this.storage.set('url', url);

          this.storage.set('dates', {start: this.range.value.start, end: this.range.value.end})

          this.router.navigate(['/search']);
    });

  }





}
