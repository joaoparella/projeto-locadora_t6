import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class alteraFilmeDTO{
    @IsString()
    @IsOptional()
    @ApiPropertyOptional({
            example: 'A volta dos que não foram',
            description: 'tipo: string; Nome do filme para identificação em formularios e telas'
        })
    nome: string;

    @IsNumber()
    @IsOptional()
    @ApiPropertyOptional({
            example: 120,
            description: 'tipo: number; Duração do filme para identificação em formularios e telas'
        })
    duracao: number;

    @IsString()
    @IsOptional()
    @ApiPropertyOptional({
            example: 'Um filme que fala sobre a volta dos que não foram a lugar nenhum',
            description: 'tipo: string; Sinopse do filme para identificação em formularios e telas'
        })
    sinopse: string;

    @IsNumber()
    @IsOptional()
    @ApiPropertyOptional({
            example: 1990,
            description: 'tipo: number; Ano do filme para identificação em formularios e telas'
        })
    ano: number;
}