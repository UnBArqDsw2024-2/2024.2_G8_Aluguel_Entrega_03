import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ForgotPasswordService } from '../../services/forgot-password.service';

@Component({
  selector: 'app-forgot-password',
  imports: [],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss',
})
export class ForgotPasswordComponent {
  forgotPasswordForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private forgotPasswordService: ForgotPasswordService,
    private router: Router
  ) {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit() {
    if (this.forgotPasswordForm.valid) {
      this.forgotPasswordService
        .requestPasswordReset(this.forgotPasswordForm.value.email)
        .subscribe({
          next: (): void => {
            alert('Password code sent to your email.');
            this.router.navigate(['/login']);
          },
          error: (err: any): void => {
            alert('Error sending password reset code.');
            console.error(err);
          },
        });
    }
  }
}
