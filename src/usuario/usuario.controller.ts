import { Body, Controller, Get, Param, Post } from "@nestjs/common";


@Controller('/usuarios')
export class UsuarioController{    
    constructor(){}

    @Get()
    async HelloWorld(){
       return "Hello World"
    }

    @Post("/:nome_usuario")
    async TestePost(@Param('nome_usuario') entrada: string ){
        return "teste do post - " + entrada
    }

    @Post("")
    async TestePostBody(@Body() entrada: any){
        return `Teste do body - ${entrada.numero}`
    }
}