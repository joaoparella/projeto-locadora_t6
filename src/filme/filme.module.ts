import { Module } from '@nestjs/common';
import { FilmeController } from './filme.controller.js';
import { FilmesArmazenados } from './filme.service.js';

@Module({
  imports: [],
  controllers: [FilmeController],
  providers: [FilmesArmazenados],
})
export class FilmesModule {}

//TODO:
//1 - Criar arquivos e pastas - ok
//2 - Entity - ok
//3 - Service - OK
// 3.1 - DTOS - ok 
//4 - Controller - ok 
//5 - Module - ok 
//6 - Modificar arquivo app.module.ts - ok 