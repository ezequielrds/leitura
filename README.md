# Leitura por Sílabas – Estrelinhas ⭐

Aplicativo educacional interativo para auxiliar crianças no aprendizado de leitura, com foco em silabação e reconhecimento de palavras e frases.

## 🌐 Ver o Aplicativo Online

**Link para GitHub Pages:** https://ezequielrds.github.io/leitura/

> ⚠️ **Nota:** Para que o link funcione, é necessário ativar o GitHub Pages nas configurações do repositório (ver instruções abaixo).

## 📋 Funcionalidades

- 🔤 **Modo Palavras**: Palavras separadas por sílabas para facilitar o aprendizado
- 📚 **Modo Frases**: Pequenas sentenças para prática de leitura contextual
- 🎯 **Sistema de Progressão**: Níveis, sequências e recordes para motivação
- 🔈 **Áudio**: Botão para ouvir a pronúncia das palavras
- 📊 **Indicador de Dificuldade**: Feedback visual sobre o nível da palavra
- ⭐ **Recompensas**: Sistema de conquistas para celebrar o progresso
- 🔄 **Personalização**: Opção de alternar entre maiúsculas e minúsculas
- ✏️ **Lista Customizável**: Possibilidade de carregar suas próprias palavras

## 🚀 Como Acessar o Aplicativo

O aplicativo é automaticamente publicado no GitHub Pages através de GitHub Actions.

### Acesso Direto

Após o push para o branch `copilot/add-github-pages-branch`, o site estará disponível em:
- **URL do preview**: https://ezequielrds.github.io/leitura/

O deploy é automático - não é necessário configuração manual! O workflow cria automaticamente o branch `gh-pages` e publica o conteúdo.

## 🛠️ Desenvolvimento Local

Para executar o projeto localmente:

```bash
# Clone o repositório
git clone https://github.com/ezequielrds/leitura.git

# Entre no diretório
cd leitura

# Abra o arquivo index.html em um navegador
# Ou use um servidor local, por exemplo:
python -m http.server 8000
# ou
npx serve
```

Depois acesse: http://localhost:8000

## 📂 Estrutura do Projeto

```
leitura/
├── index.html          # Página principal
├── script.js           # Lógica do aplicativo
├── styles.css          # Estilos visuais
├── words.json          # Lista de palavras
├── phrases.json        # Lista de frases
├── audio/              # Arquivos de áudio de incentivo
└── .github/
    └── workflows/
        └── deploy-github-pages.yml  # Workflow de deploy
```

## 📝 Como Usar

1. Escolha entre o modo **Palavras** ou **Frases**
2. Leia a palavra/frase apresentada
3. Clique em "**Acertei sozinho(a)**" quando conseguir ler corretamente
4. Use "**Próxima palavra**" para pular ou após usar a ajuda
5. Ganhe estrelas e suba de nível!

### Dicas de Uso

- Pressione **Enter** para marcar "Acertei"
- Pressione **Barra de espaço** para "Próxima"
- Use o botão **🔈 Ouvir** para escutar a pronúncia
- Clique em "**Mostrar sílabas**" para ver a separação silábica

## 🎨 Personalização

Você pode personalizar a lista de palavras:

1. Clique em "**Carregar/editar lista de palavras**"
2. Digite suas palavras separando as sílabas com hífen (ex: `ca-sa`, `ga-to`)
3. Clique em "**Usar lista**"

## 📄 Licença

Este projeto é de código aberto e está disponível para uso educacional.

## 🤝 Contribuições

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests.
