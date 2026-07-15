/* ========================================================
   TEMPORUS - STORAGE-MANAGER.JS
   Gerencia toda persistência de dados
   ======================================================== */

class TempurusStorageManager {
  constructor() {
    this.storageKey = TEMPORUS_PROFILES.storageKey;
    this.defaultConfig = TEMPORUS_PROFILES.defaultConfig;
    this.listeners = [];
  }

  /**
   * Carregar configuração salva ou retornar padrão
   */
  async loadConfig() {
    return new Promise((resolve) => {
      chrome.storage.sync.get([this.storageKey], (result) => {
        if (result[this.storageKey]) {
          // Mesclar com padrão para garantir que novos campos existem
          const config = {
            ...this.defaultConfig,
            ...result[this.storageKey]
          };
          resolve(config);
        } else {
          resolve({ ...this.defaultConfig });
        }
      });
    });
  }

  /**
   * Salvar configuração
   */
  async saveConfig(config) {
    return new Promise((resolve) => {
      chrome.storage.sync.set(
        { [this.storageKey]: config },
        () => {
          this.notifyListeners(config);
          resolve(config);
        }
      );
    });
  }

  /**
   * Restaurar configuração padrão
   */
  async resetConfig() {
    return new Promise((resolve) => {
      chrome.storage.sync.remove([this.storageKey], () => {
        this.notifyListeners({ ...this.defaultConfig });
        resolve({ ...this.defaultConfig });
      });
    });
  }

  /**
   * Aplicar um perfil
   * (isso apenas define os valores iniciais, não bloqueia personalização)
   */
  applyProfile(profileKey) {
    const profile = TEMPORUS_PROFILES.profiles[profileKey];
    if (profile) {
      return {
        ...this.defaultConfig,
        ...profile.config
      };
    }
    return { ...this.defaultConfig };
  }

  /**
   * Registrar listener para mudanças
   */
  subscribe(callback) {
    this.listeners.push(callback);
  }

  /**
   * Notificar todos os listeners
   */
  notifyListeners(config) {
    this.listeners.forEach((callback) => {
      try {
        callback(config);
      } catch (erro) {
        console.error("Erro em listener Temporus:", erro);
      }
    });
  }

  /**
   * Listar todos os perfis disponíveis
   */
  getProfiles() {
    return TEMPORUS_PROFILES.profiles;
  }

  /**
   * Obter um perfil específico
   */
  getProfile(profileKey) {
    return TEMPORUS_PROFILES.profiles[profileKey];
  }

  /**
   * Validar configuração (garantir que todos os campos existem)
   */
  validateConfig(config) {
    return {
      ...this.defaultConfig,
      ...config
    };
  }
}

// Instância global (singleton)
window.tempurusStorage = new TempurusStorageManager();
