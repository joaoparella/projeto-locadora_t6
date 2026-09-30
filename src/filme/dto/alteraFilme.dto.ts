import { IsNumber, IsOptional, IsString } from "class-validator";

export class alteraFilmeDTO{
    @IsString()
    @IsOptional()
    nome: string;

    @IsNumber()
    @IsOptional()
    duracao: number;

    @IsString()
    @IsOptional()
    sinopse: string;

    @IsNumber()
    @IsOptional()
    ano: number;
}