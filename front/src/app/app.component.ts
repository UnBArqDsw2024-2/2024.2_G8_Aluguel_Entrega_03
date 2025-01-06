import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SharedComponents } from './shared/shared.components';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ...SharedComponents],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'front';
}
