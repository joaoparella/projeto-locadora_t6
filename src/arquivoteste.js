export class Usuario{
    constructor(id, nome, idade, cidade, email, 
                telefone,senha,endereco){
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

var possivelUsuario = new Usuario("1", "nome: string", 0, "cidade: string", "email: string", 
                "telefone:string","senha:string","endereco:string")

var dadosAtualizacao = {
    nome:"asad",
    telefone:"a213123",
    idade:20,
    cidade:"bauru",
    email:"teste@teste.com",
    senha:"senha123",
    endereco:""
}

possivelUsuario["nome"] = "teste"

var novoObj = Object.entries(dadosAtualizacao);

novoObj.forEach(
    ([chave,valor]) => {
        console.log(chave,'--',valor)
        possivelUsuario[chave] = valor;
    }
    
)