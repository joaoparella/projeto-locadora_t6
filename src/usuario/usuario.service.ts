import { Injectable } from "@nestjs/common";
import { Usuario } from "./usuario.entity.js";
import {v4 as uuid} from 'uuid';

@Injectable()
export class usuariosCadastrados{
    #usuarios:Usuario[] = [];

    adicionaUsuario(dadosUsuario: any){
        let usuario = new Usuario(uuid(), dadosUsuario.nome,
                    dadosUsuario.idade, dadosUsuario.cidade, dadosUsuario.email, 
                    dadosUsuario.telefone, dadosUsuario.senha, dadosUsuario.endereco
        )
        this.#usuarios.push(usuario);
        return usuario.id;
    }

    retornaUsuarios(){
        return this.#usuarios;
    }

    retornaUsuarioID(id:string){
        // for(let i = 0; i < this.#usuarios.length; i++){
        //     if (this.#usuarios[i].id = id){
        //         return this.#usuarios[i]
        //     }
        // }
        // return null;
        const possivelUsuario = this.#usuarios.find(
            usuarioSalvo => usuarioSalvo.id === id
        )
        return possivelUsuario;
    }
}