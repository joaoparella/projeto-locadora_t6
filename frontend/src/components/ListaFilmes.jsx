import React, { useState, useEffect } from 'react';
import { apiListarFilmes, apiRemoverFilme } from '../services/api';

/**
 * Componente de Listagem de Filmes (Catálogo)
 * 
 * Explicação para Alunos:
 * 1. O `useEffect` com array de dependências vazio `[]` executa assim que a tela abre.
 * 2. Faz uma chamada GET para `/filmes` e guarda a lista no estado `filmes`.
 * 3. Permite excluir filmes com o método HTTP DELETE `/filmes/:id`.
 * 4. Possui um filtro de busca local em tempo real baseado no que o usuário digita.
 */
export function ListaFilmes({ irParaCadastroFilme }) {
  const [filmes, setFilmes] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  const [busca, setBusca] = useState('');
  const [removendoId, setRemovendoId] = useState(null);

  // Carrega os filmes da API
  const carregarFilmes = async () => {
    try {
      setCarregando(true);
      setErro(null);
      const lista = await apiListarFilmes();
      setFilmes(lista);
    } catch (err) {
      setErro(err.message || 'Falha ao buscar catálogo de filmes na API.');
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    carregarFilmes();
  }, []);

  // Remove um filme após confirmação
  const handleRemover = async (id, nome) => {
    const confirmou = window.confirm(`Deseja realmente remover o filme "${nome}"?`);
    if (!confirmou) return;

    try {
      setRemovendoId(id);
      await apiRemoverFilme(id);
      
      // Atualiza a lista no estado sem precisar recarregar toda a página
      setFilmes((anteriores) => anteriores.filter((f) => f.id !== id));
    } catch (err) {
      alert(`Erro ao remover filme: ${err.message}`);
    } finally {
      setRemovendoId(null);
    }
  };

  // Filtra filmes com base no campo de busca (nome ou ano)
  const filmesFiltrados = filmes.filter((filme) => {
    const termo = busca.toLowerCase();
    const nomeMatch = filme.nome ? filme.nome.toLowerCase().includes(termo) : false;
    const anoMatch = filme.ano ? filme.ano.toString().includes(termo) : false;
    return nomeMatch || anoMatch;
  });

  return (
    <div>
      {/* Barra de Ferramentas (Busca e Atualização) */}
      <div className="catalog-toolbar">
        <div className="search-box">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            className="search-input"
            placeholder="Buscar por título ou ano..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Total: <strong>{filmesFiltrados.length}</strong> {filmesFiltrados.length === 1 ? 'filme' : 'filmes'}
          </span>
          <button 
            type="button" 
            onClick={carregarFilmes} 
            className="btn btn-secondary btn-sm"
            disabled={carregando}
            title="Recarregar dados da API"
          >
            🔄 {carregando ? 'Atualizando...' : 'Recarregar'}
          </button>
        </div>
      </div>

      {erro && (
        <div className="alert alert-error">
          <span>⚠️</span>
          <span>{erro}</span>
        </div>
      )}

      {carregando && filmes.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '4rem 1rem', color: 'var(--text-secondary)' }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>⏳</div>
          <p>Consultando a API NestJS (GET /filmes)...</p>
        </div>
      ) : filmesFiltrados.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">🎬</div>
          <h3>Nenhum filme encontrado</h3>
          <p>
            {busca 
              ? `Nenhum resultado corresponde à busca "${busca}".` 
              : 'O acervo ainda não possui filmes cadastrados na memória da API.'}
          </p>
          <button 
            type="button" 
            onClick={irParaCadastroFilme} 
            className="btn btn-primary"
          >
            ➕ Cadastrar Primeiro Filme
          </button>
        </div>
      ) : (
        <div className="movies-grid">
          {filmesFiltrados.map((filme) => (
            <div key={filme.id} className="movie-card">
              <div className="movie-card-header">
                <h3 className="movie-title">{filme.nome}</h3>
              </div>

              <div className="movie-meta-tags">
                <span className="meta-badge gold">
                  📅 {filme.ano}
                </span>
                <span className="meta-badge">
                  ⏱️ {filme.duracao} min
                </span>
              </div>

              <div className="movie-body">
                <p className="movie-synopsis" title={filme.sinopse}>
                  {filme.sinopse || 'Sem sinopse informada.'}
                </p>
              </div>

              <div className="movie-footer">
                <span className="movie-id-hint" title={`ID: ${filme.id}`}>
                  ID: {filme.id ? `${filme.id.substring(0, 8)}...` : 'N/A'}
                </span>

                <button
                  type="button"
                  onClick={() => handleRemover(filme.id, filme.nome)}
                  className="btn btn-danger btn-sm"
                  disabled={removendoId === filme.id}
                  title="Excluir filme da API"
                >
                  {removendoId === filme.id ? 'Excluindo...' : '🗑️ Excluir'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
