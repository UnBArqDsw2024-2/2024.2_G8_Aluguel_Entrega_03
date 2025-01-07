import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ApiService } from '../../../../core/services/api.service';
import { SharedComponents } from '../../../../shared/shared.components';

export class ProfileFormFactory {
  static createForm(fb: FormBuilder): FormGroup {
    return fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      site: ['', Validators.required],
      phone: ['', Validators.required],
    });
  }
}

export class UserAdapter {
  static adapt(apiResponse: any): any {
    return {
      name: apiResponse.name,
      email: apiResponse.email,
      site: apiResponse.site,
      phone: apiResponse.phone,
    };
  }
}

@Component({
  selector: 'app-profile',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedComponents,
  ],
  providers: [ApiService],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  profileForm!: FormGroup;
  showDeleteModal = false;

  constructor(private fb: FormBuilder, private apiService: ApiService) {}

  ngOnInit(): void {
    this.profileForm = ProfileFormFactory.createForm(this.fb);

    this.apiService.get('users/123456789').subscribe(
      (response) => {
        const adaptedData = UserAdapter.adapt(response);
        this.profileForm.patchValue(adaptedData);
      },
      (error) => {
        console.error(error);
      }
    );

    this.profileForm.valueChanges.subscribe((values) => {
      console.log('Mudanças no formulário detectadas:', values);
    });
  }

  openDeleteModal() {
    this.showDeleteModal = true;
  }

  closeDeleteModal() {
    this.showDeleteModal = false;
  }

  confirmDeleteAccount() {
    this.apiService.delete('users', '123456789').subscribe(
      (response) => {
        console.log('Conta excluída com sucesso!', response);
        this.closeDeleteModal();
      },
      (error) => {
        console.error('Erro ao excluir conta:', error);
        this.closeDeleteModal();
      }
    );
  }
}
