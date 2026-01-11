import { storage } from './storage.js';

const STORAGE_KEY = 'financas';

/**
 * Serviço para gerenciar lançamentos financeiros
 */
export const financasService = {
  /**
   * Obtém todos os lançamentos
   * @returns {Array} Lista de lançamentos
   */
  getAll() {
    const lancamentos = storage.load(STORAGE_KEY);
    return lancamentos || [];
  },

  /**
   * Adiciona um novo lançamento
   * @param {Object} lancamento - Objeto com data, valor, tipo e ativo
   * @returns {Object} Lançamento criado com ID
   */
  add(lancamento) {
    const lancamentos = this.getAll();
    const novoLancamento = {
      id: Date.now().toString(),
      ...lancamento,
      createdAt: new Date().toISOString(),
    };
    lancamentos.push(novoLancamento);
    storage.save(STORAGE_KEY, lancamentos);
    return novoLancamento;
  },

  /**
   * Remove um lançamento pelo ID
   * @param {string} id - ID do lançamento
   */
  remove(id) {
    const lancamentos = this.getAll();
    const filtered = lancamentos.filter((l) => l.id !== id);
    storage.save(STORAGE_KEY, filtered);
  },

  /**
   * Atualiza um lançamento existente
   * @param {string} id - ID do lançamento
   * @param {Object} updates - Campos a serem atualizados
   */
  update(id, updates) {
    const lancamentos = this.getAll();
    const index = lancamentos.findIndex((l) => l.id === id);
    if (index !== -1) {
      lancamentos[index] = { ...lancamentos[index], ...updates };
      storage.save(STORAGE_KEY, lancamentos);
      return lancamentos[index];
    }
    return null;
  },
};
