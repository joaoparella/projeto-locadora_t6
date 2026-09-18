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
        this.senha = senha;
        this.endereco = endereco;
    }

}