import { IsNumber, IsString } from "class-validator";

export class criaFilmeDTO{
    @IsString()
    nome: string;

    @IsNumber()
    duracao: number;

    @IsString()
    sinopse: string;

    @IsNumber()
    ano: number;
}