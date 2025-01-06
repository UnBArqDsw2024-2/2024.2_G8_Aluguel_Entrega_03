import { Validation } from './validation';

export class CNPJValidation implements Validation {
  validate(cnpj: string): boolean {
    return cnpj.length === 14 && /^\d+$/.test(cnpj);
  }
}
