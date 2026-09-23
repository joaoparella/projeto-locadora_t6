import { IsEmail, IsNumber, IsString, MinLength } from "class-validator";

export class criaUsuarioDTO{

    @IsString()
    id: string;

    @IsString()
    nome: string;
    
    @IsNumber()
    idade: number;
    
    @IsString()
    cidade: string;
    
    @IsEmail()
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