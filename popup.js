/* ========================================================
   TEMPORUS - POPUP.JS
   Gerencia interface e comunica com content.js
   ======================================================== */

// ===== ESTADO DA EXTENSÃO =====
const config = {
  fonte: 100,
  espacamento: 0,
  modoDislexia: false,
  modoBaixaVisao: false,
  daltonismo: "normal"
};

// ===== ELEMENTOS HTML =====
const elementos = {
  // Fonte
  fonte: document.getElementById("fonte"),
  aumentarFonte: document.getElementById("aumentarFonte"),
  diminuirFonte: document.getElementById("diminuirFonte"),
  valorFonte: document.getElementById("valorFonte"),

  // Espaçamento
  espacamento: document.getElementById("espacamento"),
  valorEspacamento: document.getElementById("valorEspacamento"),

  // Perfis
  normalizarBtn: document.getElementById("normalizar"),
  baixaVisaoBtn: document.getElementById("baixaVisao"),
  dislexiaBtn: document.getElementById("dislexia"),

  // Daltonismo
  daltonismo: document.getElementById("daltonismo"),

  // Botões
  restaurarBtn: document.getElementById("restaurar")
};

// ===== ENVIAR CONFIGURAÇÃO PARA A PÁGINA =====
async function enviarConfig() {
  try {
    const [aba] = await chrome.tabs.query({
      active: true,
      currentWindow: true
    });

    if (!aba) return;

    chrome.tabs.sendMessage(aba.id, {
      acao: "aplicarConfiguracoes",
      config: config
    });
  } catch (erro) {
    console.log("Temporus erro:", erro);
  }
}

// ===== ATUALIZAR INTERFACE =====
function atualizarInterface() {
  if (elementos.valorFonte) {
    elementos.valorFonte.textContent = config.fonte + "%";
  }
  if (elementos.fonte) {
    elementos.fonte.value = config.fonte;
  }

  if (elementos.valorEspacamento) {
    elementos.valorEspacamento.textContent = config.espacamento + "px";
  }
  if (elementos.espacamento) {
    elementos.espacamento.value = config.espacamento;
  }

  if (elementos.daltonismo) {
    elementos.daltonismo.value = config.daltonismo;
  }
}

// ===== CARREGAR CONFIG SALVA =====
function carregarConfig() {
  chrome.storage.sync.get("temporus", (dados) => {
    if (dados.temporus) {
      Object.assign(config, dados.temporus);
      atualizarInterface();
    }
  });
}

// ===== SALVAR CONFIG =====
function salvarConfig() {
  chrome.storage.sync.set({ temporus: config });
}

// ===== EVENT LISTENERS =====

// Botão aumentar fonte
elementos.aumentarFonte?.addEventListener("click", () => {
  config.fonte = Math.min(config.fonte + 10, 300);
  config.modoDislexia = false;
  config.modoBaixaVisao = false;
  atualizarInterface();
  salvarConfig();
  enviarConfig();
});

// Botão diminuir fonte
elementos.diminuirFonte?.addEventListener("click", () => {
  config.fonte = Math.max(config.fonte - 10, 50);
  config.modoDislexia = false;
  config.modoBaixaVisao = false;
  atualizarInterface();
  salvarConfig();
  enviarConfig();
});

// Slider fonte
elementos.fonte?.addEventListener("input", (e) => {
  config.fonte = parseInt(e.target.value);
  config.modoDislexia = false;
  config.modoBaixaVisao = false;
  atualizarInterface();
  salvarConfig();
  enviarConfig();
});

// Slider espaçamento
elementos.espacamento?.addEventListener("input", (e) => {
  config.espacamento = parseInt(e.target.value);
  config.modoDislexia = false;
  config.modoBaixaVisao = false;
  atualizarInterface();
  salvarConfig();
  enviarConfig();
});

// Perfil: Normalizar
elementos.normalizarBtn?.addEventListener("click", () => {
  config.fonte = 100;
  config.espacamento = 0;
  config.modoDislexia = false;
  config.modoBaixaVisao = false;
  config.daltonismo = "normal";
  atualizarInterface();
  salvarConfig();
  enviarConfig();
});

// Perfil: Baixa visão
elementos.baixaVisaoBtn?.addEventListener("click", () => {
  config.modoBaixaVisao = true;
  config.modoDislexia = false;
  config.fonte = 150;
  config.espacamento = 1;
  config.daltonismo = "normal";
  atualizarInterface();
  salvarConfig();
  enviarConfig();
});

// Perfil: Dislexia
elementos.dislexiaBtn?.addEventListener("click", () => {
  config.modoDislexia = true;
  config.modoBaixaVisao = false;
  config.fonte = 130;
  config.espacamento = 2;
  config.daltonismo = "normal";
  atualizarInterface();
  salvarConfig();
  enviarConfig();
});

// Daltonismo
elementos.daltonismo?.addEventListener("change", (e) => {
  config.daltonismo = e.target.value;
  config.modoDislexia = false;
  config.modoBaixaVisao = false;
  config.fonte = 100;
  config.espacamento = 0;
  atualizarInterface();
  salvarConfig();
  enviarConfig();
});

// Restaurar padrão
elementos.restaurarBtn?.addEventListener("click", () => {
  try {
    const [aba] = chrome.tabs.query({
      active: true,
      currentWindow: true
    }, (tabs) => {
      if (tabs[0]) {
        chrome.tabs.sendMessage(tabs[0].id, {
          acao: "restaurarPadrao"
        });
      }
    });
  } catch (erro) {
    console.log("Erro ao restaurar:", erro);
  }

  config.fonte = 100;
  config.espacamento = 0;
  config.modoDislexia = false;
  config.modoBaixaVisao = false;
  config.daltonismo = "normal";
  atualizarInterface();
  salvarConfig();
});

// ===== INICIALIZAÇÃO =====
document.addEventListener("DOMContentLoaded", carregarConfig);
