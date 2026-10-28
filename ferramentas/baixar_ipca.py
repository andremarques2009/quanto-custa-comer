"""
baixar_ipca.py — baixa do IBGE (SIDRA, Tabela 7060) a inflação (IPCA) de cada
alimento da cesta básica e salva em data/ipca-alimentos.json.

A página NÃO busca nada na internet: este script é rodado uma vez, à mão,
e o resultado fica salvo na pasta data/.

Como rodar (na pasta do projeto):
    python3 ferramentas/baixar_ipca.py
Depois, gere o .js para a página:
    python3 ferramentas/gerar_js.py
"""
import gzip
import json
import urllib.request
from datetime import date

# Período: últimos 4 anos (48 meses) até o mês mais recente usado no projeto
MES_INICIAL = "202210"
MES_FINAL = "202609"

# Variáveis da Tabela 7060
VAR_MENSAL = 63      # IPCA - Variação mensal (%)
VAR_12_MESES = 2265  # IPCA - Variação acumulada em 12 meses (%)

# Índice geral do IPCA (para comparar cada alimento com a inflação de tudo)
INDICE_GERAL = {"codigo": 7169, "nome": "Índice geral"}

# Alimentos da cesta básica do DIEESE -> item(ns) correspondente(s) no IPCA.
# Quando o IPCA não tem um item igual ao da cesta, a observação explica a escolha.
ALIMENTOS = [
    {"chave": "acucar-refinado", "nome": "açúcar refinado",
     "itens_ipca": [{"codigo": 7220, "nome": "Açúcar refinado"}]},
    {"chave": "arroz-agulhinha", "nome": "arroz agulhinha",
     "itens_ipca": [{"codigo": 7173, "nome": "Arroz"}],
     "observacao": "O IPCA tem um único item \"Arroz\", sem separar o tipo agulhinha."},
    {"chave": "banana", "nome": "banana",
     "itens_ipca": [{"codigo": 7260, "nome": "Banana - prata", "rotulo": "Banana prata"},
                    {"codigo": 7258, "nome": "Banana - d'água", "rotulo": "Banana d'água (nanica)"}],
     "observacao": "O IPCA separa a banana por tipo. Mostramos a banana prata e a banana d'água (nanica), "
                   "os dois tipos pesquisados pelo DIEESE na cesta básica.",
     "fonte_observacao": "metodologia-dieese-2016"},
    {"chave": "batata", "nome": "batata",
     "itens_ipca": [{"codigo": 7202, "nome": "Batata-inglesa"}]},
    {"chave": "cafe-em-po", "nome": "café em pó",
     "itens_ipca": [{"codigo": 7392, "nome": "Café moído"}]},
    {"chave": "carne-bovina-de-primeira", "nome": "carne bovina de primeira",
     "itens_ipca": [{"codigo": 7293, "nome": "Chã de dentro", "rotulo": "Chã de dentro (coxão mole)"},
                    {"codigo": 7295, "nome": "Patinho", "rotulo": "Patinho"}],
     "observacao": "Como carne bovina de primeira, o DIEESE pesquisa o coxão mole (chã de dentro), o coxão duro "
                   "(chã de fora) e o patinho. O IPCA acompanha o coxão mole e o patinho, mas não o coxão duro "
                   "separadamente. Por isso mostramos os dois cortes do IPCA separados, sem fazer média entre eles.",
     "fonte_observacao": "metodologia-dieese-2016"},
    {"chave": "farinha-de-trigo", "nome": "farinha de trigo",
     "itens_ipca": [{"codigo": 7191, "nome": "Farinha de trigo"}]},
    {"chave": "feijao-carioca", "nome": "feijão carioca",
     "itens_ipca": [{"codigo": 12222, "nome": "Feijão - carioca (rajado)"},
                    {"codigo": 7176, "nome": "Feijão - preto"}],
     "observacao": "Na cesta de São Paulo o feijão é o carioca. Também mostramos o feijão preto, que é o pesquisado pelo DIEESE no Sul, no Rio de Janeiro e em Vitória."},
    {"chave": "leite-integral", "nome": "leite integral",
     "itens_ipca": [{"codigo": 12393, "nome": "Leite longa vida"}],
     "observacao": "O IPCA mede o \"Leite longa vida\" (leite de caixinha)."},
    {"chave": "manteiga", "nome": "manteiga",
     "itens_ipca": [{"codigo": 7367, "nome": "Manteiga"}]},
    {"chave": "oleo-de-soja", "nome": "óleo de soja",
     "itens_ipca": [{"codigo": 7385, "nome": "Óleo de soja"}]},
    {"chave": "pao-frances", "nome": "pão francês",
     "itens_ipca": [{"codigo": 7375, "nome": "Pão francês"}]},
    {"chave": "tomate", "nome": "tomate",
     "itens_ipca": [{"codigo": 7212, "nome": "Tomate"}]},
]

# Documentos citados nas observações acima
FONTES_OBSERVACOES = {
    "metodologia-dieese-2016": {
        "nome": "DIEESE – Metodologia da Pesquisa Nacional da Cesta Básica de Alimentos (janeiro de 2016)",
        "pagina": 5,
        "link": "https://www.dieese.org.br/metodologia/metodologiaCestaBasica2016.pdf",
        "trecho": "No caso da carne bovina de primeira, devem ser pesquisados o coxão mole (chã de dentro), "
                  "o coxão duro (chã de fora) e o patinho, todos os cortes sem osso. Nos supermercados, sacolões e "
                  "hortifrútis, onde o preço da banana é comercializado por kg, deve-se coletar e digitar o preço do "
                  "quilo no sistema. O próprio sistema fará a conversão do quilo da banana prata e nanica [...]",
    },
}

# Região do Brasil de cada local pesquisado pelo IPCA (pelo estado)
REGIAO_POR_UF = {
    "PA": "Norte", "AC": "Norte",
    "CE": "Nordeste", "PE": "Nordeste", "BA": "Nordeste", "MA": "Nordeste", "SE": "Nordeste",
    "MG": "Sudeste", "ES": "Sudeste", "RJ": "Sudeste", "SP": "Sudeste",
    "PR": "Sul", "RS": "Sul",
    "MS": "Centro-Oeste", "GO": "Centro-Oeste", "DF": "Centro-Oeste",
}

# Significado dos símbolos usados pelo IBGE no lugar de números
SIMBOLOS = {
    "-": "zero absoluto, não resultante de arredondamento",
    "..": "não se aplica dado numérico",
    "...": "dado numérico não disponível",
    "X": "dado numérico omitido a fim de evitar a individualização da informação",
}


URL_REGIOES_METROPOLITANAS = "https://servicodados.ibge.gov.br/api/v1/localidades/regioes-metropolitanas"


def ler_json(url):
    pedido = urllib.request.Request(url, headers={"User-Agent": "ProjetoEscolarC4/1.0"})
    with urllib.request.urlopen(pedido, timeout=120) as resposta:
        conteudo = resposta.read()
        # algumas APIs do IBGE mandam a resposta compactada (gzip)
        if resposta.headers.get("Content-Encoding") == "gzip" or conteudo[:2] == b"\x1f\x8b":
            conteudo = gzip.decompress(conteudo)
        return json.loads(conteudo.decode("utf-8"))


def nome_oficial_rm(nome_sidra, regioes_metropolitanas):
    """
    O SIDRA chama a área de "São Paulo - SP". O nome oficial da região metropolitana
    vem da API de localidades do IBGE ("Região Metropolitana de São Paulo").
    """
    cidade, uf = nome_sidra.split(" - ")
    candidatas = [rm["nome"] for rm in regioes_metropolitanas
                  if rm["UF"]["sigla"] == uf
                  and rm["nome"].startswith("Região Metropolitana")
                  and rm["nome"].endswith(" " + cidade)]
    if len(candidatas) != 1:
        raise ValueError(f"Não achei um nome único para {nome_sidra}: {candidatas}")
    return candidatas[0]


def baixar():
    codigos = [INDICE_GERAL["codigo"]] + [i["codigo"] for a in ALIMENTOS for i in a["itens_ipca"]]
    url = ("https://apisidra.ibge.gov.br/values/t/7060/n1/all/n7/all/n6/all"
           f"/v/{VAR_MENSAL},{VAR_12_MESES}/p/{MES_INICIAL}-{MES_FINAL}"
           f"/c315/{','.join(str(c) for c in codigos)}/f/a/d/s")
    linhas = ler_json(url)
    return url, linhas[1:]  # a primeira linha é o cabeçalho


def main():
    url, linhas = baixar()

    # Lista dos meses, em ordem
    meses = sorted({l["D3C"] for l in linhas})
    meses_fmt = [m[:4] + "-" + m[4:] for m in meses]

    # Locais (Brasil, regiões metropolitanas e municípios)
    # "nome" é como aparece no SIDRA; "nome_exibicao" é o nome usado no app:
    #  - região metropolitana: nome oficial da API de localidades do IBGE
    #  - município e Brasil: o próprio nome do SIDRA
    regioes_metropolitanas = ler_json(URL_REGIOES_METROPOLITANAS)
    locais = {}
    for l in linhas:
        nome = l["D1N"]
        if nome not in locais:
            uf = nome.split(" - ")[-1] if " - " in nome else None
            if l["NN"].startswith("Região Metropolitana"):
                exibicao = nome_oficial_rm(nome, regioes_metropolitanas)
            else:
                exibicao = nome
            locais[nome] = {"id": l["D1C"], "nome": nome, "nome_exibicao": exibicao,
                            "nivel": l["NN"], "regiao": REGIAO_POR_UF.get(uf, "Brasil")}

    # Séries: series[codigo_item][id_local] = {"mensal": [...], "doze_meses": [...]}
    series = {}
    simbolos_encontrados = []
    for l in linhas:
        item, local, mes = l["D4C"], l["D1C"], l["D3C"]
        tipo = "mensal" if l["D2C"] == str(VAR_MENSAL) else "doze_meses"
        serie = series.setdefault(item, {}).setdefault(local, {"mensal": [None] * len(meses),
                                                               "doze_meses": [None] * len(meses)})
        valor = l["V"]
        try:
            numero = float(valor)  # o número exatamente como o IBGE publicou
        except ValueError:
            numero = None
            simbolos_encontrados.append({"item": l["D4N"], "local": l["D1N"], "mes": mes,
                                         "variavel": l["D2N"], "simbolo": valor,
                                         "significado": SIMBOLOS.get(valor, "símbolo desconhecido")})
        serie[tipo][meses.index(mes)] = numero

    ordem_regioes = ["Brasil", "Norte", "Nordeste", "Centro-Oeste", "Sudeste", "Sul"]
    lista_locais = sorted(locais.values(), key=lambda x: (ordem_regioes.index(x["regiao"]), x["nome"]))

    dados = {
        "fonte": "IBGE – Índice Nacional de Preços ao Consumidor Amplo (IPCA), Tabela 7060 do SIDRA",
        "link_tabela": "https://sidra.ibge.gov.br/tabela/7060",
        "consulta_api": url,
        "fonte_nomes_regioes_metropolitanas": URL_REGIOES_METROPOLITANAS,
        "baixado_em": date.today().isoformat(),
        "observacoes": [
            "Valores copiados exatamente como publicados pelo IBGE; nenhum número foi calculado ou estimado.",
            "O IPCA é pesquisado em regiões metropolitanas e alguns municípios, não em regiões inteiras do Brasil. "
            "Cada local foi agrupado na região do país a que pertence; não foi feita média por região.",
            "null indica que o IBGE publicou um símbolo no lugar do número (veja simbolos_encontrados).",
        ],
        "meses": meses_fmt,
        "locais": lista_locais,
        "indice_geral": INDICE_GERAL,
        "alimentos": ALIMENTOS,
        "fontes_observacoes": FONTES_OBSERVACOES,
        "series": series,
        "simbolos": SIMBOLOS,
        "simbolos_encontrados": simbolos_encontrados,
    }
    with open("data/ipca-alimentos.json", "w", encoding="utf-8") as f:
        json.dump(dados, f, ensure_ascii=False, indent=1)
    print(f"{len(linhas)} valores, {len(meses)} meses, {len(lista_locais)} locais, "
          f"{len(simbolos_encontrados)} símbolos no lugar de números")


if __name__ == "__main__":
    main()
