import { IsEmail, IsNumber, IsOptional, IsString, MinLength } from "class-validator";
import { EmailUnico } from "../validator/emailUnico.validator.js";
import { SenhaForte } from "../validator/senhaForte.validator.js";
import { ApiPropertyOptional } from "@nestjs/swagger";

export class alteraUsuarioDTO{
    @IsString()
    @IsOptional()
     @ApiPropertyOptional({
        example: 'Roberto Silva',
        description: 'Tipo:String; Nome usado para identificar o usuário em telas, cadastros e etc'
    })
    nome: string;
    
    @IsNumber()
    @IsOptional()
    @ApiPropertyOptional({
            example: 18,
            description: 'Tipo:Number; Idade do usuario, apenas visual'
        })
    idade: number;
    
    @IsString()
    @IsOptional()
    @ApiPropertyOptional({
            example: 'Bauru',
            description: 'Tipo:String; Cidade do usuário.'
        })
    cidade: string;
    
    @IsEmail()
    @EmailUnico({message:"Ja existe um usuario com esse email."})
    @IsString()
    @IsOptional()
    @ApiPropertyOptional({
            example: 'robertosilva@hotmail.com',
            description: 'Tipo:String/email; Email do usuário, usado para login, identificação e comunicados'
        })
    email: string;
    
    @IsString()
    @IsOptional()
    @ApiPropertyOptional({
            example: '9999999-9999',
            description: 'Tipo:String; telefone do usuário'
        })
    telefone: string;
    
    @IsString()
    @SenhaForte({message:"Senha fraca"})
    @IsOptional()
     @ApiPropertyOptional({
            example: 'SenhaForte@1234567',
            description: 'Tipo:String; Senha usada para login, deve seguir padrão de segurança minimo, evitando padrões.'
        })
    senha: string; 
    
    @IsString()
    @IsOptional()
    @ApiPropertyOptional({
            example: 'Rua xyz, bairo abc, numero 321',
            description: 'Tipo:String; Endereço do usuário'
        })
    endereco: string;
}