import React, { useState, useEffect } from 'react';
import { apiListarUsuarios } from '../services/api';

/**
 * Componente de Listagem de Usuários Cadastrados
 * 
 * Explicação para Alunos:
 * - Demonstra a rota `GET /usuarios` do UsuarioController.
 * - Exibe em tabela todos os usuários mantidos em memória no backend.
 */
export function ListaUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  const carregarUsuarios = async () => {
    try {
      setCarregando(true);
      setErro(null);
      const lista = await apiListarUsuarios();
      setUsuarios(lista);
    } catch (err) {
      setErro(err.message || 'Falha ao buscar usuários na API.');
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    carregarUsuarios();
  }, []);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>👥 Usuários Cadastrados no Backend</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
            Dados retornados pela rota <code>GET /usuarios</code> do NestJS
          </p>
        </div>
        <button 
          type="button" 
          onClick={carregarUsuarios} 
          className="btn btn-secondary btn-sm"
          disabled={carregando}
        >
          🔄 {carregando ? 'Atualizando...' : 'Recarregar Usuários'}
        </button>
      </div>

      {erro && (
        <div className="alert alert-error">
          <span>⚠️</span>
          <span>{erro}</span>
        </div>
      )}

      {carregando && usuarios.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)' }}>
          <p>Carregando usuários...</p>
        </div>
      ) : usuarios.length === 0 ? (
        <div className="empty-state">
          <h3>Nenhum usuário cadastrado</h3>
          <p>Não há usuários cadastrados na memória da API no momento.</p>
        </div>
      ) : (
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Email</th>
                <th>Idade</th>
                <th>Cidade</th>
                <th>Telefone</th>
                <th>Endereço</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((u) => (
                <tr key={u.id || u.email}>
                  <td><strong>{u.nome}</strong></td>
                  <td>{u.email}</td>
                  <td>{u.idade} anos</td>
                  <td>{u.cidade}</td>
                  <td>{u.telefone}</td>
                  <td>{u.endereco}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
