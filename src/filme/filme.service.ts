import { Injectable } from "@nestjs/common";
import { Filme } from "./filme.entity.js";
import {v4 as uuid} from 'uuid';
import { criaFilmeDTO } from "./dto/criaFilme.dto.js";
import { alteraFilmeDTO } from "./dto/alteraFilme.dto.js";

@Injectable()
export class FilmesArmazenados{
    #filmes: Filme[] = [];  
  
    AdicionarFilme(dadosFilme: criaFilmeDTO){
        let filme = new Filme(uuid(), dadosFilme.nome,
            dadosFilme.duracao, dadosFilme.sinopse, dadosFilme.ano
        )
        this.#filmes.push(filme);
        return filme.id
    }

    async removeFilme(id:string){
        const filme = this.pesquisaId(id);

        this.#filmes = this.#filmes.filter(
            filmesalvo => filmesalvo.id !== id
        )

        return filme
    }

    pesquisaId(id:string){
        const possivelfilme = this.#filmes.find(
            filmesalvo => filmesalvo.id === id
        );

        if(!possivelfilme){
            throw new Error('filme não encontrado');
        }

        return possivelfilme
    }

    alteraFilme(id:string,dadosNovos: alteraFilmeDTO){
        const filme = this.pesquisaId(id);

        Object.entries(dadosNovos).forEach(
            ([chave,valor]) => {

                if(chave === 'id'){
                    return
                }

                (filme as any)[chave] = valor;
            }
        )
        return filme;
    }

    get filmes(){        
        return this.#filmes;
    }
}