import React, { useState } from 'react';
import { apiCadastrarUsuario } from '../services/api';

/**
 * Componente de Cadastro de Usuário
 * 
 * Explicação para Alunos:
 * - O NestJS valida os campos via `criaUsuarioDTO`:
 *   nome (string), idade (number), cidade (string), email (string, único),
 *   telefone (string), senha (string min 6), endereco (string).
 * - Os campos numéricos devem ser convertidos com `Number()` antes de enviar.
 */
export function CadastroUsuario({ onCadastroSucesso, irParaLogin }) {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
    idade: '',
    cidade: '',
    telefone: '',
    endereco: '',
  });

  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState(null);
  const [sucesso, setSucesso] = useState(null);

  // Atualiza dinamicamente qualquer campo do formulário
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Preenche dados de exemplo para agilizar o teste dos alunos
  const preencherExemplo = () => {
    const rand = Math.floor(Math.random() * 900) + 100;
    setFormData({
      nome: `Aluno Teste ${rand}`,
      email: `aluno${rand}@senac.br`,
      senha: 'senha123',
      idade: '21',
      cidade: 'São Paulo',
      telefone: '11988887777',
      endereco: 'Rua das Aulas, 123',
    });
    setErro(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro(null);
    setSucesso(null);

    // Validações no cliente
    if (formData.senha.length < 6) {
      setErro('A senha deve conter no mínimo 6 caracteres.');
      return;
    }

    if (Number(formData.idade) <= 0 || isNaN(Number(formData.idade))) {
      setErro('Por favor, informe uma idade válida (número positivo).');
      return;
    }

    try {
      setCarregando(true);

      // Envia POST para a API /usuarios
      const resposta = await apiCadastrarUsuario(formData);

      setSucesso(`Usuário cadastrado com sucesso! ID: ${resposta.id}`);
      
      // Limpa formulário e redireciona após 2 segundos
      setTimeout(() => {
        if (onCadastroSucesso) {
          onCadastroSucesso();
        } else {
          irParaLogin();
        }
      }, 1600);
    } catch (err) {
      setErro(err.message || 'Erro ao realizar cadastro do usuário.');
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card auth-card-wide">
        <div className="auth-header">
          <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>👤</div>
          <h1>Novo Cadastro de Usuário</h1>
          <p>Crie uma conta para poder cadastrar e gerenciar filmes no acervo</p>
        </div>

        {/* Botão de dados automáticos para testes rápidos */}
        <div className="demo-credentials-box">
          <div className="demo-credentials-text">
            <strong>Dica de Desenvolvimento:</strong> Gere dados de teste com 1 clique para não digitar tudo.
          </div>
          <button 
            type="button" 
            onClick={preencherExemplo}
            className="btn btn-secondary btn-sm"
          >
            Preencher Teste
          </button>
        </div>

        {erro && (
          <div className="alert alert-error">
            <span>⚠️</span>
            <span>{erro}</span>
          </div>
        )}

        {sucesso && (
          <div className="alert alert-success">
            <span>✅</span>
            <span>{sucesso} Redirecionando para login...</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label" htmlFor="nome">Nome Completo *</label>
              <input
                id="nome"
                name="nome"
                type="text"
                className="form-control"
                placeholder="Ex: Pedro Silva"
                value={formData.nome}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="email">Email *</label>
              <input
                id="email"
                name="email"
                type="email"
                className="form-control"
                placeholder="exemplo@senac.br"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <div className="form-helper">O email precisa ser único no sistema</div>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label" htmlFor="senha">Senha *</label>
              <input
                id="senha"
                name="senha"
                type="password"
                className="form-control"
                placeholder="Mínimo 6 caracteres"
                value={formData.senha}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="idade">Idade *</label>
              <input
                id="idade"
                name="idade"
                type="number"
                min="1"
                max="120"
                className="form-control"
                placeholder="Ex: 24"
                value={formData.idade}
                onChange={handleChange}
                required
              />
              <div className="form-helper">Enviado como Number para o NestJS</div>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label" htmlFor="cidade">Cidade *</label>
              <input
                id="cidade"
                name="cidade"
                type="text"
                className="form-control"
                placeholder="Ex: São Paulo"
                value={formData.cidade}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="telefone">Telefone *</label>
              <input
                id="telefone"
                name="telefone"
                type="text"
                className="form-control"
                placeholder="Ex: 11999998888"
                value={formData.telefone}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="endereco">Endereço Completo *</label>
            <input
              id="endereco"
              name="endereco"
              type="text"
              className="form-control"
              placeholder="Ex: Rua Vergueiro, 1000 - Apto 42"
              value={formData.endereco}
              onChange={handleChange}
              required
            />
          </div>

          <button 
            type="submit" 
            className="btn btn-primary btn-block" 
            disabled={carregando}
            style={{ marginTop: '1.25rem' }}
          >
            {carregando ? 'Salvando na API...' : 'Finalizar Cadastro de Usuário'}
          </button>
        </form>

        <div className="auth-footer">
          Já possui conta cadastrada?
          <button type="button" onClick={irParaLogin} className="link-btn">
            Fazer Login
          </button>
        </div>
      </div>
    </div>
  );
}
