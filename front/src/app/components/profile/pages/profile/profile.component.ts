import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { ApiService } from '../../../../core/services/api.service';
import { ProfileFormFactory } from './profile-module.factory';
import { UserAdapter } from './user.adapter';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  profileForm!: FormGroup;

  constructor(private fb: FormBuilder, private apiService: ApiService) {}

  ngOnInit(): void {
    this.profileForm = ProfileFormFactory.createForm(this.fb);

    this.apiService.get('users/123456789').subscribe({
      next: (response) => {
        const adaptedData = UserAdapter.adapt(response);
        this.profileForm.patchValue(adaptedData);
      },
      error: (error) => {
        console.error(error);
      },
    });

    this.profileForm.valueChanges.subscribe((values) => {
      console.log('Mudanças no formulário detectadas:', values);
    });
  }
}
