"""
gerar_js.py — transforma os arquivos .json da pasta data/ em arquivos .js.

Por quê? Ao abrir o index.html com duplo clique, o navegador bloqueia a leitura
de arquivos .json. Um arquivo .js, porém, pode ser carregado com <script>.
O .json continua sendo o arquivo original; nunca edite o .js à mão.

Como rodar (na pasta do projeto):
    python3 ferramentas/gerar_js.py
"""
import json
import os

# arquivo .json  ->  (arquivo .js, nome da variável usada pelo script.js)
ARQUIVOS = {
    "data/cesta-sao-paulo.json": ("data/cesta-sao-paulo.js", "DADOS_CESTA"),
    "data/ipca-alimentos.json": ("data/ipca-alimentos.js", "DADOS_IPCA"),
    "data/fotos.json": ("data/fotos.js", "DADOS_FOTOS"),
}

for origem, (destino, variavel) in ARQUIVOS.items():
    if not os.path.exists(origem):
        print("não encontrado, pulando:", origem)
        continue
    with open(origem, encoding="utf-8") as f:
        dados = json.load(f)
    with open(destino, "w", encoding="utf-8") as f:
        f.write(f"window.{variavel} = " + json.dumps(dados, ensure_ascii=False, indent=1) + ";\n")
    print(origem, "->", destino)

# Lista dos PDFs do DIEESE que existem na pasta fontes/ deste computador.
# A aba Fontes só mostra o link "cópia local" para os PDFs desta lista.
# Este arquivo não vai para o GitHub (veja o .gitignore): na versão publicada
# aparecem só os links oficiais.
if os.path.isdir("fontes"):
    pdfs = sorted("fontes/" + nome for nome in os.listdir("fontes") if nome.lower().endswith(".pdf"))
    with open("data/copias-locais.js", "w", encoding="utf-8") as f:
        f.write("window.COPIAS_LOCAIS = " + json.dumps(pdfs, indent=1) + ";\n")
    print(len(pdfs), "PDFs em fontes/ ->", "data/copias-locais.js")
