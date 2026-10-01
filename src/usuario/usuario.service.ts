import { Injectable } from "@nestjs/common";
import { Usuario } from "./usuario.entity.js";
import {v4 as uuid} from 'uuid';
import { alteraUsuarioDTO } from "./dto/alteraUsuario.dto.js";

@Injectable()
export class usuariosCadastrados{
    #usuarios:Usuario[] = [];

    constructor() {
        // Usuário inicial para facilitar testes dos alunos
        this.adicionaUsuario({
            nome: 'Administrador Demo',
            idade: 25,
            cidade: 'São Paulo',
            email: 'admin@senac.br',
            telefone: '11999999999',
            senha: '123456',
            endereco: 'Av. Paulista, 1000'
        });
    }

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
        const possivelUsuario = this.#usuarios.find(
            usuarioSalvo => usuarioSalvo.id === id
        )
         if(!possivelUsuario){
            throw new Error('Usuario não localizado')
        }
        return possivelUsuario;
    }

    validaLogin(email: string, senha: string){
        const possivelUsuario = this.#usuarios.find(
            usuario => usuario.email === email && usuario.senha === senha
        );
        return possivelUsuario;
    }

    async validaEmail(email: string){
        const possivelUsuario = this.#usuarios.find(
            usuario => usuario.email === email
        );
        return (possivelUsuario !== undefined);
    }

    async atualizaUsuario(id: string, dadosAtualizacao: alteraUsuarioDTO){
        let possivelUsuario = this.retornaUsuarioID(id);
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

    async apagaUsuario(id:string){
        let possivelUsuario = this.retornaUsuarioID(id);

        this.#usuarios = this.#usuarios.filter(
            usuarioSalvo => usuarioSalvo.id !== id
        )

        return possivelUsuario;
    }
}