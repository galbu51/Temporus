# Temporus 2.0 - Acessibilidade Visual

Extensão de navegador modular e refatorada para acessibilidade visual com suporte a zoom, daltonismo, dislexia, espaçamento e muito mais.

## ✨ O que há de novo (v2.0)

### Melhorias Implementadas

✅ **Zoom Visual Aprimorado**
- Alterado de `font-size` para `zoom` CSS
- Mantém layout proporcional
- Amplifica imagens, ícones e elementos junto com texto
- Não quebra CSS dos sites
- Suporte de 50% a 300%

✅ **Filtros de Daltonismo Melhorados**
- Protanopia (corrigido com hue-rotate -30deg)
- Deuteranopia (hue-rotate 40deg)
- Tritanopia (hue-rotate 180deg)
- **Acromatopsia** (visão monocromática em preto e branco)
- Filtros baseados em simulações científicas (Brettel et al., 1997)

✅ **Espaçamento Expandido**
- Altura da linha (line-height): 1 a 3
- Espaçamento de letras: 0 a 10px
- **Novo:** Espaçamento de palavras: 0 a 15px
- **Novo:** Largura máxima de texto (60, 70, 80 caracteres ou sem limite)

✅ **Controles de Cor Avançados**
- **Contraste:** 80% a 150%
- **Brilho:** 50% a 150%
- **Saturação:** 0% a 150%
- Totalmente independentes dos perfis

✅ **Perfis Inclusivos e Completos**
- ❌ Removido: "Visão Normal" (excludente)
- ✅ **Visual Padrão** (novo nome inclusivo)
- ✅ Baixa Visão
- ✅ Dislexia
- ✅ **TEA** (Transtorno do Espectro Autista)
- ✅ **Sensibilidade à Luz** (novo)
- ✅ **Acromatopsia** (novo)
- ✅ **Protanopia** (novo perfil específico)
- ✅ **Deuteranopia** (novo perfil específico)
- ✅ **Tritanopia** (novo perfil específico)

✅ **Modos Especiais Independentes**
- Modo Dislexia: fonte Verdana específica
- Modo TEA: desativa animações e transições
- Sensibilidade à Luz: reduz brilho natural

✅ **Arquitetura Modular e Refatorada**
- `config-defaults.js` - Configurações e perfis centralizados
- `storage-manager.js` - Gerenciamento de armazenamento
- `css-generator.js` - Geração modular de CSS
- `content.js` - Content script simplificado
- `popup.js` - Interface de popup refatorada

## 📋 Estrutura dos Arquivos

```
temporus/
├── manifest.json                 → Configuração da extensão
├── popup/
│   ├── popup.html               → Interface do popup
│   ├── popup.css                → Estilos do popup
│   └── popup.js                 → Lógica do popup
├── content/
│   └── content.js               → Injeta CSS nas páginas
├── scripts/
│   ├── config-defaults.js       → Perfis e configurações padrão
│   ├── storage-manager.js       → Gerenciamento de armazenamento
│   └── css-generator.js         → Geração de CSS dinâmico
└── README.md                    → Este arquivo
```

## 🚀 Como Instalar

### Chrome/Edge/Brave:
1. Abra `chrome://extensions/` (ou `edge://extensions/`)
2. Ative o **"Modo de desenvolvedor"** (canto superior direito)
3. Clique em **"Carregar extensão não empacotada"**
4. Selecione a pasta `temporus`

### Firefox:
1. Abra `about:debugging#/runtime/this-firefox`
2. Clique em **"Carregar complemento temporário"**
3. Selecione `manifest.json`

## 📖 Como Usar

### 1. **Perfis Rápidos**
Clique em qualquer perfil para aplicar configurações pré-definidas:
- 👁️ **Visual Padrão** - Restaura configurações padrão
- 🔍 **Baixa Visão** - Zoom 180%, contraste aumentado
- 📖 **Dislexia** - Fonte especial, espaçamento ampliado
- 🎨 **TEA** - Reduz animações, sensibilidade visual
- 💡 **Sensibilidade à Luz** - Reduz brilho
- ⚫ **Acromatopsia** - Escala de cinza
- 🔴/🟢/🔵 **Daltonismo específico** - Filtros por tipo

### 2. **Zoom Visual**
- Use os botões `−` e `+` ou o slider
- Intervalo: 50% a 300%
- Mantém layout proporcional

### 3. **Espaçamento**
- **Altura da linha:** 1 a 3 (espaço vertical entre linhas)
- **Espaçamento de letras:** 0 a 10px (kerning)
- **Espaçamento de palavras:** 0 a 15px (space)
- **Largura máxima:** Sem limite, 60, 70 ou 80 caracteres

### 4. **Cores e Filtros**
- **Daltonismo:** Selecione o tipo (5 opções)
- **Contraste:** 80% a 150%
- **Brilho:** 50% a 150%
- **Saturação:** 0% a 150%

### 5. **Modos Especiais**
- ☑️ **Modo Dislexia** - Aplica fonte Verdana
- ☑️ **Modo TEA** - Desativa animações
- ☑️ **Sensibilidade à Luz** - Reduz brilho natural

### 6. **Restaurar Padrão**
Clique no botão vermelho para remover todas as alterações

## 🔧 Personalização

### Adicionar um Novo Perfil

Em `scripts/config-defaults.js`:

```javascript
"meuPerfil": {
  name: "Meu Perfil",
  icon: "🎯",
  config: {
    zoom: 120,
    lineHeight: 1.8,
    letterSpacing: 1,
    wordSpacing: 1,
    maxWidth: "70ch",
    dyslexiaMode: false,
    lowVisionMode: false,
    autismMode: false,
    lightSensitivityMode: false,
    colorBlindType: "normal",
    contrast: 110,
    brightness: 100,
    saturation: 100
  }
}
```

### Alterar Cores/Logo

- **Logo/Ícone:** Altere o ícone em `popup.html` e `config-defaults.js`
- **Cores:** Modifique os valores de `background-color` em `popup.css`
- **Fontes:** Edite em `popup.css` (família de fontes padrão)

### Limites dos Controles

Em `scripts/config-defaults.js`, na seção `limits`:

```javascript
zoom: { min: 50, max: 300, step: 10 },
lineHeight: { min: 1, max: 3, step: 0.1 },
// ... etc
```

## 🌐 Compatibilidade

Funciona em:
- ✅ Qualquer site HTML padrão
- ✅ Google Docs (melhorado)
- ✅ Word Online (melhorado)
- ✅ PDF.js (visualizador de PDF do navegador)
- ✅ Portais governamentais
- ✅ Plataformas de e-learning

A extensão **não altera** o documento original, apenas sua visualização no navegador.

## 🐛 Resolução de Problemas

### Extensão não funciona?
1. Verifique se `manifest.json` está presente
2. Recarregue a extensão em `chrome://extensions`
3. Abra DevTools (F12) → Console e procure por erros
4. Tente em uma aba nova

### Zoom não funciona em alguns sites?
- Alguns sites usam `body { zoom: 1 !important }`, bloqueando o zoom
- Tente aumentar o espaçamento e o tamanho da fonte alternativamente

### Filtros de cor parecem errados?
- Diferentes navegadores podem renderizar filtros CSS de forma ligeiramente diferente
- Ajuste o contraste/brilho para compensar

## 📊 Comparação: v1.0 → v2.0

| Aspecto | v1.0 | v2.0 |
|---------|------|------|
| Linhas de código | ~450 | ~600 (mais modular) |
| Perfis | 3 | 9 |
| Modo Zoom | `font-size` | `zoom` CSS |
| Controles de cor | 0 | 3 (contraste, brilho, saturação) |
| Espaçamento | 2 opções | 4 opções |
| Arquitetura | Monolítica | Modular (3 módulos) |
| Performance | Boa | Melhor (CSS único) |

## 🎯 Próximos Passos (v3.0)

Ideias para futuras versões:
- [ ] Leitor de texto em voz alta
- [ ] Mais opções de fonte (OpenDyslexic, etc)
- [ ] Painel lateral com abas (sidePanel API)
- [ ] Sincronização entre dispositivos
- [ ] Modo escuro do próprio popup
- [ ] Temas customizados pelo usuário
- [ ] Atalhos de teclado (Alt+T para abrir)
- [ ] Integração com preferências do SO (prefers-contrast, prefers-color-scheme)

## 📝 Notas de Desenvolvimento

### Decisões de Arquitetura

1. **Modularidade:**
   - Separação clara de responsabilidades
   - Fácil de testar e expandir

2. **Performance:**
   - Um único elemento `<style>` reutilizado
   - CSS gerado uma única vez por mudança
   - Sem observers ou re-renders desnecessários

3. **Compatibilidade:**
   - Manifest V3 (padrão atual do Chrome)
   - Sem dependências externas
   - Vanilla JavaScript

4. **Acessibilidade:**
   - Labels em HTML semântico
   - Navegação por teclado
   - Alto contraste na interface

## 📄 Licença

MIT - Use livremente, modifique conforme necessário.

## 👥 Contribuições

Encontrou um bug? Tem uma sugestão? Sinta-se livre para criar um issue ou PR!

---

**Temporus 2.0** - Acessibilidade visual para todos 🌍
