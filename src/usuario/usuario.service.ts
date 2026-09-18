import { Usuario } from "./usuario.entity.js";

export class usuariosCadastrados{
    #usuarios:Usuario[] = [];

    adicionaUsuario(dadosUsuario: any){
        let usuario = new Usuario(dadosUsuario.id, dadosUsuario.nome,
                    dadosUsuario.idade, dadosUsuario.cidade, dadosUsuario.email, 
                    dadosUsuario.telefone, dadosUsuario.senha, dadosUsuario.endereco
        )
        this.#usuarios.push(usuario);
        return usuario.id;
    }

    retornaUsuarios(){
        return this.#usuarios;
    }
}