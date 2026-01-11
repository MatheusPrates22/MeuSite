/**
 * Wrapper genérico para localStorage
 */
export const storage = {
  /**
   * Salva dados no localStorage
   * @param {string} key - Chave para armazenar os dados
   * @param {any} data - Dados a serem salvos (serão serializados como JSON)
   */
  save(key, data) {
    try {
      const serialized = JSON.stringify(data);
      localStorage.setItem(key, serialized);
    } catch (error) {
      console.error(`Erro ao salvar dados em ${key}:`, error);
    }
  },

  /**
   * Carrega dados do localStorage
   * @param {string} key - Chave dos dados
   * @returns {any|null} Dados carregados ou null se não existir
   */
  load(key) {
    try {
      const item = localStorage.getItem(key);
      if (item === null) {
        return null;
      }
      return JSON.parse(item);
    } catch (error) {
      console.error(`Erro ao carregar dados de ${key}:`, error);
      return null;
    }
  },

  /**
   * Remove dados específicos do localStorage
   * @param {string} key - Chave dos dados a serem removidos
   */
  clear(key) {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Erro ao limpar dados de ${key}:`, error);
    }
  },
};
