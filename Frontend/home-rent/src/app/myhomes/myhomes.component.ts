import {Component, Inject, OnInit} from '@angular/core';
import {LOCAL_STORAGE, StorageService} from 'ngx-webstorage-service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-myhomes',
  templateUrl: './myhomes.component.html',
  styleUrls: ['./myhomes.component.css']
})
export class MyhomesComponent implements OnInit {

  constructor(@Inject(LOCAL_STORAGE) private storage: StorageService, private router: Router) { }

  ngOnInit(): void {

    let token = this.storage.get('token');
    if(token == undefined) {
      // console.log('NAI');
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
  }

}
