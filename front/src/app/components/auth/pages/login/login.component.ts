import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ApiService } from '../../../../core/services/api.service';
import { Router, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { SharedComponents } from '../../../../shared/shared.components';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, HttpClientModule, SharedComponents],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  standalone: true,
})
export class LoginComponent {
  loginForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private router: Router
  ) {
    this.initForm();
  }

  ngOnInit(): void {}

  navigateToForgotPassword() {
    this.router.navigate(['/esqueceu-senha']);
  }

  navigateToRegister() {
    this.router.navigate(['/cadastro']);
  }

  initForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    const loginData = this.loginForm.value;

    this.apiService.post('auth/login', loginData).subscribe(
      (response: any) => {
        sessionStorage.setItem('authToken', response.token);

        // this.router.navigate(['/home']);
      },
      (error) => {
        console.error('Erro ao fazer login', error);
      }
    );
  }
}
