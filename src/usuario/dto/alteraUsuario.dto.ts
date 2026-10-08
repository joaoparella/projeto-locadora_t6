import { IsEmail, IsNumber, IsOptional, IsString, MinLength } from "class-validator";
import { EmailUnico } from "../validator/emailUnico.validator.js";
import { SenhaForte } from "../validator/senhaForte.validator.js";

export class alteraUsuarioDTO{
    @IsString()
    @IsOptional()
    nome: string;
    
    @IsNumber()
    @IsOptional()
    idade: number;
    
    @IsString()
    @IsOptional()
    cidade: string;
    
    @IsEmail()
    @EmailUnico({message:"Ja existe um usuario com esse email."})
    @IsString()
    @IsOptional()
    email: string;
    
    @IsString()
    @IsOptional()
    telefone: string;
    
    @IsString()
    @SenhaForte({message:"Senha fraca"})
    @IsOptional()
    senha: string; 
    
    @IsString()
    @IsOptional()
    endereco: string;
}