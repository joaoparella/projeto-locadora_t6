import { Injectable } from "@nestjs/common";
import { Usuario } from "./usuario.entity.js";
import {v4 as uuid} from 'uuid';
import { alteraUsuarioDTO } from "./dto/alteraUsuario.dto.js";

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

    async validaEmail(email: string){
        const possivelUsuario = this.#usuarios.find(
            usuario => usuario.email === email
        );
        return (possivelUsuario !== undefined);
    }

    async atualizaUsuario(id: string, dadosAtualizacao: alteraUsuarioDTO){
         const possivelUsuario = this.#usuarios.find(
            usuarioSalvo => usuarioSalvo.id === id
        )

        if(!possivelUsuario){
            throw new Error('Usuario não localizado')
        }
        Object.entries(dadosAtualizacao).forEach(
            ([chave,valor]) => {
                if(chave == 'id'){
                    return;
                }else if (valor === undefined) {
                    return;
                }
                (possivelUsuario as any)[chave] = valor;
            }
        )
        return possivelUsuario.id;
        //** */ if (dadosAtualizacao.nome){
        //     possivelUsuario.nome = dadosAtualizacao.nome;
        // }
        // if (dadosAtualizacao.cidade){
        //     possivelUsuario.cidade = dadosAtualizacao.cidade;
        // }
        // if (dadosAtualizacao.email){
        //     possivelUsuario.email = dadosAtualizacao.email;
        // }
        // if (dadosAtualizacao.endereco){
        //     possivelUsuario.endereco = dadosAtualizacao.endereco;
        // }
        // if (dadosAtualizacao.idade){
        //     possivelUsuario.idade = dadosAtualizacao.idade;
        // }
        // if (dadosAtualizacao.senha){
        //     possivelUsuario.senha = dadosAtualizacao.senha;
        // }
        // if (dadosAtualizacao.telefone){
        //     possivelUsuario.telefone = dadosAtualizacao.telefone;
        // }//**//
        
    }
}