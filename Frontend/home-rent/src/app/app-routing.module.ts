import { NgModule } from '@angular/core';
import {HomeComponent} from './home/home.component';
import {RouterModule, Routes} from '@angular/router';
import {WelcomeComponent} from './welcome/welcome.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {RegisterComponent} from './register/register.component';
import {AdminComponent} from './admin/admin.component';
import {AccountComponent} from './account/account.component';
import {SearchComponent} from './search/search.component';
import {UserInfoComponent} from './user-info/user-info.component';
import {NewHomeComponent} from './new-home/new-home.component';
import {MyhomesComponent} from './myhomes/myhomes.component';
import {UserRequestsComponent} from './user-requests/user-requests.component';
import {ResultsComponent} from './results/results.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'welcome',
    component: WelcomeComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'admin',
    component: AdminComponent
  },
  {
    path: 'account',
    component: AccountComponent
  },
  {
    path: 'search',
    component: SearchComponent
  },
  {
    path: 'myhomes',
    component: MyhomesComponent
  },
  {
    path: 'mod',
    component: MyhomesComponent
  },
  {
    path: 'newhome',
    component: NewHomeComponent
  },
  {
    path: 'userinfo',
    component: UserInfoComponent
  },
  {
    path: '',
    component: WelcomeComponent
  },
  {
    path: 'userinfo/:id',
    component: UserInfoComponent
  },
  {
    path: 'user-requests',
    component: UserRequestsComponent
  },
  {
    path: 'results',
    component: ResultsComponent
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
  ];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
