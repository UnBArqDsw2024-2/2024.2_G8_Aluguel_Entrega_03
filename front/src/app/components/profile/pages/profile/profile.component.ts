import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ApiService } from '../../../../core/services/api.service';
import { HttpClientModule } from '@angular/common/http';
import { SharedComponents } from '../../../../shared/shared.components';

@Component({
  selector: 'app-profile',
  imports: [ReactiveFormsModule, HttpClientModule, SharedComponents],
  providers: [ApiService],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  profileForm!: FormGroup;

  constructor(private fb: FormBuilder, private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.get('users/123456789').subscribe(
      (response) => {
        this.profileForm.patchValue({
          name: response.name,
          email: response.email,
          password: '', // Password should not be pre-filled for security reasons
          confirmPassword: '', // Confirm password should also be empty
          site: response.site,
          phone: response.phone,
        });
      },
      (error) => {
        console.error(error);
      }
    );
    this.profileForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      site: ['', Validators.required],
      phone: ['', Validators.required],
    });
  }
}
