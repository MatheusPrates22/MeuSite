import { storage } from './storage.js';

const STORAGE_KEY = 'receitas';

/**
 * Serviço para gerenciar receitas
 */
export const receitasService = {
  /**
   * Obtém todas as receitas
   * @returns {Array} Lista de receitas
   */
  getAll() {
    const receitas = storage.load(STORAGE_KEY);
    return receitas || [];
  },

  /**
   * Adiciona uma nova receita
   * @param {Object} receita - Objeto com título, ingredientes e instruções
   * @returns {Object} Receita criada com ID e data
   */
  add(receita) {
    const receitas = this.getAll();
    const novaReceita = {
      id: Date.now().toString(),
      ...receita,
      createdAt: new Date().toISOString(),
    };
    receitas.push(novaReceita);
    storage.save(STORAGE_KEY, receitas);
    return novaReceita;
  },

  /**
   * Remove uma receita pelo ID
   * @param {string} id - ID da receita
   */
  remove(id) {
    const receitas = this.getAll();
    const filtered = receitas.filter((r) => r.id !== id);
    storage.save(STORAGE_KEY, filtered);
  },

  /**
   * Atualiza uma receita existente
   * @param {string} id - ID da receita
   * @param {Object} updates - Campos a serem atualizados
   */
  update(id, updates) {
    const receitas = this.getAll();
    const index = receitas.findIndex((r) => r.id === id);
    if (index !== -1) {
      receitas[index] = { ...receitas[index], ...updates };
      storage.save(STORAGE_KEY, receitas);
      return receitas[index];
    }
    return null;
  },
};
