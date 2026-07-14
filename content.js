/* ========================================================
   TEMPORUS - CONTENT.JS
   Injeta estilos CSS temporários na página
   ======================================================== */

const ID_ESTILO = "temporus-style";

// Obter ou criar elemento <style>
function obterEstilo() {
  let estilo = document.getElementById(ID_ESTILO);
  
  if (!estilo) {
    estilo = document.createElement("style");
    estilo.id = ID_ESTILO;
    document.head.appendChild(estilo);
  }
  
  return estilo;
}

// Remover estilos
function removerEstilo() {
  const estilo = document.getElementById(ID_ESTILO);
  if (estilo) {
    estilo.remove();
  }
}

// Aplicar CSS na página
function aplicarCSS(css) {
  const estilo = obterEstilo();
  estilo.innerHTML = css;
}

// Gerar CSS baseado na configuração
function gerarCSS(config) {
  let css = "";

  // ===== FONTE =====
  css += `
    body * {
      font-size: ${config.fonte}% !important;
      letter-spacing: ${config.espacamento}px !important;
    }
  `;

  // ===== MODO DISLEXIA =====
  if (config.modoDislexia) {
    css += `
      body * {
        font-family: 'Verdana', sans-serif !important;
        font-weight: bold !important;
        line-height: 2 !important;
        letter-spacing: 2px !important;
      }
    `;
  }

  // ===== MODO BAIXA VISÃO =====
  if (config.modoBaixaVisao) {
    css += `
      body * {
        font-size: 150% !important;
        line-height: 1.8 !important;
        letter-spacing: 1px !important;
      }
      html {
        filter: contrast(140%) brightness(110%);
      }
    `;
  }

  // ===== DALTONISMO =====
  switch (config.daltonismo) {
    case "protanopia":
      css += `
        html {
          filter: hue-rotate(0deg) saturate(80%);
        }
      `;
      break;

    case "deuteranopia":
      css += `
        html {
          filter: hue-rotate(25deg) saturate(80%);
        }
      `;
      break;

    case "tritanopia":
      css += `
        html {
          filter: hue-rotate(180deg) saturate(90%);
        }
      `;
      break;
  }

  return css;
}

// Configuração padrão
function configPadrao() {
  return {
    fonte: 100,
    espacamento: 0,
    modoDislexia: false,
    modoBaixaVisao: false,
    daltonismo: "normal"
  };
}

let configAtual = configPadrao();

// ===== CARREGAR CONFIGURAÇÃO SALVA =====
function carregarConfig() {
  const salvo = localStorage.getItem("temporus-config");
  
  if (salvo) {
    try {
      configAtual = JSON.parse(salvo);
      aplicarConfiguracoes(configAtual);
    } catch (erro) {
      console.error("Erro ao carregar Temporus:", erro);
    }
  }
}

// ===== APLICAR CONFIGURAÇÕES =====
function aplicarConfiguracoes(config) {
  configAtual = { ...configPadrao(), ...config };
  
  if (configAtual.fonte === 100 && 
      configAtual.espacamento === 0 &&
      !configAtual.modoDislexia &&
      !configAtual.modoBaixaVisao &&
      configAtual.daltonismo === "normal") {
    removerEstilo();
  } else {
    const css = gerarCSS(configAtual);
    aplicarCSS(css);
  }
  
  localStorage.setItem("temporus-config", JSON.stringify(configAtual));
}

// ===== RESTAURAR PADRÃO =====
function restaurarPadrao() {
  removerEstilo();
  configAtual = configPadrao();
  localStorage.removeItem("temporus-config");
}

// ===== RECEBER MENSAGENS DO POPUP =====
chrome.runtime.onMessage.addListener((mensagem) => {
  if (mensagem.acao === "aplicarConfiguracoes") {
    aplicarConfiguracoes(mensagem.config);
  } else if (mensagem.acao === "restaurarPadrao") {
    restaurarPadrao();
  }
});

// ===== INICIALIZAÇÃO =====
document.addEventListener("DOMContentLoaded", carregarConfig);
if (document.readyState !== "loading") {
  carregarConfig();
}
