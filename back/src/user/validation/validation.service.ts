import { BadRequestException } from '@nestjs/common';
import { Validation } from './validation';

export class ValidationService {
  private strategy: Validation;

  setStrategy(strategy: Validation) {
    this.strategy = strategy;
  }

  validate(value: string): boolean {
    if (!this.strategy) {
      throw new BadRequestException(
        'Nenhuma estratégia de validação definida.',
      );
    }
    return this.strategy.validate(value);
  }
}
