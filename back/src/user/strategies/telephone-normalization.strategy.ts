import { UpdateStrategy } from './update-strategy.interface';

export class TelephoneNormalizationStrategy implements UpdateStrategy {
  execute(telephones: { number: string }[]): { number: string }[] {
    // Lógica para normalizar telefones
    return telephones.map((tel) => ({
      number: tel.number.replace(/[^0-9]/g, ''), // Remove caracteres não numéricos
    }));
  }
}
