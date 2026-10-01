# 🎬 CineLocadora - Frontend em React (Guia Didático para Alunos)

Projeto frontend desenvolvido em **React + Vite** de forma simples, clara e sem frameworks complexos, pensado especialmente para turmas de **alunos iniciantes** entenderem na prática como uma aplicação web consome uma **API REST** (construída em NestJS).

---

## 🚀 Como Executar o Projeto

Para testar o sistema completo, você precisará de **dois terminais** abertos: um para a API (Backend) e outro para o React (Frontend).

### 1️⃣ Terminal 1: Iniciar a API NestJS (Backend)
No diretório raiz do projeto:
```bash
# Se ainda não instalou as dependências:
npm install

# Iniciar o servidor em modo de desenvolvimento (porta 3000):
npm run start:dev
```
> O servidor estará rodando em: `http://localhost:3000`

---

### 2️⃣ Terminal 2: Iniciar o Frontend React (Vite)
Navegue até a pasta `frontend`:
```bash
cd frontend

# Se ainda não instalou as dependências:
npm install

# Iniciar o servidor de desenvolvimento:
npm run dev
```
> O navegador abrirá normalmente em `http://localhost:5173`.

---

## 📚 Estrutura do Projeto Explicada para Alunos

A pasta `src` foi estruturada para ser o mais legível possível:

```
frontend/src/
├── services/
│   └── api.js              # Centraliza todas as chamadas 'fetch' (GET, POST, DELETE)
├── components/
│   ├── Navbar.jsx          # Barra superior com logo, status da API e botão de sair
│   ├── Login.jsx           # Tela de login com preenchimento automático para testes
│   ├── CadastroUsuario.jsx # Formulário de novo usuário integrado com DTO
│   ├── PainelFilmes.jsx    # Painel com navegação em abas (Catálogo, Cadastro, Usuários)
│   ├── ListaFilmes.jsx     # Catálogo de filmes em cards, com busca e exclusão
│   ├── CadastroFilme.jsx   # Formulário para cadastrar novos filmes com pré-visualização
│   └── ListaUsuarios.jsx   # Tabela para inspecionar os usuários criados no backend
├── App.jsx                 # Componente principal que gerencia o estado da sessão e telas
├── App.css                 # Estilos visuais modernos no tema Cinema Dark
├── index.css               # Variáveis globais de cores, tipografia e reset
└── main.jsx                # Ponto de entrada do React no DOM
```

---

## 🧠 Conceitos Fundamentais Abordados

### 1. Comunicação HTTP com `fetch()`
Em vez de bibliotecas pesadas (como Axios), utilizamos a função padrão do JavaScript:
```javascript
// Exemplo didático de requisição POST
const resposta = await fetch('http://localhost:3000/filmes', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json', // Avisa o NestJS que estamos enviando JSON
  },
  body: JSON.stringify(dadosDoFilme),   // Converte o objeto JavaScript em texto JSON
});

const dados = await resposta.json();    // Converte a resposta JSON em objeto JS
```

### 2. Conversão de Tipos para o NestJS
No backend, o NestJS utiliza o `class-validator` com validações como `@IsNumber()` nos DTOs (`criaFilmeDTO` e `criaUsuarioDTO`).
Como os inputs do HTML sempre retornam `string`, convertemos os números antes do envio:
```javascript
const payload = {
  nome: formData.nome,
  duracao: Number(formData.duracao), // Garante que vá como número
  ano: Number(formData.ano),         // Garante que vá como número
  sinopse: formData.sinopse,
};
```

### 3. Gerenciamento de Telas com `useState`
Para evitar a complexidade do React Router para iniciantes, o fluxo entre telas é controlado por um simples estado:
```javascript
const [telaAtual, setTelaAtual] = useState('login'); // 'login' | 'cadastro' | 'filmes'
```

### 4. Persistência de Login com `localStorage`
Quando o usuário faz login com sucesso, salvamos seus dados para que, ao atualizar a página (F5), ele permaneça conectado:
```javascript
localStorage.setItem('locadora_usuario_logado', JSON.stringify(usuario));
```

---

## 🔑 Credenciais para Testes Rápidos
Para facilitar os testes em sala de aula sem precisar cadastrar dados toda vez que o servidor reiniciar:
- **Email:** `admin@senac.br`
- **Senha:** `123456`
*(Ou clique no botão **"Usar Dica"** na tela de login para preencher automaticamente!)*
