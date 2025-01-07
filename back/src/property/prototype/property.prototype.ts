export class PropertyPrototype {
    id: number;
    adType: string;
    condoFee: number;
    description: string;
    propertyTax: number;
    available: boolean;
    numberOfBedrooms: number;
    price: number;
    parkingSpaces: number;
    propertyType: string;
    numberOfBathrooms: number;
    userCpfCnpj: string;
    status: string;
    address: {
      neighborhood: string;
      number: string;
      street: string;
      city: string;
      state: string;
      postalCode: string;
    };
  
    clone(): PropertyPrototype {
      return Object.assign(new PropertyPrototype(), this);
    }
  }
  