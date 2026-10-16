import { Injectable } from "@nestjs/common";
import { Filme } from "./filme.entity.js";
import { v4 as uuid } from 'uuid';
import { criaFilmeDTO } from "./dto/criaFilme.dto.js";
import { alteraFilmeDTO } from "./dto/alteraFilme.dto.js";

@Injectable()
export class FilmesArmazenados {
    #filmes: Filme[] = [];


    async AdicionarFilme(dadosFilme: criaFilmeDTO) {
        //TODO: Criar integração com API
        let dados = await this.importarDadosExternos(dadosFilme.nome)
        let dadosTMDB = await this.buscarFilmeNoTmdb(dadosFilme.nome)
        let filme = new Filme(uuid(), dadosFilme.nome,
            dados.duracao, dados.sinopse, dados.ano
        )
        this.#filmes.push(filme);
        return filme.id
    }

    async importarDadosExternos(nomeBusca: string) {
        const resposta = await fetch(`https://api.tvmaze.com/singlesearch/shows?q=${encodeURIComponent(nomeBusca)}`);


        if (!resposta.ok) throw new Error('Obra não encontrada na TVMaze');
        
        const dados = await resposta.json();
        return {
            nome: dados.name,
            ano: dados.premiered ? new Date(dados.premiered).getFullYear() : 2020,
            duracao: dados.runtime || 60,
            sinopse: dados.summary ? dados.summary.replace(/<[^>]*>?/gm, '') : ''
        };
    }

    async buscarFilmeNoTmdb(titulo: string) {
        // Substitua pelo seu Bearer Token do TMDB (ou configure no .env)
        const bearerToken = process.env.TMDB_BEARER_TOKEN || 'testes' ;
        const url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(titulo)}&language=pt-BR`;
        const resposta = await fetch(url, {
            method: 'GET',
            headers: {
                // Aqui está a aplicação prática do Bearer Token:
                'Authorization': `Bearer ${bearerToken}`,
                'Accept': 'application/json',
            },
        });
        if (!resposta.ok) {
            if (resposta.status === 401) {
                throw new Error('Autenticação falhou: Bearer Token inválido ou não informado.');
            }
            throw new Error('Erro ao consultar a API do TMDB.');
        }
        const dados = await resposta.json();
        const item = dados.results?.[0]; // Pega o resultado mais relevante
        if (!item) {
            throw new Error(`Nenhum filme encontrado com o título "${titulo}".`);
        }
        // Adaptador: traduz o formato do TMDB para os atributos da classe Filme do seu projeto
        return {
            nome: item.title,
            sinopse: item.overview || 'Sem sinopse disponível em português.',
            ano: item.release_date ? parseInt(item.release_date.split('-')[0], 10) : new Date().getFullYear(),
            duracao: 120, // Duração padrão estimada (ou consultada via rota detalhada /movie/{id})
            poster: item.poster_path ? `https://image.tmdb.org/t/p/w500${item.poster_path}` : null,
            nota: item.vote_average,
        };
    }


    async removeFilme(id: string) {
        const filme = this.pesquisaId(id);

        this.#filmes = this.#filmes.filter(
            filmesalvo => filmesalvo.id !== id
        )

        return filme
    }

    pesquisaId(id: string) {
        const possivelfilme = this.#filmes.find(
            filmesalvo => filmesalvo.id === id
        );

        if (!possivelfilme) {
            throw new Error('filme não encontrado');
        }

        return possivelfilme
    }

    alteraFilme(id: string, dadosNovos: alteraFilmeDTO) {
        const filme = this.pesquisaId(id);

        Object.entries(dadosNovos).forEach(
            ([chave, valor]) => {

                if (chave === 'id') {
                    return
                }

                (filme as any)[chave] = valor;
            }
        )
        return filme;
    }

    retornaFilmes(){
        return this.#filmes;
    }


}