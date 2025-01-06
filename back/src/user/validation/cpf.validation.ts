import { Validation } from './validation';

export class CPFValidation implements Validation {
  validate(cpf: string): boolean {
    return cpf.length === 11 && /^\d+$/.test(cpf);
  }
}
