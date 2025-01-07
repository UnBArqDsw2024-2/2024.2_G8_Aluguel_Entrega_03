import { Routes } from '@angular/router';
import { AuthRoutes } from './components/auth/auth.routes';
import { HomeRoutes } from './components/home/home.routes';
import { ProfileRoutes } from './components/profile/profile.routes';
import { AnunciosRoutes } from './components/anuncios/anuncios.routes';

export const routes: Routes = [
  { path: '', redirectTo: '/anunciar', pathMatch: 'full' },
  ...AuthRoutes,
  ...HomeRoutes,
  ...ProfileRoutes,
  ...AnunciosRoutes
];
