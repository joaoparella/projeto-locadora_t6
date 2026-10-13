import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";

export class LoginUsuarioDTO {
    @IsEmail({}, { message: "Email inválido" })
    @ApiProperty({
                example: 'robertosilva@hotmail.com',
                description: 'Tipo:String/email; Email do usuário, usado para login, identificação e comunicados'
            })
    email: string;

    @IsString()
    @ApiProperty({
                example: 'SenhaForte@1234567',
                description: 'Tipo:String; Senha usada para login, deve seguir padrão de segurança minimo, evitando padrões.'
            })
    senha: string;
}