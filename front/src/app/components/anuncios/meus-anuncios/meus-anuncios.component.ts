import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnuncioItemComponent } from '../anuncio-item/anuncio-item.component';
import { SharedComponents } from '../../../shared/shared.components';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { FooterComponent } from '../../../shared/components/footer/footer.component';

@Component({
  selector: 'app-meus-anuncios',
  templateUrl: './meus-anuncios.component.html',
  styleUrls: ['./meus-anuncios.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    AnuncioItemComponent,
    SharedComponents,
    HeaderComponent,
    FooterComponent,
  ],
})
export class MeusAnunciosComponent {
  anuncios = [
    {
      id: 1,
      titulo: 'Apartamento Moderno no Centro',
      descricao: 'Apartamento com 3 quartos, 2 banheiros e varanda.',
      endereco: {
        cep: '01000-000',
        rua: 'Rua Exemplo',
        bairro: 'Centro',
        numero: '123',
        cidade: 'São Paulo',
        estado: 'SP',
        logradouro: 'Avenida Paulista',
      },
      tipoAnuncio: 'Aluguel',
      tipoImovel: 'Apartamento',
      quantidadeQuartos: 3,
      quantidadeBanheiros: 2,
      metrosQuadrados: 120,
      imagem: 'https://via.placeholder.com/400x300', // URL da imagem do imóvel
    },
    {
      id: 2,
      titulo: 'Casa Espaçosa com Jardim',
      descricao: 'Casa com 4 quartos, 3 banheiros e grande jardim.',
      endereco: {
        cep: '02000-000',
        rua: 'Rua Jardim',
        bairro: 'Jardim Paulista',
        numero: '456',
        cidade: 'São Paulo',
        estado: 'SP',
        logradouro: 'Avenida Brasil',
      },
      tipoAnuncio: 'Venda',
      tipoImovel: 'Casa',
      quantidadeQuartos: 4,
      quantidadeBanheiros: 3,
      metrosQuadrados: 200,
      imagem: 'https://via.placeholder.com/400x300',
    },
    // Adicione mais anúncios conforme necessário
  ];
}
