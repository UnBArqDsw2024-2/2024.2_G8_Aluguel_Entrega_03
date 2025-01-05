import { Routes } from '@angular/router';
import { AuthRoutes } from './components/auth/auth.routes';
import { HomeRoutes } from './components/home/home.routes';
import { ProfileRoutes } from './components/profile/profile.routes';

export const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  ...AuthRoutes,
  ...HomeRoutes,
  ...ProfileRoutes,
];
