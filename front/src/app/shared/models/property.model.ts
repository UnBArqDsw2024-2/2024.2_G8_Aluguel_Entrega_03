export interface Property {
    image: string;
    type: string;
    location: string;
    rooms: number;
    size: number;
    price: number;
  }
  
  export class Apartment implements Property {
    constructor(
      public image: string,
      public location: string,
      public rooms: number,
      public size: number,
      public price: number
    ) {
      this.type = 'Apartamento';
    }
    type: string;
  }
  
  export class House implements Property {
    constructor(
      public image: string,
      public location: string,
      public rooms: number,
      public size: number,
      public price: number
    ) {
      this.type = 'Casa';
    }
    type: string;
  }
  