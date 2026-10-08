import { IsEmail, IsNumber, IsString, MinLength } from "class-validator";
import { EmailUnico } from "../validator/emailUnico.validator.js";
import { SenhaForte } from "../validator/senhaForte.validator.js";

export class criaUsuarioDTO{
    @IsString()
    nome: string;
    
    @IsNumber()
    idade: number;
    
    @IsString()
    cidade: string;
    
    @IsEmail()
    @EmailUnico({message:"Ja existe um usuario com esse email."})
    @IsString()
    email: string;
    
    @IsString()
    telefone: string;
    
    @IsString()
    @SenhaForte({message:"Senha fraca"})
    senha: string; 
    
    @IsString()
    endereco: string;
}