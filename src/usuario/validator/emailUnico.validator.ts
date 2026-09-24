import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { usuariosCadastrados } from "../usuario.service.js";
import { Injectable } from "@nestjs/common";


@Injectable()
@ValidatorConstraint({async:true})
export class emailUnicoValidator implements ValidatorConstraintInterface{
    constructor(private usuariosCadastrados: usuariosCadastrados){

    }
    async validate(value: any, validationArguments?: ValidationArguments): Promise<boolean> {
        const validarEmail = await this.usuariosCadastrados.validaEmail(value);

        return !validarEmail;
    }
}


export const EmailUnico = (opcoesValidacao: ValidationOptions) => {
    return (objeto : Object, propriedade: string) => {
        registerDecorator({
            target: objeto.constructor,
            propertyName: propriedade,
            options: opcoesValidacao,
            constraints: [],
            validator: emailUnicoValidator
        })
    }
}