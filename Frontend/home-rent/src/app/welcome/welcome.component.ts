import {Component, Input, OnInit, Output, EventEmitter, Inject} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {LOCAL_STORAGE, StorageService} from 'ngx-webstorage-service';
import {Home} from '../home';
import {DomSanitizer} from '@angular/platform-browser';


@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})


export class WelcomeComponent implements OnInit {

    homes_i = [0, 1, 2, 3, 4];
    times: number = -1;
    synoikia = new FormControl();
    poli = new FormControl();
    xora = new FormControl();
    visitors = new FormControl();

    selected: Home = undefined;
    homes: Home[] = [];
    my_info: any;
    imageUrl = [];
    stars: string[] = [];

    logged_in: boolean;
    constructor( private sanitizer: DomSanitizer, @Inject(LOCAL_STORAGE) private storage: StorageService, private router: Router, private http: HttpClient) { }

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

      this.http.get<Home[]>('http://localhost:8080/api/public/homes/all').subscribe(data => {
          this.homes = data;

          for(let i = 0; i < this.homes.length; i ++) {
              if(this.homes[i].image != null) {
                  this.imageUrl.push(this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(this.homes[i].image)));
              }
              else {
                  this.imageUrl.push(null);
              }

              // if(this.homes[i].reservations.length != 0) {
              //     this.http.get<any>('http://localhost:8080/api/public/home/' + this.homes[i].id + '/reviews').subscribe(data => {
              //         this.stars.push(data.average.toString());
              //     });
              // }
              // else {
              //     this.stars.push('-');
              // }
          }
      });


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

    openDialog(card): void {
        this.storage.set('home', card);
        this.router.navigate(['/newhome', card.id]);
    }

    go_prev() {
      if(this.homes_i[0] > 0) {
          for(let i = 0; i < this.homes_i.length; i++) {
              if(this.homes_i[i]- this.homes_i.length > 0) {
                  this.homes_i[i] = this.homes_i[i] - this.homes_i.length;
              }
              else {
                  this.homes_i[i] = i;
              }
          }
      }
    }

    go_next() {
        if(this.homes_i[this.homes_i.length - 1] < this.homes_i.length - 1) {
            for(let i = 0; i < this.homes_i.length; i++) {
                if(this.homes_i[i] + this.homes_i.length < this.homes_i.length - 1) {
                    this.homes_i[i] = this.homes_i[i] + this.homes_i.length;
                }
                else {
                    this.homes_i[i] = i;
                }
            }
        }
    }

}
