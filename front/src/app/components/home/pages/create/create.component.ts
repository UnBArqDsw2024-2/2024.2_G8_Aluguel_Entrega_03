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

export class ListingFormFactory {
  static createForm(fb: FormBuilder): FormGroup {
    return fb.group({
      userCpfCnpj: ['123456789'],
      propertyType: ['', Validators.required],
      numberOfBedrooms: [null, Validators.required],
      numberOfBathrooms: [null, Validators.required],
      parkingSpaces: [null],
      address: fb.group({
        postalCode: ['', Validators.required],
        street: ['', Validators.required],
        neighborhood: ['', Validators.required],
        number: ['', Validators.required],
        city: ['', Validators.required],
        state: ['', Validators.required],
        logradouro: [''],
      }),
      titulo: ['', Validators.required],
      adType: ['', Validators.required],
      price: [null],
      condoFee: [null],
      propertyTax: [null],
      description: ['', Validators.required],
    });
  }
}

export class ListingAdapter {
  static adapt(apiResponse: any): any {
    return {
      userCpfCnpj: apiResponse.userCpfCnpj || '123456789',
      propertyType: apiResponse.propertyType,
      numberOfBedrooms: apiResponse.numberOfBedrooms,
      numberOfBathrooms: apiResponse.numberOfBathrooms,
      parkingSpaces: apiResponse.parkingSpaces,
      address: {
        postalCode: apiResponse.address.postalCode,
        street: apiResponse.address.street,
        neighborhood: apiResponse.address.neighborhood,
        number: apiResponse.address.number,
        city: apiResponse.address.city,
        state: apiResponse.address.state,
        logradouro: apiResponse.address.logradouro,
      },
      titulo: apiResponse.titulo,
      adType: apiResponse.adType,
      price: apiResponse.price,
      condoFee: apiResponse.condoFee,
      propertyTax: apiResponse.propertyTax,
      description: apiResponse.description,
    };
  }
}

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
  isDragging = false;
  selectedFiles: File[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {

    this.anuncioForm = ListingFormFactory.createForm(this.fb);


    this.apiService.get('listing/123456789').subscribe(
      (response) => {
        const adaptedData = ListingAdapter.adapt(response);
        this.anuncioForm.patchValue(adaptedData);
      },
      (error) => {
        console.error('Erro ao buscar dados do anúncio:', error);
      }
    );


    this.anuncioForm.valueChanges.subscribe((values) => {
      console.log('Alterações no formulário detectadas:', values);
    });
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    this.isDragging = true;
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    this.isDragging = false;
  }

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

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files) {
      const files = Array.from(input.files);
      this.selectedFiles.push(...files);
      console.log('Arquivos selecionados via botão:', this.selectedFiles);
    }
  }

  onSubmit(): void {
    console.log(this.anuncioForm);
    if (this.anuncioForm.valid) {
      const dadosAnuncio = this.anuncioForm.value;
      console.log('Formulário válido! Dados:', dadosAnuncio);

      this.apiService.post('property', dadosAnuncio).subscribe(
        (response) => {
          console.log('Resposta da API:', response);
        },
        (error) => {
          console.error('Erro ao enviar dados para a API:', error);
        }
      );
    } else {
      console.log('Formulário inválido, verifique os campos obrigatórios.');
    }
  }
}
