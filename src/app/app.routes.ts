import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './utilities/page-not-found.component';

export const routes: Routes = [
  { path: 'welcome', component: HomeComponent },
  { path: 'flights',
    loadComponent: () => import('./flights/flights-select/flights-select.component').then(c => c.FlightsSelectComponent)
  },
  
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }];