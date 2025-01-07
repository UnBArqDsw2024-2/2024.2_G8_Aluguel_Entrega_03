import { Routes } from '@angular/router';
import { ListingComponent } from '../listing/listing.component';
import { HomeComponent } from './pages/home/home.component';

export const HomeRoutes: Routes = [
    { path: 'anunciar', component: ListingComponent },
    { path: 'home', component: HomeComponent }
];
