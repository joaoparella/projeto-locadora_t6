import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { usuariosCadastrados } from "./usuario.service.js";
import { criaUsuarioDTO } from "./dto/criaUsuario.dto.js";


@Controller('/usuarios')
export class UsuarioController{  
    #usuarios:usuariosCadastrados;
    constructor(){
        this.#usuarios = new usuariosCadastrados();
    }

    @Post()
    async cadastroUsuario(@Body() dadosUsuario: criaUsuarioDTO){
        // let erros:string[] = []
        // if(!(dadosUsuario.id)){
        //     erros.push("id não preenchido")
        // }
        // if(!(dadosUsuario.nome)){
        //     erros.push("nome não preenchido")
        // }
        // if(!(dadosUsuario.idade)){
        //     erros.push("idade não preenchido")
        // }
        // if(!(dadosUsuario.cidade)){
        //     erros.push("cidade não preenchido")
        // }
        // if(!(dadosUsuario.email)){
        //     erros.push("email não preenchido")
        // }
        // if(!(dadosUsuario.telefone)){
        //     erros.push("telefone não preenchido")
        // }
        // if(!(dadosUsuario.senha)){
        //     erros.push("senha não preenchido")
        // }
        // if(!(dadosUsuario.endereco)){
        //     erros.push("endereco não preenchido")
        // }

        // if(erros){
        //     return {
        //         message:erros,
        //         id:null
        //     }
        // }
        

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

    @Get('/:id')
    async retornarUsuarioID(@Param('id') id: string){
       // fazer consulta por id
       let resultado = this.#usuarios.retornaUsuarioID(id);

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
}