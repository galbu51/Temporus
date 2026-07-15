/* ========================================================
   TEMPORUS - POPUP.JS
   Gerencia a interface do popup
   ======================================================== */

class TempurusPopup {
  constructor() {
    this.currentConfig = { ...TEMPORUS_PROFILES.defaultConfig };
    this.elements = this.cacheElements();
    this.init();
  }

  /**
   * Cache dos elementos HTML
   */
  cacheElements() {
    return {
      // Zoom
      zoomRange: document.getElementById("zoomRange"),
      zoomValue: document.getElementById("zoomValue"),
      zoomIn: document.getElementById("zoomIn"),
      zoomOut: document.getElementById("zoomOut"),

      // Espaçamento
      lineHeightRange: document.getElementById("lineHeightRange"),
      lineHeightValue: document.getElementById("lineHeightValue"),
      letterSpacingRange: document.getElementById("letterSpacingRange"),
      letterSpacingValue: document.getElementById("letterSpacingValue"),
      wordSpacingRange: document.getElementById("wordSpacingRange"),
      wordSpacingValue: document.getElementById("wordSpacingValue"),

      // Cores
      colorBlindType: document.getElementById("colorBlindType"),
      contrastRange: document.getElementById("contrastRange"),
      contrastValue: document.getElementById("contrastValue"),
      brightnessRange: document.getElementById("brightnessRange"),
      brightnessValue: document.getElementById("brightnessValue"),
      saturationRange: document.getElementById("saturationRange"),
      saturationValue: document.getElementById("saturationValue"),

      // Botões
      resetBtn: document.getElementById("resetBtn"),
      profilesContainer: document.getElementById("profilesContainer")
    };
  }

  /**
   * Inicialização
   */
  async init() {
    try {
      // 1. Carregar configuração
      this.currentConfig = await window.tempurusStorage.loadConfig();

      // 2. Renderizar perfis
      this.renderProfiles();

      // 3. Atualizar interface com config atual
      this.updateUI();

      // 4. Configurar listeners
      this.setupListeners();
    } catch (erro) {
      console.error("Erro ao inicializar popup Temporus:", erro);
    }
  }

  /**
   * Renderizar botões de perfis dinamicamente
   */
  renderProfiles() {
    const profiles = TEMPORUS_PROFILES.profiles;
    const container = this.elements.profilesContainer;

    container.innerHTML = "";

    Object.entries(profiles).forEach(([key, profile]) => {
      const btn = document.createElement("button");
      btn.className = "profile-btn";
      btn.setAttribute("data-profile", key);
      btn.innerHTML = `<span>${profile.icon}</span> ${profile.name}`;

      btn.addEventListener("click", () => this.applyProfile(key));
      container.appendChild(btn);
    });
  }

  /**
   * Aplicar um perfil (apenas define valores iniciais)
   */
  applyProfile(profileKey) {
    const profileConfig = window.tempurusStorage.applyProfile(profileKey);
    this.updateConfig(profileConfig);
  }

  /**
   * Atualizar interface com config atual
   */
  updateUI() {
    // Zoom
    this.elements.zoomRange.value = this.currentConfig.zoom;
    this.elements.zoomValue.textContent = this.currentConfig.zoom + "%";

    // Espaçamento
    this.elements.lineHeightRange.value = this.currentConfig.lineHeight;
    this.elements.lineHeightValue.textContent = this.currentConfig.lineHeight.toFixed(1);

    this.elements.letterSpacingRange.value = this.currentConfig.letterSpacing;
    this.elements.letterSpacingValue.textContent = this.currentConfig.letterSpacing.toFixed(1) + "px";

    this.elements.wordSpacingRange.value = this.currentConfig.wordSpacing;
    this.elements.wordSpacingValue.textContent = this.currentConfig.wordSpacing.toFixed(1) + "px";

    // Cores
    this.elements.colorBlindType.value = this.currentConfig.colorBlindType;
    this.elements.contrastRange.value = this.currentConfig.contrast;
    this.elements.contrastValue.textContent = this.currentConfig.contrast + "%";

    this.elements.brightnessRange.value = this.currentConfig.brightness;
    this.elements.brightnessValue.textContent = this.currentConfig.brightness + "%";

    this.elements.saturationRange.value = this.currentConfig.saturation;
    this.elements.saturationValue.textContent = this.currentConfig.saturation + "%";
  }

  /**
   * Configurar event listeners
   */
  setupListeners() {
    // Zoom
    this.elements.zoomRange?.addEventListener("input", (e) => {
      this.currentConfig.zoom = parseInt(e.target.value);
      this.elements.zoomValue.textContent = this.currentConfig.zoom + "%";
      this.applyConfig();
    });

    this.elements.zoomIn?.addEventListener("click", () => {
      this.currentConfig.zoom = Math.min(this.currentConfig.zoom + 10, 300);
      this.updateUI();
      this.applyConfig();
    });

    this.elements.zoomOut?.addEventListener("click", () => {
      this.currentConfig.zoom = Math.max(this.currentConfig.zoom - 10, 50);
      this.updateUI();
      this.applyConfig();
    });

    // Espaçamento - linha
    this.elements.lineHeightRange?.addEventListener("input", (e) => {
      this.currentConfig.lineHeight = parseFloat(e.target.value);
      this.elements.lineHeightValue.textContent = this.currentConfig.lineHeight.toFixed(1);
      this.applyConfig();
    });

    // Espaçamento - letras
    this.elements.letterSpacingRange?.addEventListener("input", (e) => {
      this.currentConfig.letterSpacing = parseFloat(e.target.value);
      this.elements.letterSpacingValue.textContent = this.currentConfig.letterSpacing.toFixed(1) + "px";
      this.applyConfig();
    });

    // Espaçamento - palavras
    this.elements.wordSpacingRange?.addEventListener("input", (e) => {
      this.currentConfig.wordSpacing = parseFloat(e.target.value);
      this.elements.wordSpacingValue.textContent = this.currentConfig.wordSpacing.toFixed(1) + "px";
      this.applyConfig();
    });

    // Cores - daltonismo
    this.elements.colorBlindType?.addEventListener("change", (e) => {
      this.currentConfig.colorBlindType = e.target.value;
      this.applyConfig();
    });

    // Cores - contraste
    this.elements.contrastRange?.addEventListener("input", (e) => {
      this.currentConfig.contrast = parseInt(e.target.value);
      this.elements.contrastValue.textContent = this.currentConfig.contrast + "%";
      this.applyConfig();
    });

    // Cores - brilho
    this.elements.brightnessRange?.addEventListener("input", (e) => {
      this.currentConfig.brightness = parseInt(e.target.value);
      this.elements.brightnessValue.textContent = this.currentConfig.brightness + "%";
      this.applyConfig();
    });

    // Cores - saturação
    this.elements.saturationRange?.addEventListener("input", (e) => {
      this.currentConfig.saturation = parseInt(e.target.value);
      this.elements.saturationValue.textContent = this.currentConfig.saturation + "%";
      this.applyConfig();
    });

    // Restaurar padrão
    this.elements.resetBtn?.addEventListener("click", () => this.resetConfig());
  }

  /**
   * Atualizar configuração no armazenamento e enviar para content
   */
  async applyConfig() {
    // Salvar
    await window.tempurusStorage.saveConfig(this.currentConfig);

    // Enviar para a página atual
    this.sendToContent({
      action: "applyConfig",
      config: this.currentConfig
    });
  }

  /**
   * Restaurar configuração padrão
   */
  async resetConfig() {
    this.currentConfig = { ...TEMPORUS_PROFILES.defaultConfig };
    this.updateUI();
    await window.tempurusStorage.resetConfig();

    this.sendToContent({
      action: "resetConfig"
    });
  }

  /**
   * Atualizar configuração (sem salvar ainda)
   */
  updateConfig(config) {
    this.currentConfig = { ...config };
    this.updateUI();
    this.applyConfig();
  }

  /**
   * Enviar mensagem para o content script
   */
  sendToContent(message) {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]) {
        chrome.tabs.sendMessage(tabs[0].id, message).catch((erro) => {
          console.error("Erro ao enviar mensagem para content:", erro);
        });
      }
    });
  }
}

// Inicializar quando DOM está pronto
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    window.tempurusPopup = new TempurusPopup();
  });
} else {
  window.tempurusPopup = new TempurusPopup();
}
