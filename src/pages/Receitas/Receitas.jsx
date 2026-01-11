import { useState, useEffect } from 'react';
import { receitasService } from '../../services/receitasService';
import styles from './Receitas.module.css';

function Receitas() {
  const [receitas, setReceitas] = useState([]);
  const [expandedReceitas, setExpandedReceitas] = useState(new Set());
  const [formData, setFormData] = useState({
    titulo: '',
    ingredientes: '',
    instrucoes: '',
  });

  useEffect(() => {
    loadReceitas();
  }, []);

  const loadReceitas = () => {
    const todasReceitas = receitasService.getAll();
    setReceitas(todasReceitas);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.titulo.trim()) {
      alert('Por favor, preencha o título da receita');
      return;
    }
    receitasService.add(formData);
    setFormData({ titulo: '', ingredientes: '', instrucoes: '' });
    loadReceitas();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRemove = (id) => {
    if (window.confirm('Deseja realmente remover esta receita?')) {
      receitasService.remove(id);
      loadReceitas();
    }
  };

  const toggleReceita = (id) => {
    setExpandedReceitas((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  return (
    <div className={styles.receitas}>
      <h1 className={styles.title}>Receitas</h1>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Adicionar Nova Receita</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="titulo">Título</label>
            <input
              type="text"
              id="titulo"
              name="titulo"
              value={formData.titulo}
              onChange={handleChange}
              className={styles.input}
              placeholder="Nome da receita"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="ingredientes">Ingredientes</label>
            <textarea
              id="ingredientes"
              name="ingredientes"
              value={formData.ingredientes}
              onChange={handleChange}
              className={styles.textarea}
              rows="5"
              placeholder="Lista de ingredientes (um por linha ou separados por vírgula)"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="instrucoes">Instruções</label>
            <textarea
              id="instrucoes"
              name="instrucoes"
              value={formData.instrucoes}
              onChange={handleChange}
              className={styles.textarea}
              rows="8"
              placeholder="Modo de preparo"
            />
          </div>

          <button type="submit" className={styles.button}>
            Adicionar Receita
          </button>
        </form>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
          Minhas Receitas ({receitas.length})
        </h2>
        {receitas.length === 0 ? (
          <p className={styles.empty}>Nenhuma receita cadastrada ainda.</p>
        ) : (
          <div className={styles.receitasList}>
            {receitas.map((receita) => {
              const isExpanded = expandedReceitas.has(receita.id);
              return (
                <div key={receita.id} className={styles.receitaCard}>
                  <div className={styles.receitaHeader}>
                    <h3
                      className={styles.receitaTitle}
                      onClick={() => toggleReceita(receita.id)}
                    >
                      {isExpanded ? '▼' : '▶'} {receita.titulo}
                    </h3>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemove(receita.id);
                      }}
                      className={styles.removeButton}
                      title="Remover receita"
                    >
                      ×
                    </button>
                  </div>
                  {isExpanded && (
                    <div className={styles.receitaContent}>
                      {receita.ingredientes && (
                        <div className={styles.receitaSection}>
                          <strong>Ingredientes:</strong>
                          <p className={styles.receitaText}>
                            {receita.ingredientes}
                          </p>
                        </div>
                      )}
                      {receita.instrucoes && (
                        <div className={styles.receitaSection}>
                          <strong>Instruções:</strong>
                          <p className={styles.receitaText}>
                            {receita.instrucoes}
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}

export default Receitas;
