import { Routes } from '@angular/router';
import { AuthRoutes } from './components/auth/auth.routes';
import { HomeRoutes } from './components/home/home.routes';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { AnunciosRoutes } from './components/anuncios/anuncios.routes';

export const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  ...AuthRoutes,
  ...HomeRoutes,
  ...AnunciosRoutes,
  { path: 'esqueci-senha', component: ForgotPasswordComponent },
];
