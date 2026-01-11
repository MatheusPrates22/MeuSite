import { useState, useEffect } from 'react';
import { financasService } from '../../services/financasService';
import styles from './Financas.module.css';

const TIPOS_INVESTIMENTO = [
  'Ações',
  'FIIs',
  'Renda Fixa',
  'Stocks',
  'Criptomoedas',
  'Outros',
];

function Financas() {
  const [lancamentos, setLancamentos] = useState([]);
  const [formData, setFormData] = useState({
    data: '',
    valor: '',
    tipo: 'Ações',
    ativo: '',
  });

  useEffect(() => {
    loadLancamentos();
  }, []);

  const loadLancamentos = () => {
    const todosLancamentos = financasService.getAll();
    // Ordenar por data (mais recente primeiro)
    const sorted = todosLancamentos.sort((a, b) => {
      return new Date(b.data) - new Date(a.data);
    });
    setLancamentos(sorted);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.data || !formData.valor || !formData.ativo.trim()) {
      alert('Por favor, preencha todos os campos obrigatórios');
      return;
    }
    financasService.add({
      ...formData,
      valor: parseFloat(formData.valor),
    });
    setFormData({
      data: '',
      valor: '',
      tipo: 'Ações',
      ativo: '',
    });
    loadLancamentos();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRemove = (id) => {
    if (window.confirm('Deseja realmente remover este lançamento?')) {
      financasService.remove(id);
      loadLancamentos();
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  return (
    <div className={styles.financas}>
      <h1 className={styles.title}>Finanças</h1>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Adicionar Novo Lançamento</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="data">Data *</label>
              <input
                type="date"
                id="data"
                name="data"
                value={formData.data}
                onChange={handleChange}
                className={styles.input}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="valor">Valor (R$) *</label>
              <input
                type="number"
                id="valor"
                name="valor"
                value={formData.valor}
                onChange={handleChange}
                className={styles.input}
                step="0.01"
                min="0"
                placeholder="0.00"
                required
              />
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="tipo">Tipo de Investimento *</label>
              <select
                id="tipo"
                name="tipo"
                value={formData.tipo}
                onChange={handleChange}
                className={styles.select}
                required
              >
                {TIPOS_INVESTIMENTO.map((tipo) => (
                  <option key={tipo} value={tipo}>
                    {tipo}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="ativo">Ativo *</label>
              <input
                type="text"
                id="ativo"
                name="ativo"
                value={formData.ativo}
                onChange={handleChange}
                className={styles.input}
                placeholder="Ex: PETR4, HGLG11, etc."
                required
              />
            </div>
          </div>

          <button type="submit" className={styles.button}>
            Adicionar Lançamento
          </button>
        </form>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
          Meus Lançamentos ({lancamentos.length})
        </h2>
        {lancamentos.length === 0 ? (
          <p className={styles.empty}>
            Nenhum lançamento cadastrado ainda.
          </p>
        ) : (
          <div className={styles.tableContainer}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Data</th>
                  <th>Valor</th>
                  <th>Tipo</th>
                  <th>Ativo</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {lancamentos.map((lancamento) => (
                  <tr key={lancamento.id}>
                    <td>{formatDate(lancamento.data)}</td>
                    <td className={styles.valor}>
                      {formatCurrency(lancamento.valor)}
                    </td>
                    <td>
                      <span className={styles.badge}>{lancamento.tipo}</span>
                    </td>
                    <td className={styles.ativo}>{lancamento.ativo}</td>
                    <td>
                      <button
                        onClick={() => handleRemove(lancamento.id)}
                        className={styles.removeButton}
                        title="Remover lançamento"
                      >
                        Remover
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}

export default Financas;
