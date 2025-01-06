import { UpdateStrategy } from './update-strategy.interface';

export class CPFValidationStrategy implements UpdateStrategy {
  execute(cpf: string): boolean {
    // Lógica de validação de CPF
    const isValid = cpf && cpf.length === 11; // Exemplo simplificado
    if (!isValid) {
      throw new Error('CPF inválido');
    }
    return isValid;
  }
}
