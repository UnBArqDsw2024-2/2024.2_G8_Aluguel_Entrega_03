import { Component } from '@angular/core';
import { SharedComponents } from '../../../../shared/shared.components';

@Component({
  selector: 'app-register',
  imports: [SharedComponents],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  standalone: true,
})
export class RegisterComponent {
  iconLogo = '../../../../../assets/icons/hosthub_logo.png';
}
