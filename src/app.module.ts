import { Module } from '@nestjs/common';
import { createObserveModule } from '@nestjs/observe';
import { UsuarioModule } from './usuario/usuario.module.js';
import { FilmesModule } from './filme/filme.module.js';

export const { ObserveModule, ObserveInstrument } = createObserveModule();

@Module({
  imports: [UsuarioModule,FilmesModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
