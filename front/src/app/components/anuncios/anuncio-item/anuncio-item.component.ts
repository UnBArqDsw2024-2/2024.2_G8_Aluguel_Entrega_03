import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-anuncio-item',
  templateUrl: './anuncio-item.component.html',
  styleUrls: ['./anuncio-item.component.css'],
  standalone: true
})
export class AnuncioItemComponent {
  @Input() anuncio: any; // Defina a interface apropriada para o anúncio
}
