export class CreatePropertyDto {
  userCpfCnpj: string; // Para conectar com o User
  adType?: string;
  condoFee?: number;
  description?: string;
  propertyTax?: number;
  available?: boolean;
  numberOfBedrooms?: number;
  price?: number;
  parkingSpaces?: number;
  propertyType?: string;
  numberOfBathrooms?: number;

  address?: {
    neighborhood?: string;
    number?: string;
    street?: string;
    city?: string;
    state?: string;
    postalCode?: string;
  };
}
