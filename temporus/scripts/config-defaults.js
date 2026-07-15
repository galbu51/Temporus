/* ========================================================
   TEMPORUS - CONFIG-DEFAULTS.JS
   Configurações padrão e perfis de acessibilidade
   ======================================================== */

const TEMPORUS_PROFILES = {
  // Perfis de acessibilidade (perfis rápidos)
  profiles: {
    // Configuração padrão
    "padrao": {
      name: "Visual Padrão",
      icon: "👁️",
      config: {
        zoom: 100,
        lineHeight: 1.5,
        letterSpacing: 0,
        wordSpacing: 0,
        dyslexiaMode: false,
        lowVisionMode: false,
        autismMode: false,
        lightSensitivityMode: false,
        colorBlindType: "normal",
        contrast: 100,
        brightness: 100,
        saturation: 100
      }
    },

    // Baixa visão
    "baixaVisao": {
      name: "Baixa Visão",
      icon: "🔍",
      config: {
        zoom: 180,
        lineHeight: 1.8,
        letterSpacing: 1,
        wordSpacing: 2,
        dyslexiaMode: false,
        lowVisionMode: true,
        autismMode: false,
        lightSensitivityMode: false,
        colorBlindType: "normal",
        contrast: 140,
        brightness: 110,
        saturation: 100
      }
    },

    // Dislexia
    "dislexia": {
      name: "Dislexia",
      icon: "📖",
      config: {
        zoom: 120,
        lineHeight: 2,
        letterSpacing: 2,
        wordSpacing: 1,
        dyslexiaMode: true,
        lowVisionMode: false,
        autismMode: false,
        lightSensitivityMode: false,
        colorBlindType: "normal",
        contrast: 110,
        brightness: 100,
        saturation: 100
      }
    },

    // TEA (Transtorno do Espectro Autista)
    "tea": {
      name: "TEA",
      icon: "🎨",
      config: {
        zoom: 110,
        lineHeight: 1.7,
        letterSpacing: 1,
        wordSpacing: 1,
        dyslexiaMode: false,
        lowVisionMode: false,
        autismMode: true,
        lightSensitivityMode: true,
        colorBlindType: "normal",
        contrast: 120,
        brightness: 95,
        saturation: 85
      }
    },

    // Sensibilidade à luz
    // Ajustado para apenas reduzir brilho/contraste via filtro, sem forçar
    // cores de fundo (evita "clarear" temas escuros de sites/apps)
    "sensibilidadeLuz": {
      name: "Sensibilidade à Luz",
      icon: "💡",
      config: {
        zoom: 100,
        lineHeight: 1.6,
        letterSpacing: 0,
        wordSpacing: 0,
        dyslexiaMode: false,
        lowVisionMode: false,
        autismMode: false,
        lightSensitivityMode: true,
        colorBlindType: "normal",
        contrast: 90,
        brightness: 80,
        saturation: 85
      }
    }
  },

  // Configuração padrão completa
  defaultConfig: {
    zoom: 100,
    lineHeight: 1.5,
    letterSpacing: 0,
    wordSpacing: 0,
    dyslexiaMode: false,
    lowVisionMode: false,
    autismMode: false,
    lightSensitivityMode: false,
    colorBlindType: "normal",
    contrast: 100,
    brightness: 100,
    saturation: 100
  },

  // Limites dos controles
  limits: {
    zoom: { min: 50, max: 200, step: 10 },
    lineHeight: { min: 1, max: 3, step: 0.1 },
    letterSpacing: { min: 0, max: 10, step: 0.5 },
    wordSpacing: { min: 0, max: 15, step: 0.5 },
    contrast: { min: 80, max: 150, step: 5 },
    brightness: { min: 50, max: 150, step: 5 },
    saturation: { min: 0, max: 150, step: 5 }
  },

  // Identificador de armazenamento
  storageKey: "temporus-config"
};
