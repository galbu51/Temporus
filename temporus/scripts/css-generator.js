/* ========================================================
   TEMPORUS - CSS-GENERATOR.JS
   Gera CSS dinâmico baseado em configuração
   ======================================================== */

class TempurusCSSGenerator {
  constructor() {
    this.styleElementId = "temporus-style";
    this.styleElement = null;
  }

  /**
   * Gerar CSS completo baseado na configuração
   */
  generateCSS(config) {
    let css = "";

    // 1. ZOOM - usar transform scale para manter layout
    css += this.generateZoomCSS(config.zoom);

    // 2. ESPAÇAMENTO (linhas, letras, palavras)
    css += this.generateSpacingCSS(config);

    // 3. FONTE PARA DISLEXIA
    if (config.dyslexiaMode) {
      css += this.generateDyslexiaCSS();
    }

    // 4. MODO TEA
    if (config.autismMode) {
      css += this.generateAutismCSS();
    }

    // 5. FILTROS DE CORES (Daltonismo, Contraste, Brilho, Saturação)
    css += this.generateColorFiltersCSS(config);

    return css;
  }

  /**
   * CSS para ZOOM (zoom visual sem quebrar layout)
   */
  generateZoomCSS(zoom) {
    if (zoom === 100) return "";

    const scale = zoom / 100;
    // Aplicamos o zoom apenas no <html>. Aplicar em html E body ao mesmo
    // tempo compõe a escala (ex: 150% em ambos vira ~225% de fato), o que
    // fazia o conteúdo "estourar" para fora da tela e ficar cortado/no canto.
    // Aplicando uma única vez, o comportamento fica igual ao zoom nativo
    // do navegador (Ctrl +/-): o layout é recalculado e permanece
    // navegável com scroll normal, sem esconder partes da página.
    return `
      /* Temporus Zoom */
      html {
        zoom: ${scale} !important;
      }
    `;
  }

  /**
   * CSS para ESPAÇAMENTO (linhas, letras, palavras)
   */
  generateSpacingCSS(config) {
    let css = "";

    const styles = [];

    if (config.lineHeight !== 1.5) {
      styles.push(`line-height: ${config.lineHeight} !important`);
    }

    if (config.letterSpacing !== 0) {
      styles.push(`letter-spacing: ${config.letterSpacing}px !important`);
    }

    if (config.wordSpacing !== 0) {
      styles.push(`word-spacing: ${config.wordSpacing}px !important`);
    }

    if (styles.length > 0) {
      css += `
      /* Temporus Espaçamento */
      body, body * {
        ${styles.join(";")};
      }
      `;
    }

    return css;
  }

  /**
   * CSS para DISLEXIA
   * Fonte específica, aumenta espaçamento natural
   */
  generateDyslexiaCSS() {
    return `
      /* Temporus Dislexia */
      body, body * {
        font-family: 'Verdana', 'Arial', sans-serif !important;
        font-weight: 500 !important;
      }
    `;
  }

  /**
   * CSS para TEA (evita elementos que piscam, reduz estimulação visual)
   */
  generateAutismCSS() {
    return `
      /* Temporus TEA */
      * {
        animation: none !important;
        transition: none !important;
      }
    `;
  }

  /**
   * CSS para FILTROS DE CORES
   * Daltonismo, Contraste, Brilho, Saturação
   */
  generateColorFiltersCSS(config) {
    let filters = [];

    // Aplicar filtro específico de daltonismo
    const daltFilter = this.generateColorBlindFilter(config.colorBlindType);
    if (daltFilter) {
      filters.push(daltFilter);
    }

    // CONTRASTE
    if (config.contrast !== 100) {
      filters.push(`contrast(${config.contrast}%)`);
    }

    // BRILHO
    if (config.brightness !== 100) {
      filters.push(`brightness(${config.brightness}%)`);
    }

    // SATURAÇÃO
    if (config.saturation !== 100) {
      filters.push(`saturate(${config.saturation}%)`);
    }

    if (filters.length === 0) return "";

    return `
      /* Temporus Filtros de Cor */
      html {
        filter: ${filters.join(" ")} !important;
      }
    `;
  }

  /**
   * Gerar filtro específico para tipo de daltonismo
   * Baseado em simulações científicas melhoradas
   */
  generateColorBlindFilter(colorBlindType) {
    // Esses filtros são baseados em simulações de Brettel et al. (1997)
    // e ajustes para melhor visualização na web

    switch (colorBlindType) {
      case "protanopia":
        // Deficiência de vermelho (falta de cones L)
        // Simulação com hue-rotate e saturate
        return "hue-rotate(-30deg) saturate(90%) brightness(105%)";

      case "deuteranopia":
        // Deficiência de verde (falta de cones M)
        return "hue-rotate(40deg) saturate(85%) brightness(100%)";

      case "tritanopia":
        // Deficiência de azul (falta de cones S)
        return "hue-rotate(180deg) saturate(100%) brightness(98%)";

      case "achromatopsia":
        // Visão monocromática (ausência de todos os cones de cor)
        return "grayscale(100%) contrast(110%)";

      default:
        return "";
    }
  }

  /**
   * Injetar CSS na página
   */
  applyCSS(css) {
    let styleElement = document.getElementById(this.styleElementId);

    if (!styleElement) {
      styleElement = document.createElement("style");
      styleElement.id = this.styleElementId;
      styleElement.type = "text/css";
      document.head.appendChild(styleElement);
      this.styleElement = styleElement;
    }

    styleElement.innerHTML = css;
  }

  /**
   * Remover todos os estilos
   */
  removeCSS() {
    const styleElement = document.getElementById(this.styleElementId);
    if (styleElement) {
      styleElement.remove();
    }
  }

  /**
   * Aplicar configuração completa (gera e injeta CSS)
   */
  applyConfig(config) {
    const validConfig = window.tempurusStorage.validateConfig(config);
    
    // Verificar se é configuração padrão
    if (this.isDefaultConfig(validConfig)) {
      this.removeCSS();
    } else {
      const css = this.generateCSS(validConfig);
      this.applyCSS(css);
    }
  }

  /**
   * Verificar se configuração é idêntica à padrão
   */
  isDefaultConfig(config) {
    const defaults = TEMPORUS_PROFILES.defaultConfig;
    return JSON.stringify(config) === JSON.stringify(defaults);
  }
}

// Instância global (singleton)
window.tempurusCSS = new TempurusCSSGenerator();
