import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedComponents } from '../../../../shared/shared.components';
import { ForgotPasswordService } from '../../../../core/services/forgot-password.service';

interface PasswordResetResponse {
  message?: string;
}
interface PasswordResetError {
  message: string;
}
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, SharedComponents], // Adicione CommonModule e ReactiveFormsModule
})
export class ForgotPasswordComponent {
  forgotPasswordForm: FormGroup;
  showMessage = false;
  message = '';
  errorMessage = '';
  sucessMessage = '';

  constructor(
    private fb: FormBuilder,
    private forgotPasswordService: ForgotPasswordService
  ) {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit() {
    if (this.forgotPasswordForm.valid) {
      const email = this.forgotPasswordForm.value.email;
      console.log('E-mail enviado para recuperação:', email);

      this.forgotPasswordService.requestPasswordReset(email).subscribe({
        next: (response: PasswordResetResponse) => {
          console.log('Resposta do servidor:', response);

          this.message = response.message ?? 'E-mail enviado com sucesso!';
          this.showMessage = true;
          this.errorMessage = '';
          setTimeout(() => (this.showMessage = false), 5000);

          if (response.message) {
            window.location.href = response.message;
          }
        },
        error: (err: PasswordResetError) => {
          console.error('Erro ao enviar o e-mail de recuperação:', err);
          this.errorMessage = err.message;
          this.message = '';
        },
      });
      this.showMessage = true;

      setTimeout(() => {
        this.showMessage = false;
      }, 5000);
    } else {
      console.error('Formulário inválido');
    }
  }
}
