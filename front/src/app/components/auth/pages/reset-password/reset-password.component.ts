import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ForgotPasswordService } from '../../../../core/services/forgot-password.service';
import { SharedComponents } from '../../../../shared/shared.components';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, SharedComponents],
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm: FormGroup;
  token: string | null = null;
  successMessage = '';
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private forgotPasswordService: ForgotPasswordService
  ) {
    this.resetPasswordForm = this.fb.group({
      newPassword: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(
            '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&])[A-Za-z0-9@$!%*?&]{8,}'
          ),
        ],
      ]
    });
  }

  ngOnInit(): void {
    this.token = this.route.snapshot.queryParamMap.get('token');

    if (!this.token) {
      this.errorMessage = 'Token inválido ou ausente.';
    }
  }

  onSubmit(): void {
    if (this.resetPasswordForm.valid) {
      const newPassword = this.resetPasswordForm.value.newPassword;

      if (this.token) {
        this.forgotPasswordService
          .resetPassword(this.token, newPassword)
          .subscribe({
            next: () => {
              this.successMessage = 'Senha redefinida com sucesso!';
              this.errorMessage = '';

              setTimeout(() => this.router.navigate(['/login']), 3000);
            },
            error: (err: Error) => {
              this.errorMessage = err.message;
              this.successMessage = '';
            },
          });
      } else {
        this.errorMessage = 'Token inválido ou ausente.';
      }
    }
  }
}
