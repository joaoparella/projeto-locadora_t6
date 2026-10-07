import * as bcrypt from 'bcrypt'

export class Usuario{
    id: string;
    nome: string;
    idade: number;
    cidade: string;
    email: string;
    telefone: string;
    senha: string; 
    endereco: string;
    constructor(id:string, nome: string, idade: number, cidade: string, email: string, 
                telefone:string,senha:string,endereco:string){
        this.id = id;
        this.nome = nome;
        this.idade = idade;
        this.cidade = cidade;
        this.email = email;
        this.telefone = telefone;
        this.trocaSenha(senha);
        this.endereco = endereco;
    }

    trocaSenha(senha: string){
        const saltOrRounds = 10;
        this.senha = bcrypt.hashSync(senha,saltOrRounds);
    }

    login(senha:string){
        return bcrypt.compareSync(senha,this.senha)
    }
}