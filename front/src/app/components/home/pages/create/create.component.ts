import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { FooterComponent } from '../../../../shared/components/footer/footer.component';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
  imports: [
    ReactiveFormsModule,
    HeaderComponent,
    FooterComponent,
    NgxMaskDirective,
  ],
  providers: [provideNgxMask()],
})
export class CreateComponent implements OnInit {
  anuncioForm!: FormGroup;
  imagensSelecionadas: File[] = [];

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    // Inicializando o FormGroup
    this.anuncioForm = this.fb.group({
      // Dados do Imóvel
      tipoImovel: ['', Validators.required],
      quantidadeQuartos: [null, Validators.required],
      quantidadeBanheiros: [null, Validators.required],
      vagasGaragem: [null],

      // Endereço
      cep: ['', Validators.required],
      rua: ['', Validators.required],
      bairro: ['', Validators.required],
      numero: ['', Validators.required],
      cidade: ['', Validators.required],
      estado: ['', Validators.required],
      logradouro: [''],

      // Dados do Anúncio
      titulo: ['', Validators.required],
      tipoAnuncio: ['', Validators.required],
      valorAluguel: [null],
      valorCondominio: [null],
      valorIPTU: [null],
    });
  }

  // Método chamado quando o usuário seleciona arquivos
  isDragging = false;
  selectedFiles: File[] = [];

  // Método chamado ao arrastar algo para o campo
  onDragOver(event: DragEvent): void {
    event.preventDefault();
    this.isDragging = true;
  }

  // Método chamado ao sair do campo de upload
  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    this.isDragging = false;
  }

  // Método chamado ao soltar arquivos no campo
  onDrop(event: DragEvent): void {
    event.preventDefault();
    this.isDragging = false;

    if (event.dataTransfer?.files) {
      const files = Array.from(event.dataTransfer.files);
      this.selectedFiles.push(...files);
      console.log(
        'Arquivos selecionados via drag-and-drop:',
        this.selectedFiles
      );
    }
  }

  // Método chamado ao selecionar arquivos via input
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files) {
      const files = Array.from(input.files);
      this.selectedFiles.push(...files);
      console.log('Arquivos selecionados via botão:', this.selectedFiles);
    }
  }

  // Método que envia o formulário
  onSubmit(): void {
    if (this.anuncioForm.valid) {
      // Aqui você pode enviar os dados para uma API, por exemplo
      const dadosAnuncio = this.anuncioForm.value;
      console.log('Formulário válido! Dados: ', dadosAnuncio);

      // As imagens selecionadas ficam em "this.imagensSelecionadas"
      console.log('Imagens:', this.imagensSelecionadas);

      // Exemplo de requisição (usando um service fictício):
      // this.meuService.cadastrarAnuncio(dadosAnuncio, this.imagensSelecionadas)
      //   .subscribe(() => alert('Anúncio cadastrado com sucesso!'));
      this.router.navigate(['/home']);
    } else {
      console.log('Formulário inválido, verifique os campos obrigatórios.');
    }
  }
}
