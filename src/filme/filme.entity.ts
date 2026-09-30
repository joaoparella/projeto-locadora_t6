export class Filme{
    id: string;
    nome: string;
    duracao: number;
    sinopse: string;
    ano: number;

    constructor(id: string,
    nome: string,
    duracao: number,
    sinopse: string,
    ano: number ){
        this.id= id;
        this.nome= nome;
        this.duracao= duracao;
        this.sinopse= sinopse;
        this.ano= ano;
    }
}