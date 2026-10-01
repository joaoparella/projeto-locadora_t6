import React, { useState } from 'react';
import { apiCadastrarFilme } from '../services/api';

/**
 * Componente de Formulário de Cadastro de Filme
 * 
 * Explicação para Alunos:
 * - O DTO do NestJS `criaFilmeDTO` exige:
 *   nome: string, duracao: number, sinopse: string, ano: number.
 * - Aqui capturamos os valores em estado e convertemos os números com `Number(duracao)`.
 */
export function CadastroFilme({ onFilmeCadastrado }) {
  const [formData, setFormData] = useState({
    nome: '',
    duracao: '',
    ano: '',
    sinopse: '',
  });

  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState(null);
  const [sucesso, setSucesso] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Botão para testes rápidos em aula
  const preencherExemploFilme = () => {
    const filmesExemplo = [
      {
        nome: 'O Poderoso Chefão',
        duracao: '175',
        ano: '1972',
        sinopse: 'O patriarca de uma dinastia do crime organizado transfere o controle de seu império para seu filho mais relutante.',
      },
      {
        nome: 'Pulp Fiction',
        duracao: '154',
        ano: '1994',
        sinopse: 'As vidas de dois assassinos da máfia, um boxeador e um casal de bandidos se entrelaçam em quatro histórias de violência e redenção.',
      },
      {
        nome: 'Blade Runner 2049',
        duracao: '164',
        ano: '2017',
        sinopse: 'Um jovem blade runner descobre um segredo enterrado há muito tempo que tem o potencial de mergulhar a sociedade no caos.',
      }
    ];

    const escolhido = filmesExemplo[Math.floor(Math.random() * filmesExemplo.length)];
    setFormData(escolhido);
    setErro(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro(null);
    setSucesso(null);

    // Validações
    if (!formData.nome || !formData.duracao || !formData.ano || !formData.sinopse) {
      setErro('Por favor, preencha todos os campos do filme.');
      return;
    }

    if (Number(formData.duracao) <= 0 || Number(formData.ano) < 1888) {
      setErro('Duração ou Ano de lançamento inválidos.');
      return;
    }

    try {
      setCarregando(true);
      // Chamada HTTP (POST /filmes)
      const resultado = await apiCadastrarFilme(formData);
      
      setSucesso(`Filme "${formData.nome}" cadastrado com sucesso! ID gerado: ${resultado.id}`);
      
      // Limpa os campos
      setFormData({
        nome: '',
        duracao: '',
        ano: '',
        sinopse: '',
      });

      // Notifica o componente pai após breve pausa
      setTimeout(() => {
        if (onFilmeCadastrado) {
          onFilmeCadastrado();
        }
      }, 1500);
    } catch (err) {
      setErro(err.message || 'Erro ao cadastrar filme na API.');
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div className="auth-card" style={{ maxWidth: '100%' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>➕ Cadastrar Novo Filme</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>
              Insira os dados do filme para armazenar na memória da API NestJS
            </p>
          </div>
          <button 
            type="button" 
            onClick={preencherExemploFilme} 
            className="btn btn-secondary btn-sm"
          >
            🎲 Exemplo Aleatório
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
            <span>{sucesso} Redirecionando para a listagem...</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="filme-nome">Título do Filme *</label>
            <input
              id="filme-nome"
              name="nome"
              type="text"
              className="form-control"
              placeholder="Ex: De Volta para o Futuro"
              value={formData.nome}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label" htmlFor="filme-duracao">Duração (em minutos) *</label>
              <input
                id="filme-duracao"
                name="duracao"
                type="number"
                min="1"
                max="999"
                className="form-control"
                placeholder="Ex: 116"
                value={formData.duracao}
                onChange={handleChange}
                required
              />
              <div className="form-helper">Valor numérico enviado como Number para a API</div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="filme-ano">Ano de Lançamento *</label>
              <input
                id="filme-ano"
                name="ano"
                type="number"
                min="1888"
                max="2100"
                className="form-control"
                placeholder="Ex: 1985"
                value={formData.ano}
                onChange={handleChange}
                required
              />
              <div className="form-helper">Ano com 4 dígitos</div>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="filme-sinopse">Sinopse do Filme *</label>
            <textarea
              id="filme-sinopse"
              name="sinopse"
              className="form-control"
              placeholder="Descreva brevemente o enredo da obra..."
              value={formData.sinopse}
              onChange={handleChange}
              rows={4}
              required
            />
          </div>

          {/* Pré-visualização ao vivo do Card */}
          {formData.nome && (
            <div style={{ marginTop: '1.5rem', marginBottom: '1.5rem', padding: '1rem', background: 'rgba(0,0,0,0.25)', borderRadius: 'var(--radius-md)', border: '1px dashed var(--border-color)' }}>
              <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.5rem', fontWeight: 700 }}>
                Pré-visualização do Card
              </div>
              <div style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--text-main)' }}>
                {formData.nome}
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', margin: '0.4rem 0' }}>
                {formData.ano && <span className="meta-badge gold">📅 {formData.ano}</span>}
                {formData.duracao && <span className="meta-badge">⏱️ {formData.duracao} min</span>}
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                {formData.sinopse || 'Sinopse aparecerá aqui...'}
              </p>
            </div>
          )}

          <button 
            type="submit" 
            className="btn btn-primary btn-block" 
            disabled={carregando}
          >
            {carregando ? 'Salvando Filme na API...' : 'Salvar Filme no Acervo'}
          </button>
        </form>
      </div>
    </div>
  );
}
