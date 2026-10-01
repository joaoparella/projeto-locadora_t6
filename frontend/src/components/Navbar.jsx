import React from 'react';
import { getApiBaseUrl, setApiBaseUrl } from '../services/api';

/**
 * Componente Navbar (Barra de Navegação Superior)
 * Responsável por exibir a logo da aplicação, o status da conexão com a API NestJS,
 * o usuário logado e os botões de controle de tela / logout.
 */
export function Navbar({ usuarioLogado, telaAtual, setTelaAtual, onLogout, apiOnline, onAtualizarConexao }) {
  const handleAlterarUrl = () => {
    const atual = getApiBaseUrl();
    const nova = window.prompt('Configurar URL base da API NestJS:', atual);
    if (nova && nova.trim() && nova !== atual) {
      setApiBaseUrl(nova.trim().replace(/\/$/, ''));
      if (onAtualizarConexao) onAtualizarConexao();
    }
  };

  return (
    <header className="navbar">
      <div className="navbar-inner">
        {/* Identidade visual / Logo */}
        <div 
          className="navbar-brand"
          onClick={() => {
            if (usuarioLogado) setTelaAtual('filmes');
            else setTelaAtual('login');
          }}
        >
          <div className="navbar-brand-icon">🎬</div>
          <div className="navbar-brand-title">
            <span>CineLocadora</span>
            <span className="navbar-brand-sub">Projeto Senac T6</span>
          </div>
        </div>

        {/* Ações da direita */}
        <div className="navbar-actions">
          {/* Indicador de Status da API com clique para alterar URL */}
          <button 
            type="button"
            onClick={handleAlterarUrl}
            className={`status-badge ${apiOnline ? '' : 'offline'}`} 
            style={{ cursor: 'pointer', background: 'none' }}
            title={`Clique para alterar URL da API (Atual: ${getApiBaseUrl()})`}
          >
            <span className="status-dot"></span>
            <span>{apiOnline ? 'API Conectada' : 'API Offline (Configurar)'}</span>
          </button>

          {usuarioLogado ? (
            <>
              {/* Informações do usuário autenticado */}
              <div className="user-chip" title={usuarioLogado.email}>
                <span className="user-avatar">
                  {usuarioLogado.nome ? usuarioLogado.nome.charAt(0).toUpperCase() : 'U'}
                </span>
                <span>{usuarioLogado.nome}</span>
              </div>

              {/* Botão de Sair (Logout) */}
              <button 
                type="button" 
                onClick={onLogout} 
                className="btn btn-secondary btn-sm"
                title="Encerrar sessão"
              >
                Sair ⎋
              </button>
            </>
          ) : (
            <>
              {/* Botões de navegação quando deslogado */}
              {telaAtual === 'cadastro' ? (
                <button 
                  type="button" 
                  onClick={() => setTelaAtual('login')} 
                  className="btn btn-secondary btn-sm"
                >
                  Fazer Login
                </button>
              ) : (
                <button 
                  type="button" 
                  onClick={() => setTelaAtual('cadastro')} 
                  className="btn btn-primary btn-sm"
                >
                  Criar Conta
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </header>
  );
}
