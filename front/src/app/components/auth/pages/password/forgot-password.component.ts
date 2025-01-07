import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedComponents } from '../../../../shared/shared.components';

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

  constructor(private fb: FormBuilder) {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit() {
    if (this.forgotPasswordForm.valid) {
      const email = this.forgotPasswordForm.value.email;
      console.log('E-mail enviado para recuperação:', email);

      this.showMessage = true;

      setTimeout(() => {
        this.showMessage = false;
      }, 5000);
    } else {
      console.error('Formulário inválido');
    }
  }
}
