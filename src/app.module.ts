import { Module } from '@nestjs/common';
import { createObserveModule } from '@nestjs/observe';
import { UsuarioModule } from './usuario/usuario.module.js';

export const { ObserveModule, ObserveInstrument } = createObserveModule();

@Module({
  imports: [UsuarioModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
