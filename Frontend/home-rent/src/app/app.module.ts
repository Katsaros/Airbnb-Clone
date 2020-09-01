import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import {RouterModule} from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './header/header.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { NavbarModule, WavesModule, ButtonsModule, MDBBootstrapModule } from 'angular-bootstrap-md';
import { WelcomeComponent } from './welcome/welcome.component';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSelectModule} from '@angular/material/select';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatBadgeModule} from '@angular/material/badge';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatChipsModule} from '@angular/material/chips';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatRadioModule} from '@angular/material/radio';
import {MatNativeDateModule} from '@angular/material/core';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatTableModule} from '@angular/material/table';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TextFieldModule} from '@angular/cdk/text-field';
import { RegisterComponent } from './register/register.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AdminComponent } from './admin/admin.component';
import { HeaderUserComponent } from './header-user/header-user.component';
import { AccountComponent } from './account/account.component';
import { SearchComponent } from './search/search.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {HttpClientModule} from '@angular/common/http';
import { UserInfoComponent } from './user-info/user-info.component';
import { NewHomeComponent } from './new-home/new-home.component';
import { MyhomesComponent } from './myhomes/myhomes.component';
import {NominatimService} from './nominatim.service';
import { StorageServiceModule } from 'ngx-webstorage-service';
import { UserRequestsComponent } from './user-requests/user-requests.component';
import { ResultsComponent } from './results/results.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    WelcomeComponent,
    RegisterComponent,
    PageNotFoundComponent,
    AdminComponent,
    HeaderUserComponent,
    AccountComponent,
    SearchComponent,
    UserInfoComponent,
    NewHomeComponent,
    MyhomesComponent,
    UserRequestsComponent,
    ResultsComponent
  ],
    imports: [
        TextFieldModule,
        BrowserModule,
        RouterModule,
        NavbarModule,
        AppRoutingModule,
        MDBBootstrapModule.forRoot(),
        BrowserAnimationsModule,
        MatCardModule,
        MatFormFieldModule,
        WavesModule,
        ButtonsModule,
        MatInputModule,
        MatButtonModule,
        MatToolbarModule,
        MatIconModule,
        MatBadgeModule,
        MatSidenavModule,
        MatListModule,
        MatGridListModule,
        MatSelectModule,
        MatRadioModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatChipsModule,
        MatTooltipModule,
        MatTableModule,
        MatPaginatorModule,
        ReactiveFormsModule,
        FormsModule,
        MatCheckboxModule,
        HttpClientModule,
        StorageServiceModule
    ],
  exports: [
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatBadgeModule,
    MatListModule,
    MatGridListModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatRadioModule,
    MatDatepickerModule,
    MatChipsModule,
    MatTooltipModule,
    MatTableModule,
    MatPaginatorModule
  ],
  providers: [
    MatDatepickerModule,
      NominatimService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
