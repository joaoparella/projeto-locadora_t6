import { Module } from '@nestjs/common';
import { UsuarioController } from './usuario.controller.js';
import { usuariosCadastrados } from './usuario.service.js';

@Module({
  imports: [],
  controllers: [UsuarioController],
  providers: [usuariosCadastrados],
})
export class UsuarioModule {}
