import { Controller, Get, Query } from '@nestjs/common';
import { BuscaService } from './busca.service';

@Controller('busca')
export class BuscaController {
  constructor(private readonly buscaService: BuscaService) {}

  @Get()
  async buscar(@Query() filtros: any) {
    return this.buscaService.buscar(filtros);
  }
}