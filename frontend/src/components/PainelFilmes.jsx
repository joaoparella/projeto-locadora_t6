import React, { useState } from 'react';
import { ListaFilmes } from './ListaFilmes';
import { CadastroFilme } from './CadastroFilme';
import { ListaUsuarios } from './ListaUsuarios';

/**
 * Componente do Painel Principal (Dashboard)
 * 
 * Explicação para Alunos:
 * - O estado `abaAtiva` controla qual tela do painel está sendo exibida:
 *   'catalogo': Listagem de filmes cadastrados
 *   'novo-filme': Formulário de inclusão de filme
 *   'usuarios': Visualização dos usuários registrados
 */
export function PainelFilmes({ usuarioLogado }) {
  const [abaAtiva, setAbaAtiva] = useState('catalogo');

  return (
    <div>
      {/* Cabeçalho do Painel */}
      <div className="dashboard-header">
        <div className="dashboard-title">
          <h2>Painel de Gestão da Locadora</h2>
          <p>
            Bem-vindo(a), <strong>{usuarioLogado?.nome || 'Usuário'}</strong>! Gerencie os filmes e teste as rotas da API.
          </p>
        </div>

        {/* Abas de Navegação */}
        <div className="dashboard-tabs">
          <button
            type="button"
            className={`tab-btn ${abaAtiva === 'catalogo' ? 'active' : ''}`}
            onClick={() => setAbaAtiva('catalogo')}
          >
            🎬 Catálogo de Filmes
          </button>
          
          <button
            type="button"
            className={`tab-btn ${abaAtiva === 'novo-filme' ? 'active' : ''}`}
            onClick={() => setAbaAtiva('novo-filme')}
          >
            ➕ Novo Filme
          </button>

          <button
            type="button"
            className={`tab-btn ${abaAtiva === 'usuarios' ? 'active' : ''}`}
            onClick={() => setAbaAtiva('usuarios')}
          >
            👥 Usuários
          </button>
        </div>
      </div>

      {/* Conteúdo Dinâmico com base na aba ativa */}
      <div>
        {abaAtiva === 'catalogo' && (
          <ListaFilmes irParaCadastroFilme={() => setAbaAtiva('novo-filme')} />
        )}

        {abaAtiva === 'novo-filme' && (
          <CadastroFilme onFilmeCadastrado={() => setAbaAtiva('catalogo')} />
        )}

        {abaAtiva === 'usuarios' && (
          <ListaUsuarios />
        )}
      </div>
    </div>
  );
}
