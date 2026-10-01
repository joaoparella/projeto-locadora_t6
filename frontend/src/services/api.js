/**
 * ============================================================================
 * SERVIÇO DE COMUNICAÇÃO COM A API (FETCH)
 * ============================================================================
 * Este arquivo centraliza todas as chamadas HTTP (GET, POST, DELETE, etc.)
 * para a API NestJS rodando em http://localhost:3000.
 * 
 * Para alunos iniciantes:
 * - `fetch()` é uma função nativa do JavaScript para fazer requisições HTTP.
 * - `await` espera a resposta da API antes de continuar.
 * - `res.json()` converte a resposta recebida (que vem em texto JSON) para objeto JS.
 * - Sempre enviamos `headers: { 'Content-Type': 'application/json' }` ao enviar dados via POST/PUT.
 */

export function getApiBaseUrl() {
  return localStorage.getItem('locadora_api_url') || 'http://localhost:3000';
}

export function setApiBaseUrl(url) {
  localStorage.setItem('locadora_api_url', url);
}

// ============================================================================
// MÓDULO DE USUÁRIOS
// ============================================================================

/**
 * Realiza o login do usuário na API.
 * @param {string} email
 * @param {string} senha
 */
export async function apiLogin(email, senha) {
  try {
    const url = getApiBaseUrl();
    const resposta = await fetch(`${url}/usuarios/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, senha }),
    });

    const dados = await resposta.json();

    if (!resposta.ok) {
      // Captura mensagens de erro do ValidationPipe do NestJS
      const mensagemErro = Array.isArray(dados.message) 
        ? dados.message.join(', ') 
        : dados.message || 'Erro ao efetuar login.';
      throw new Error(mensagemErro);
    }

    if (!dados.usuario) {
      throw new Error(dados.message || 'Email ou senha inválidos.');
    }

    return dados;
  } catch (erro) {
    console.error('Erro na chamada apiLogin:', erro);
    throw erro;
  }
}

/**
 * Cadastra um novo usuário no backend.
 * @param {Object} dadosUsuario { nome, idade, cidade, email, telefone, senha, endereco }
 */
export async function apiCadastrarUsuario(dadosUsuario) {
  try {
    // Garante que idade é enviada como Number para o class-validator do NestJS
    const payload = {
      ...dadosUsuario,
      idade: Number(dadosUsuario.idade),
    };

    const resposta = await fetch(`${getApiBaseUrl()}/usuarios`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const dados = await resposta.json();

    if (!resposta.ok) {
      const mensagemErro = Array.isArray(dados.message)
        ? dados.message.join(' | ')
        : dados.message || 'Não foi possível cadastrar o usuário.';
      throw new Error(mensagemErro);
    }

    return dados;
  } catch (erro) {
    console.error('Erro na chamada apiCadastrarUsuario:', erro);
    throw erro;
  }
}

/**
 * Retorna todos os usuários cadastrados na API.
 */
export async function apiListarUsuarios() {
  try {
    const resposta = await fetch(`${getApiBaseUrl()}/usuarios`);
    const dados = await resposta.json();

    if (!resposta.ok) {
      throw new Error(dados.message || 'Erro ao buscar usuários.');
    }

    return dados.usuarios || [];
  } catch (erro) {
    console.error('Erro na chamada apiListarUsuarios:', erro);
    throw erro;
  }
}

// ============================================================================
// MÓDULO DE FILMES
// ============================================================================

/**
 * Retorna todos os filmes cadastrados na API.
 */
export async function apiListarFilmes() {
  try {
    const resposta = await fetch(`${getApiBaseUrl()}/filmes`);
    const dados = await resposta.json();

    if (!resposta.ok) {
      throw new Error(dados.message || 'Erro ao consultar filmes.');
    }

    return dados.filmes || [];
  } catch (erro) {
    console.error('Erro na chamada apiListarFilmes:', erro);
    throw erro;
  }
}

/**
 * Cadastra um novo filme na API.
 * @param {Object} dadosFilme { nome, duracao, sinopse, ano }
 */
export async function apiCadastrarFilme(dadosFilme) {
  try {
    // Atenção alunos: no NestJS criamos o DTO esperando duracao e ano como number (@IsNumber)
    const payload = {
      nome: dadosFilme.nome.trim(),
      duracao: Number(dadosFilme.duracao),
      sinopse: dadosFilme.sinopse.trim(),
      ano: Number(dadosFilme.ano),
    };

    const resposta = await fetch(`${getApiBaseUrl()}/filmes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const dados = await resposta.json();

    if (!resposta.ok) {
      const mensagemErro = Array.isArray(dados.message)
        ? dados.message.join(' | ')
        : dados.message || 'Erro ao cadastrar filme.';
      throw new Error(mensagemErro);
    }

    return dados;
  } catch (erro) {
    console.error('Erro na chamada apiCadastrarFilme:', erro);
    throw erro;
  }
}

/**
 * Remove um filme pelo seu ID.
 * @param {string} id
 */
export async function apiRemoverFilme(id) {
  try {
    const resposta = await fetch(`${getApiBaseUrl()}/filmes/${id}`, {
      method: 'DELETE',
    });

    const dados = await resposta.json();

    if (!resposta.ok) {
      throw new Error(dados.message || 'Erro ao remover filme.');
    }

    return dados;
  } catch (erro) {
    console.error('Erro na chamada apiRemoverFilme:', erro);
    throw erro;
  }
}

/**
 * Testa se a API está online e acessível.
 */
export async function apiVerificarConexao() {
  try {
    const resposta = await fetch(`${getApiBaseUrl()}/filmes`, { method: 'GET' });
    return resposta.ok;
  } catch {
    return false;
  }
}
