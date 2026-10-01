import React, { useState } from 'react';
import { apiLogin } from '../services/api';

/**
 * Componente de Tela de Login
 * 
 * Explicação para Alunos:
 * 1. Usamos `useState` para armazenar o valor digitado nos campos (email e senha).
 * 2. No `onSubmit` do formulário, prevenimos o recarregamento padrão da página com `e.preventDefault()`.
 * 3. Chamamos a função assíncrona `apiLogin` enviando os dados em JSON.
 * 4. Se a API responder com sucesso, passamos o usuário para a função `onLoginSucesso`.
 */
export function Login({ onLoginSucesso, irParaCadastro }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState(null);

  // Função para preencher automaticamente dados de teste
  const preencherDemo = () => {
    setEmail('admin@senac.br');
    setSenha('123456');
    setErro(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro(null);

    // Validação básica no cliente
    if (!email || !senha) {
      setErro('Por favor, informe o email e a senha.');
      return;
    }

    try {
      setCarregando(true);
      // Chamada HTTP para a API (POST /usuarios/login)
      const resposta = await apiLogin(email, senha);
      
      // Sucesso! Notifica o componente App
      onLoginSucesso(resposta.usuario);
    } catch (err) {
      setErro(err.message || 'Falha ao autenticar. Verifique suas credenciais.');
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <div className="auth-header">
          <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🍿</div>
          <h1>Entrar no Sistema</h1>
          <p>Acesse o painel da videolocadora para gerenciar seus filmes</p>
        </div>

        {/* Caixa de dica com credenciais iniciais da API */}
        <div className="demo-credentials-box">
          <div className="demo-credentials-text">
            <strong>Credenciais de Teste:</strong><br />
            admin@senac.br / senha: 123456
          </div>
          <button 
            type="button" 
            onClick={preencherDemo}
            className="btn btn-secondary btn-sm"
          >
            Usar Dica
          </button>
        </div>

        {/* Mensagem de Erro, se houver */}
        {erro && (
          <div className="alert alert-error">
            <span>⚠️</span>
            <span>{erro}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              className="form-control"
              placeholder="ex: aluno@senac.br"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoFocus
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="senha">Senha</label>
            <input
              id="senha"
              type="password"
              className="form-control"
              placeholder="Digite sua senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
            <div className="form-helper">Mínimo de 6 caracteres</div>
          </div>

          <button 
            type="submit" 
            className="btn btn-primary btn-block" 
            disabled={carregando}
            style={{ marginTop: '1.5rem' }}
          >
            {carregando ? 'Autenticando na API...' : 'Entrar no Catálogo →'}
          </button>
        </form>

        <div className="auth-footer">
          Não tem cadastro ainda?
          <button type="button" onClick={irParaCadastro} className="link-btn">
            Cadastre-se aqui
          </button>
        </div>
      </div>
    </div>
  );
}
