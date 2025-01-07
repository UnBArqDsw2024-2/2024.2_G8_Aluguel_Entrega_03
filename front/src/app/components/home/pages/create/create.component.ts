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
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from '../../../../core/services/api.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
  imports: [
    ReactiveFormsModule,
    HeaderComponent,
    FooterComponent,
    NgxMaskDirective,
    HttpClientModule,
  ],
  providers: [provideNgxMask(), ApiService],
})
export class CreateComponent implements OnInit {
  anuncioForm!: FormGroup;
  imagensSelecionadas: File[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    // Inicializando o FormGroup
    this.anuncioForm = this.fb.group({
      userCpfCnpj: ['123456789'],
      // Dados do Imóvel
      propertyType: ['', Validators.required],
      numberOfBedrooms: [null, Validators.required],
      numberOfBathrooms: [null, Validators.required],
      parkingSpaces: [null],

      // Endereço
      address: this.fb.group({
        postalCode: ['', Validators.required],
        street: ['', Validators.required],
        neighborhood: ['', Validators.required],
        number: ['', Validators.required],
        city: ['', Validators.required],
        state: ['', Validators.required],
        logradouro: [''],
      }),

      // Dados do Anúncio
      titulo: ['', Validators.required],
      adType: ['', Validators.required],
      price: [null],
      condoFee: [null],
      propertyTax: [null],
      description: ['', Validators.required],
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
    console.log(this.anuncioForm);
    if (this.anuncioForm.valid) {
      // Aqui você pode enviar os dados para uma API, por exemplo
      const dadosAnuncio = this.anuncioForm.value;
      console.log('Formulário válido! Dados: ', dadosAnuncio);

      // As imagens selecionadas ficam em "this.imagensSelecionadas"
      console.log('Imagens:', this.imagensSelecionadas);

      this.apiService.post('property', dadosAnuncio).subscribe(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      console.log('Formulário inválido, verifique os campos obrigatórios.');
    }
  }
}
