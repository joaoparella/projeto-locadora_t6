import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Login } from './components/Login';
import { CadastroUsuario } from './components/CadastroUsuario';
import { PainelFilmes } from './components/PainelFilmes';
import { apiVerificarConexao } from './services/api';
import './App.css';

/**
 * ============================================================================
 * COMPONENTE RAIZ (App.jsx)
 * ============================================================================
 * 
 * Explicação da Lógica para Alunos Iniciantes:
 * 
 * 1. `usuarioLogado`: Guarda o objeto do usuário autenticado no sistema.
 *    Salvamos no `localStorage` do navegador para que, se a página for recarregada
 *    (F5), o aluno não perca a sessão de teste.
 * 
 * 2. `telaAtual`: Controla qual tela é exibida no momento:
 *    - 'login': Exibe o formulário de login (email e senha)
 *    - 'cadastro': Exibe o formulário de cadastro de novo usuário
 *    - 'filmes': Exibe o painel de filmes (disponível quando autenticado)
 * 
 * 3. `apiOnline`: Faz uma verificação simples no início para alertar o aluno
 *    caso o backend NestJS não esteja rodando no terminal (`npm run start:dev`).
 */
export function App() {
  // Inicializa o usuário a partir do localStorage, se existir
  const [usuarioLogado, setUsuarioLogado] = useState(() => {
    try {
      const salvo = localStorage.getItem('locadora_usuario_logado');
      return salvo ? JSON.parse(salvo) : null;
    } catch {
      return null;
    }
  });

  // Tela atual ('login' | 'cadastro' | 'filmes')
  const [telaAtual, setTelaAtual] = useState(() => {
    return localStorage.getItem('locadora_usuario_logado') ? 'filmes' : 'login';
  });

  const [apiOnline, setApiOnline] = useState(false);

  // Verifica se o backend NestJS está respondendo
  const checarAPI = async () => {
    const online = await apiVerificarConexao();
    setApiOnline(online);
  };

  useEffect(() => {
    checarAPI();
    // Recheca periodicamente a cada 10 segundos
    const intervalo = setInterval(checarAPI, 10000);
    return () => clearInterval(intervalo);
  }, []);

  // Manipulador de sucesso no Login
  const handleLoginSucesso = (usuario) => {
    setUsuarioLogado(usuario);
    localStorage.setItem('locadora_usuario_logado', JSON.stringify(usuario));
    setTelaAtual('filmes');
  };

  // Manipulador de Logout
  const handleLogout = () => {
    setUsuarioLogado(null);
    localStorage.removeItem('locadora_usuario_logado');
    setTelaAtual('login');
  };

  return (
    <div className="app-container">
      {/* Barra de Navegação */}
      <Navbar
        usuarioLogado={usuarioLogado}
        telaAtual={telaAtual}
        setTelaAtual={setTelaAtual}
        onLogout={handleLogout}
        apiOnline={apiOnline}
        onAtualizarConexao={checarAPI}
      />

      {/* Alerta caso a API esteja desligada */}
      {!apiOnline && (
        <div style={{ maxWidth: '1200px', margin: '1rem auto 0 auto', padding: '0 1.5rem', width: '100%' }}>
          <div className="alert alert-info">
            <span>💡</span>
            <div>
              <strong>Lembrete para Alunos:</strong> Verifique se a sua API NestJS está rodando! No terminal do backend, execute:{' '}
              <code>npm run start:dev</code> para liberar as requisições. Se sua porta for diferente (ex: 3001), clique no botão <strong>API Offline</strong> acima para alterar.
            </div>
          </div>
        </div>
      )}

      {/* Conteúdo Central da Aplicação */}
      <main className="main-content">
        {/* Cenário 1: Usuário logado -> Exibe Painel de Filmes */}
        {usuarioLogado && telaAtual === 'filmes' && (
          <PainelFilmes usuarioLogado={usuarioLogado} />
        )}

        {/* Cenário 2: Tela de Cadastro de Usuário */}
        {(!usuarioLogado || telaAtual === 'cadastro') && telaAtual === 'cadastro' && (
          <CadastroUsuario
            irParaLogin={() => setTelaAtual('login')}
            onCadastroSucesso={() => setTelaAtual('login')}
          />
        )}

        {/* Cenário 3: Tela de Login */}
        {(!usuarioLogado || telaAtual === 'login') && telaAtual === 'login' && (
          <Login
            onLoginSucesso={handleLoginSucesso}
            irParaCadastro={() => setTelaAtual('cadastro')}
          />
        )}
      </main>

      {/* Rodapé Informativo Didático */}
      <footer className="app-footer">
        <p>
          <strong>CineLocadora Frontend</strong> • Exemplo Didático para Turma de Iniciantes (React + Fetch API)
        </p>
        <p style={{ marginTop: '0.35rem' }}>
          Integrado com API NestJS em <code>http://localhost:3000</code> (Rotas: <code>/usuarios</code> e <code>/filmes</code>)
        </p>
      </footer>
    </div>
  );
}

export default App;
