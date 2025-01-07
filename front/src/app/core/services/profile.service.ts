import { Injectable } from '@angular/core';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private userService: UserService) {}

  getProfile() {
    const profile = this.userService.getUser();
    return { profile };
  }
}
