import { Routes } from '@angular/router';
import { AuthRoutes } from './components/auth/auth.routes';
import { HomeRoutes } from './components/home/home.routes';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';

export const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  ...AuthRoutes,
  ...HomeRoutes,
  { path: 'esqueci-senha', component: ForgotPasswordComponent },
];
