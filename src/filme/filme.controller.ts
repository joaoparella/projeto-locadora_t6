import { Body, Controller, Post } from "@nestjs/common";
import { FilmesArmazenados } from "./filme.service.js";
import { criaFilmeDTO } from "./dto/criaFilme.dto.js";

@Controller('/filmes')
export class FilmeController{  
    constructor(private filmes:FilmesArmazenados){
    }
    @Post()
    async cadastroFilme(@Body() dadosFilme: criaFilmeDTO){
        let retorno = this.filmes.AdicionarFilme(dadosFilme);
        if (retorno){
            return {
                message:"cadastro efetuado com sucesso",
                id:retorno
            }
        }else{
            return {
                message:"cadastro não efetuado",
                id:null
            }
        }
    }

    @Get()
    async retornarUsuarios(){
        return {
            message:"Consulta efetuada",
            usuarios: this.usuarios.retornaUsuarios()
        }
    }

    @Get('/:id')
    async retornarUsuarioID(@Param('id') id: string){
       // fazer consulta por id
       let resultado = this.usuarios.retornaUsuarioID(id);

       if (resultado){
            return {
                message:"usuario localizado",
                id:resultado
            }
        }else{
            return {
                message:"usuario não localizado",
                id:null
            }
        }
    }

    @Put('/:id')
    async atualizaUsuario(@Param('id') id: string, @Body() novosDados:alteraUsuarioDTO){
        const retorno = await this.usuarios.atualizaUsuario(id,novosDados)
        if (retorno){
            return {
                message:"usuario atualizado",
                id:retorno
            }
        }else{
            return {
                message:"usuario não atualizado",
                id:null
            }
        }
    }

    @Delete('/:id')
    async removeUsuario(@Param('id') id: string){
        const usuarioRemovido = await this.usuarios.apagaUsuario(id)
        return {
            usuario: usuarioRemovido,
            message: 'Usuario removido.'
        }
    }
}