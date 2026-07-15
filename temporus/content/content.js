/* ========================================================
   TEMPORUS - CONTENT.JS
   Injeta estilos CSS nas páginas web
   ======================================================== */

class TempurusContentScript {
  constructor() {
    this.isInitialized = false;
    this.currentConfig = null;
    this.init();
  }

  /**
   * Inicializar o content script
   */
  async init() {
    if (this.isInitialized) return;

    try {
      // 1. Carregar configuração salva
      const config = await window.tempurusStorage.loadConfig();
      this.currentConfig = config;

      // 2. Aplicar configuração na página
      window.tempurusCSS.applyConfig(config);

      // 3. Escutar mudanças de configuração
      this.setupMessageListener();

      this.isInitialized = true;
    } catch (erro) {
      console.error("Erro ao inicializar Temporus:", erro);
    }
  }

  /**
   * Escutar mensagens do popup
   */
  setupMessageListener() {
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      try {
        if (request.action === "applyConfig") {
          this.handleApplyConfig(request.config);
          sendResponse({ success: true });
        } else if (request.action === "resetConfig") {
          this.handleResetConfig();
          sendResponse({ success: true });
        }
      } catch (erro) {
        console.error("Erro ao processar mensagem Temporus:", erro);
        sendResponse({ success: false, error: erro.message });
      }
    });
  }

  /**
   * Handler para aplicar configuração
   */
  handleApplyConfig(config) {
    this.currentConfig = config;
    window.tempurusCSS.applyConfig(config);
    window.tempurusStorage.saveConfig(config);
  }

  /**
   * Handler para restaurar padrão
   */
  handleResetConfig() {
    this.currentConfig = { ...TEMPORUS_PROFILES.defaultConfig };
    window.tempurusCSS.removeCSS();
    window.tempurusStorage.resetConfig();
  }

  /**
   * Obter configuração atual
   */
  getCurrentConfig() {
    return { ...this.currentConfig };
  }
}

// Aguardar DOM estar pronto (ou já estar pronto)
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    window.tempurusContent = new TempurusContentScript();
  });
} else {
  window.tempurusContent = new TempurusContentScript();
}
