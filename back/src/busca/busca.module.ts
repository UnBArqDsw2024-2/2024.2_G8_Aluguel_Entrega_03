import { Module } from '@nestjs/common';
import { BuscaController } from './busca.controller';
import { BuscaService } from './busca.service';
import { FiltroFactory } from './busca.factory';

@Module({
  controllers: [BuscaController], // Registra o controlador
  providers: [BuscaService, FiltroFactory], // Registra os serviços e a fábrica
  exports: [BuscaService], // Exporta o serviço caso outros módulos precisem usá-lo
})
export class BuscaModule {}