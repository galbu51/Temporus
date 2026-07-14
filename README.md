# Temporus - Acessibilidade Visual

Extensão de navegador para personalizar a visualização de páginas web.

## O que foi simplificado

✅ **Mantido:**
- Perfis rápidos: Normalizar, Baixa Visão, Dislexia
- Ajustes de fonte (slider + botões)
- Ajustes de espaçamento entre letras
- Filtros para daltonismo (Protanopia, Deuteranopia, Tritanopia)
- Restaurar padrão
- Sincronização com Chrome Storage

❌ **Removido:**
- Temas (modo escuro, contraste, sépia, etc)
- Largura do texto
- Modo leitura
- Ocultar imagens
- Destacar links/botões
- Cursor grande
- Perfis personalizados
- Perfis TDAH e TEA

## Como instalar

### No Chrome/Edge:
1. Abra `chrome://extensions/` ou `edge://extensions/`
2. Ative o "Modo de desenvolvedor" (canto superior direito)
3. Clique em "Carregar extensão não empacotada"
4. Selecione a pasta com os arquivos

## Como usar

### 1. **Perfis Rápidos**
- **👁️ Visão Normal**: Restaura configurações padrão
- **🔍 Baixa Visão**: Aumenta fonte para 150%, melhora contraste
- **📖 Dislexia**: Fonte maior, espaçamento aumentado, fonte Verdana

### 2. **Ajustes Manuais**
- **Tamanho da Fonte**: Use os botões `−` e `+` ou o slider (50% a 300%)
- **Espaçamento**: Aumenta espaço entre letras (0 a 10px)

### 3. **Daltonismo**
Escolha um filtro de cor para:
- **Protanopia**: Deficiência no vermelho
- **Deuteranopia**: Deficiência no verde
- **Tritanopia**: Deficiência no azul

### 4. **Restaurar Padrão**
Clique para remover todas as alterações

## Estrutura dos arquivos

```
manifest.json    → Configuração da extensão
popup.html       → Interface do popup
popup.css        → Estilos da interface
popup.js         → Lógica do popup (comunica com content.js)
content.js       → Injeta CSS nas páginas
```

## Como funciona

1. **content.js** carrega configurações salvas no `localStorage`
2. Quando você clica em um botão, **popup.js** atualiza a configuração
3. **popup.js** envia mensagem para **content.js** via `chrome.tabs.sendMessage`
4. **content.js** gera CSS baseado na configuração e injeta na página
5. Configurações são salvas em `chrome.storage.sync` (sincroniza com sua conta Chrome)

## Compatibilidade

Funciona em:
- ✅ Qualquer site HTML
- ✅ Google Docs (parcial)
- ✅ Word Online (parcial)
- ✅ PDF no navegador (parcial)

A extensão **não altera** o documento original, apenas a visualização.

## Principais mudanças vs versão anterior

| Aspecto | Antes | Agora |
|---------|--------|--------|
| Linhas de código | ~1500 | ~450 |
| Temas | 6 opções | 0 |
| Perfis | 9 perfis | 3 perfis |
| Armazenamento | localStorage | chrome.storage.sync |
| Funcionalidade | Parcial | **100% funcional** |

## Dica importante

Se a extensão não funcionar:
1. Verifique se `manifest.json` está correto
2. Recarregue a extensão (clique no ícone de reload no chrome://extensions)
3. Abra o DevTools (F12) → Console e procure por erros
4. Tente em uma aba nova

## Próximos passos (futuro)

Se quiser expandir, adicione:
- Tema escuro do popup
- Mais tipos de fonte
- Leitor de texto
- Painel lateral (sidePanel API)
- Sincronização entre dispositivos

## Licença

MIT - Use livremente
