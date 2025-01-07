import { Routes } from '@angular/router';
import { CreateComponent } from './pages/create/create.component';
import { HomeComponent } from './pages/home/home.component';

export const HomeRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'anunciar', component: CreateComponent },
];
