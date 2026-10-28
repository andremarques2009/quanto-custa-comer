# Quanto custa comer?

Produto final do projeto C4 2026 (Colégio Rio Branco, itinerário Lógica e Negócios).
Leonardo Labate (nº 16) e André Luiz (nº 2).

## Como abrir

Dê um duplo clique em `index.html`. Não precisa de internet: o Chart.js está em `vendor/`,
e os dados e as fotos estão dentro da pasta do projeto.

## Telas do app

- **Alimentos** (tela inicial): os 13 alimentos da cesta básica, com foto. Tocar em um alimento abre
  a tela dele, com a inflação (IPCA) dos últimos 4 anos em cada região do Brasil.
- **Cesta × salário**: custo da cesta básica de São Paulo e quanto do salário mínimo ela consome.
- **Fontes**: de onde veio cada número e cada foto.
- **Sobre**: escola, itinerário e integrantes.

## Arquivos

- `index.html`, `style.css`: a estrutura e o visual do app.
- `js/util.js`: funções de formatação usadas por todas as telas.
- `js/alimentos.js`: tela inicial e tela de cada alimento.
- `js/cesta.js`: aba "Cesta × salário".
- `js/fontes.js`: aba "Fontes".
- `js/app.js`: troca de telas (navegação pelo endereço `#/...`).
- `data/cesta-sao-paulo.json`: cesta básica de São Paulo, copiada dos PDFs do DIEESE/Conab.
- `data/ipca-alimentos.json`: IPCA de cada alimento, baixado do IBGE (SIDRA, Tabela 7060).
- `data/fotos.json`: autor, licença e link de cada foto.
- `data/*.js`: cópias dos `.json` em formato que o navegador consegue ler ao abrir a página com
  duplo clique (o navegador bloqueia a leitura direta de arquivos `.json`). Nunca edite à mão.
- `fontes/`: os PDFs mensais da Pesquisa Nacional da Cesta Básica de Alimentos. Esta pasta não vai
  para o GitHub (veja o `.gitignore`): na versão publicada, a aba Fontes mostra só os links oficiais.
- `img/`: fotos dos alimentos (Wikimedia Commons).
- `vendor/chart.umd.min.js`: biblioteca de gráficos Chart.js 4.4.1.
- `ferramentas/`: scripts para atualizar os dados (não são usados pela página).

## Atualizar os dados

Rode os comandos no Terminal, dentro da pasta do projeto.

Baixar de novo o IPCA do IBGE (o período fica no começo do script):

```
python3 ferramentas/baixar_ipca.py
```

Depois de mudar qualquer `.json` da pasta `data/`, gere de novo os `.js`:

```
python3 ferramentas/gerar_js.py
```

O mesmo comando cria `data/copias-locais.js`, a lista dos PDFs que estão em `fontes/`. Com ela, a aba
Fontes mostra também o link da cópia local de cada PDF (só ao abrir o app com duplo clique).

## Publicar no GitHub Pages

O site é só o conteúdo desta pasta: `index.html` na raiz, sem etapa de build. No GitHub, em
Settings → Pages, escolha publicar a partir do ramo principal, pasta `/ (root)`.
