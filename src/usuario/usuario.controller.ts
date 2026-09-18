import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { usuariosCadastrados } from "./usuario.service.js";


@Controller('/usuarios')
export class UsuarioController{  
    #usuarios:usuariosCadastrados;
    constructor(){
        this.#usuarios = new usuariosCadastrados();
    }

    @Post()
    async cadastroUsuario(@Body() dadosUsuario: any){
        let retorno = this.#usuarios.adicionaUsuario(dadosUsuario);
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
            usuarios: this.#usuarios.retornaUsuarios()
        }
    }
}