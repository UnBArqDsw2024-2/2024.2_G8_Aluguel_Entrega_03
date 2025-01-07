import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ForgotPasswordService } from '../../../../services/forgot-password.service';

@Component({
  selector: 'app-request-email',
  imports: [],
  templateUrl: './request-email.component.html',
  styleUrl: './request-email.component.scss',
})
export class RequestEmailComponent implements OnInit {
  userForm!: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private forgotPasswordService: ForgotPasswordService
  ) {}

  ngOnInit(): void {
    this.userForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      const email = this.userForm.value.email;
      this.forgotPasswordService.requestPasswordReset(email).subscribe({
        next: (response: any) => {
          console.log('Password reset email sent successfully');
          console.log(response);

          // Navigate to the component where the user can input the code sent to their email
          this.router.navigate(['/forgot-password/verify-code']);
        },
        error: (error: any) => {
          console.error('Error sending password reset email', error);
        },
      });
    } else {
      console.log('Formulário inválido');
      // TODO: Show error message to user
    }
  }
}
