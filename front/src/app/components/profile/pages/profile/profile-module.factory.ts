import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export class ProfileFormFactory {
  static createForm(fb: FormBuilder): FormGroup {
    return fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      site: [''],
      password: [''],
      confirmPassword: [''],
    });
  }
}
