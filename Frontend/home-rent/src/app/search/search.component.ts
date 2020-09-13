import {ChangeDetectorRef, Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {Observable} from 'rxjs';
import {MatTableDataSource} from '@angular/material/table';
import {Home} from '../home';
import {Form, FormControl, FormGroup} from '@angular/forms';
import {NominatimService} from '../nominatim.service';
import {LOCAL_STORAGE, StorageService} from 'ngx-webstorage-service';
import {Router} from '@angular/router';
import {HttpClient, HttpParams} from '@angular/common/http';
import {MatDialog} from '@angular/material/dialog';
import {Task} from '../new-home/new-home.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  obs: Observable<any>;
  dataSource: MatTableDataSource<Home>;

  selected: Home = undefined;
  homes: Home[] = [];
  my_info: any;
  user: boolean = false;
  logged_in: boolean;
  allComplete: boolean = false;
  allComplete1: boolean = false;
  timi: FormControl = new FormControl();
  type: FormControl = new FormControl();
  selected_type: string = undefined;

  task: Task = {
    name: 'Επιλογή Όλων',
    completed: false,
    subtasks: [
      {name: 'A/C', completed: false},
      {name: 'Θέρμανση', completed: false},
      {name: 'WiFi', completed: false},
      {name: 'Ασανσέρ', completed: false},
      {name: 'Κουζίνα', completed: false},
      {name: 'Parking', completed: false},
      {name: 'TV', completed: false},
      // {name: 'Καπνίζοντες', completed: false},
      // {name: 'Κατοικίδια', completed: false},
    ]
  };

  accom: string[] = ['Full House', 'Private Room', 'Shared Room'];
// }

  // accom: Task = {
  //   name: 'Επιλογή Όλων',
  //   completed: false,
  //   subtasks: [
  //     {name: 'Private Room', completed: false},
  //     {name: 'Shared Room', completed: false},
  //     {name: 'Full House', completed: false},
  //   ]
  // };


  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

  constructor(private nominatimService: NominatimService, @Inject(LOCAL_STORAGE) private storage: StorageService, private router: Router,
              private http: HttpClient, private changeDetectorRef: ChangeDetectorRef, private dialog: MatDialog) {
  }

  ngOnInit(): void {

    this.my_info = this.storage.get('my_info');
    if (this.my_info == null) {
      this.logged_in = false;
    } else {
      this.logged_in = true;
    }

    this.search();
  }

  search() {
    let url = this.storage.get('url');

    this.http.get<any>(url).subscribe(data => {
      this.homes = data.homes;
      console.log(this.homes);

    });
  }

  openDialog(card): void {
    this.storage.set('home', card);
    this.storage.set('dates', this.range);
    this.router.navigate(['/home_info', card.id]);
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

  newFilters() {

    let url = 'http://localhost:8080/api/public/homes/more';
    let params = new HttpParams();

    if(this.selected_type != undefined) {
      params = params.append('type', this.selected_type);
    }

    if (this.task.subtasks[0].completed) {
      params = params.append('ac', 'true');
    }
    if (this.task.subtasks[1].completed) {
      params = params.append('heating', 'true');
    }
    if (this.task.subtasks[2].completed) {
      params = params.append('wifi', 'true');
    }
    if (this.task.subtasks[3].completed) {
      params = params.append('elevator', 'true');
    }
    if (this.task.subtasks[4].completed) {
      params = params.append('kitchen', 'true');
    }
    if (this.task.subtasks[5].completed) {
      params = params.append('parking', 'true');
    }
    if (this.task.subtasks[6].completed) {
      params = params.append('tv', 'true');
    }
    if (this.timi.value != null) {
      params = params.append('maxPrice', this.timi.value);
    }

    let body = {
      homes: this.homes
    }
    this.http.post<any>(url, body,{params: params}).subscribe(data => {
      this.homes = data.homes;
      console.log(this.homes);

    });

  }
}
