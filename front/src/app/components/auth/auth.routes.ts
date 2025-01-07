import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ForgotPasswordComponent } from './pages/password/forgot-password.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';

export const AuthRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'cadastro', component: RegisterComponent },
  { path: 'esqueceu-senha', component: ForgotPasswordComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
];
