import { IsEmail, IsString } from "class-validator";

export class LoginUsuarioDTO {
    @IsEmail({}, { message: "Email inválido" })
    email: string;

    @IsString()
    senha: string;
}
