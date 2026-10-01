import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { FilmesArmazenados } from "./filme.service.js";
import { criaFilmeDTO } from "./dto/criaFilme.dto.js";
import { alteraFilmeDTO } from "./dto/alteraFilme.dto.js";

@Controller('/filmes')
export class FilmeController {  
    constructor(private filmes: FilmesArmazenados) {
    }

    @Post()
    async cadastroFilme(@Body() dadosFilme: criaFilmeDTO) {
        let retorno = this.filmes.AdicionarFilme(dadosFilme);
        if (retorno) {
            return {
                message: "cadastro efetuado com sucesso",
                id: retorno
            };
        } else {
            return {
                message: "cadastro não efetuado",
                id: null
            };
        }
    }

    @Get()
    async retornarFilmes() {
        return {
            message: "Consulta efetuada",
            filmes: this.filmes.filmes
        };
    }

    @Get('/:id')
    async retornarFilmeID(@Param('id') id: string) {
       let resultado = this.filmes.pesquisaId(id);

       if (resultado) {
            return {
                message: "filme localizado",
                filme: resultado
            };
        } else {
            return {
                message: "filme não localizado",
                filme: null
            };
        }
    }

    @Put('/:id')
    async atualizaFilme(@Param('id') id: string, @Body() novosDados: alteraFilmeDTO) {
        const retorno = await this.filmes.alteraFilme(id, novosDados);
        if (retorno) {
            return {
                message: "filme atualizado",
                filme: retorno
            };
        } else {
            return {
                message: "filme não atualizado",
                filme: null
            };
        }
    }

    @Delete('/:id')
    async removeFilme(@Param('id') id: string) {
        const filmeRemovido = await this.filmes.removeFilme(id);
        return {
            filme: filmeRemovido,
            message: 'Filme removido.'
        };
    }
}