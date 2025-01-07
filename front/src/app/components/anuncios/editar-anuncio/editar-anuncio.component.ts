import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AnunciosFacadeService } from '../../../core/services/anuncios-facade.service';
import { ImovelInterface } from '../../home/interfaces/imovel.interface';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-editar-anuncio',
  templateUrl: './editar-anuncio.component.html',
  styleUrls: ['./editar-anuncio.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class EditarAnuncioComponent implements OnInit {
  anuncio!: ImovelInterface;
  form!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private anunciosFacade: AnunciosFacadeService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = idParam ? Number(idParam) : null;

    if (id === null || isNaN(id)) {
      alert('ID inválido!');
      this.router.navigate(['/meus-anuncios']);
      return;
    }

    this.anunciosFacade.obterAnuncioPorId(id).subscribe({
      next: (anuncio) => {
        if (anuncio) {
          this.anuncio = anuncio;
          this.iniciarForm();
        } else {
          alert('Anúncio não encontrado!');
          this.router.navigate(['/meus-anuncios']);
        }
      },
      error: (err) => console.error('Erro ao obter anúncio', err)
    });
  }

  iniciarForm() {
    this.form = this.fb.group({
      titulo: [this.anuncio.titulo],
      descricao: [this.anuncio.descricao],
      quantidadeQuartos: [this.anuncio.quantidadeQuartos],
      quantidadeBanheiros: [this.anuncio.quantidadeBanheiros],
      metrosQuadrados: [this.anuncio.metrosQuadrados],
      ativo: [this.anuncio.ativo]
      // Adicione outros campos conforme necessário
    });
  }

  onSalvar() {
    if (this.form.valid && this.anuncio.id !== undefined) {
      const id: number = Number(this.anuncio.id); // Assegure-se de que é number
      const dados: Partial<ImovelInterface> = this.form.value;
      this.anunciosFacade.atualizarAnuncio(id, dados);
      this.router.navigate(['/meus-anuncios']);
    }
  }

  onCancelar() {
    this.router.navigate(['/meus-anuncios']);
  }
}