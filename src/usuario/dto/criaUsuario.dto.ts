import { IsEmail, IsNumber, IsString, MinLength } from "class-validator";
import { EmailUnico } from "../validator/emailUnico.validator.js";

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
    @MinLength(6)
    senha: string; 
    
    @IsString()
    endereco: string;
}