import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class criaFilmeDTO{
    @IsString()
    @ApiProperty({
                example: 'A volta dos que não foram',
                description: 'tipo: string; Nome do filme para identificação em formularios e telas'
            })
    nome: string;

    @IsNumber()
    @ApiProperty({
                example: 120,
                description: 'tipo: number; Duração do filme para identificação em formularios e telas'
            })
    duracao: number;

    @IsString()
    @ApiProperty({
                example: 'Um filme que fala sobre a volta dos que não foram a lugar nenhum',
                description: 'tipo: string; Sinopse do filme para identificação em formularios e telas'
            })
    sinopse: string;

    @IsNumber()
    @ApiProperty({
                example: 1990,
                description: 'tipo: number; Ano do filme para identificação em formularios e telas'
            })
    ano: number;
}