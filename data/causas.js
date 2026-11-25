window.DADOS_CAUSAS = {
 "descricao": "Dados da aba Causas. Cada número foi copiado de uma publicação oficial ou, quando marcado como calculo_da_equipe, calculado pelos alunos a partir de dados oficiais, com a fórmula registrada. Verificação completa no registro de pesquisa do projeto (IDs entre colchetes).",
 "fontes": {
  "ipea_out26": {
   "nome": "Ipea, Carta de Conjuntura nº 73, Nota 3, \"Inflação por faixa de renda: outubro de 2026\" (publicada em 19/11/2026)",
   "link": "https://www.ipea.gov.br/cartadeconjuntura/wp-content/uploads/2026/11/261119_cc_73_nota_3_ifr_out26.pdf"
  },
  "ipea_pesos": {
   "nome": "Ipea, Carta de Conjuntura nº 47, Nota Técnica \"Indicador Ipea de inflação por faixa de renda: atualização dos vetores de peso\", Tabela 3 (pesos da POF 2017/2018)",
   "link": "https://repositorio.ipea.gov.br/bitstream/11058/10152/15/CC_47_nt_indicador_ipea_de_infla%c3%a7%c3%a3o.pdf"
  },
  "ipea_metodo": {
   "nome": "Ipea, Carta de Conjuntura nº 37, Nota Técnica \"Indicador Ipea de Inflação por Faixa de Renda\"",
   "link": "https://repositorio.ipea.gov.br/bitstream/11058/8148/5/cc_37_nt_Infla%c3%a7%c3%a3o_por_faixa.pdf"
  },
  "ipea_dez23": {
   "nome": "Ipea, Carta de Conjuntura nº 62, Nota 3, \"Inflação por faixa de renda – Dezembro/2023\"",
   "link": "https://www.ipea.gov.br/cartadeconjuntura/wp-content/uploads/2024/01/240117_cc_62_nota_3.pdf"
  },
  "ipea_cambio": {
   "nome": "Ipea, Carta de Conjuntura nº 66, Nota 26 (04/04/2025)",
   "link": "https://www.ipea.gov.br/cartadeconjuntura/wp-content/uploads/2025/04/250404_cc_66_nota_26.pdf"
  },
  "ipea_nota23": {
   "nome": "Ipea, Carta de Conjuntura nº 66, Nota 23, \"Visão geral da conjuntura\"",
   "link": "https://repositorio.ipea.gov.br/bitstream/11058/17025/4/CC_n66_nota_23_visao_geral_conjuntura.pdf"
  },
  "bcb_rpm2603": {
   "nome": "Banco Central, Relatório de Política Monetária, março de 2026, boxe \"Repasse cambial: estimativas por projeções locais\"",
   "link": "https://www.bcb.gov.br/content/ri/relatorioinflacao/202603/rpm202603b8p.pdf"
  },
  "bcb_rpm2512": {
   "nome": "Banco Central, Relatório de Política Monetária, dezembro de 2025",
   "link": "https://www.bcb.gov.br/content/ri/relatorioinflacao/202512/rpm202512p.pdf"
  },
  "bcb_ri2312": {
   "nome": "Banco Central, Relatório de Inflação, dezembro de 2023",
   "link": "https://www.bcb.gov.br/content/ri/relatorioinflacao/202312/ri202312p.pdf"
  },
  "bcb_rpm2503": {
   "nome": "Banco Central, Relatório de Política Monetária, março de 2025, boxe \"Alta do preço do boi gordo e efeito nos preços ao consumidor\"",
   "link": "https://www.bcb.gov.br/content/ri/relatorioinflacao/202503/rpm202503b6p.pdf"
  },
  "bcb_sgs": {
   "nome": "Banco Central, série SGS 3698 (dólar, venda, média mensal)",
   "link": "https://api.bcb.gov.br/dados/serie/bcdata.sgs.3698/dados?formato=json&dataInicial=01/01/2023&dataFinal=31/10/2026"
  },
  "bm": {
   "nome": "Banco Mundial, Commodity Markets (\"Pink Sheet\"), dados mensais: café arábica (indicador OIC \"other mild Arabicas\")",
   "link": "https://thedocs.worldbank.org/en/doc/74e8be41ceb20fa0da750cda2f6b9e4e-0050012026/related/CMO-Historical-Data-Monthly.xlsx"
  },
  "usda": {
   "nome": "USDA FAS, \"Coffee: World Markets and Trade\" (jul/2026) e base PSD",
   "link": "https://apps.fas.usda.gov/psdonline/circulars/coffee.pdf"
  },
  "ibge_ipca": {
   "nome": "IBGE, IPCA, Tabela 7060 do SIDRA (Brasil, variação em 12 meses)",
   "link": "https://sidra.ibge.gov.br/tabela/7060"
  },
  "comex": {
   "nome": "Ministério do Desenvolvimento, Indústria, Comércio e Serviços, Comex Stat (exportações)",
   "link": "https://comexstat.mdic.gov.br/"
  },
  "conab_feijao": {
   "nome": "Conab, Acompanhamento da Safra Brasileira de Grãos, v. 14, nº 1 (out/2026), feijão, Tabela 9",
   "link": "https://www.gov.br/conab/pt-br/atuacao/informacoes-agropecuarias/safras/safra-de-graos"
  },
  "conab_arroz": {
   "nome": "Conab, Séries Históricas de Área Plantada, Produtividade e Produção: arroz total",
   "link": "https://www.gov.br/conab/pt-br/atuacao/informacoes-agropecuarias/safras/series-historicas/graos/arroz"
  },
  "conab_graos": {
   "nome": "Conab, Acompanhamento da Safra Brasileira de Grãos (12º levantamento 2025/26, set/2026; 1º levantamento 2026/27, out/2026) e Perspectivas para a Agropecuária v. 14 (set/2026)",
   "link": "https://www.gov.br/conab/pt-br/atuacao/informacoes-agropecuarias/safras/safra-de-graos"
  },
  "ibge_abate": {
   "nome": "IBGE, Pesquisa Trimestral do Abate de Animais, Tabela 1092 do SIDRA (bovinos por tipo de rebanho)",
   "link": "https://sidra.ibge.gov.br/tabela/1092"
  },
  "ibge_abate_caderno": {
   "nome": "IBGE, Estatística da Produção Pecuária, out.–dez. 2025",
   "link": "https://ftp.ibge.gov.br/Producao_Pecuaria/Fasciculo_Indicadores_IBGE/2025/abate-leite-couro-ovos_202504caderno.pdf"
  },
  "embrapa": {
   "nome": "Embrapa, Centro de Inteligência da Carne Bovina, Boletim CiCarne nº 63 (01/11/2023)",
   "link": "https://www.infoteca.cnptia.embrapa.br/infoteca/bitstream/doc/1159908/1/Boletim-CiCarne-63-2023.pdf"
  },
  "cnpe_3_23": {
   "nome": "CNPE, Resolução nº 3, de 20/03/2023",
   "link": "https://www.gov.br/mme/pt-br/assuntos/conselhos-e-comites/cnpe/resolucoes-do-cnpe/2023/ResoluoCNPEn32023.pdf"
  },
  "cnpe_8_23": {
   "nome": "CNPE, Resolução nº 8, de 19/12/2023",
   "link": "https://www.gov.br/mme/pt-br/assuntos/conselhos-e-comites/cnpe/resolucoes-do-cnpe/2023/ResoluoCNPEn82023.pdf"
  },
  "cnpe_6_25": {
   "nome": "CNPE, Resolução nº 6, de 19/02/2025",
   "link": "https://www.gov.br/mme/pt-br/assuntos/conselhos-e-comites/cnpe/resolucoes-do-cnpe/2025/ResoluoCNPEn62025.pdf"
  },
  "b15": {
   "nome": "Agência Gov, \"E30 e B15 entram em vigor em todo o Brasil\" (ago/2025), sobre a Resolução CNPE nº 8/2025",
   "link": "https://agenciagov.ebc.com.br/noticias/202508/e30-e-b15-entram-em-vigor-em-todo-o-brasil"
  },
  "lei_14993": {
   "nome": "Lei nº 14.993, de 8 de outubro de 2024 (\"Combustível do Futuro\")",
   "link": "https://www2.camara.leg.br/legin/fed/lei/2024/lei-14993-8-outubro-2024-796443-publicacaooriginal-173317-pl.html"
  },
  "epe": {
   "nome": "EPE, Análise de Conjuntura dos Biocombustíveis (anos-base 2023, 2024 e 2025), Tabela \"Complexo soja\"",
   "link": "https://www.epe.gov.br/pt/publicacoes-dados-abertos/publicacoes/analise-de-conjuntura-dos-biocombustiveis-2025"
  },
  "cepea_abiove": {
   "nome": "Cepea/Esalq, relatório \"PIB da cadeia da soja e do biodiesel\", 4º trimestre de 2024 (estudo financiado pela Abiove, associação das indústrias de óleo)",
   "link": "https://abiove.org.br/abiove_content/Abiove/Relatorio-Cadeia-da-Soja-e-biodiesel-4T2024.pdf"
  },
  "gt_biodiesel": {
   "nome": "Ministério de Minas e Energia, Grupo de Trabalho do biodiesel (GT 09/2023), relatório final do subcomitê 3",
   "link": "https://www.gov.br/mme/pt-br/assuntos/secretarias/petroleo-gas-natural-e-biocombustiveis/biodiesel/gt-09-2023-2/documentos-do-gt-09-2023/relatorio-final-sc3"
  }
 },
 "ancora": {
  "pesos": {
   "muito_baixa_pct": 25.8,
   "alta_pct": 12.3,
   "grupo": "Alimentação e bebidas",
   "referencia": "POF 2017/2018",
   "fonte": "ipea_pesos",
   "id": "C0-08"
  },
  "faixas": {
   "muito_baixa_limite_reais": 2299.82,
   "alta_limite_reais": 22998.22,
   "referencia": "R$ de janeiro de 2026, renda domiciliar mensal",
   "fonte": "ipea_out26",
   "id": "C0-07"
  },
  "meses": [
   {
    "mes": "2026-10",
    "alimentos_domicilio_pct": 1.31,
    "muito_baixa_pct": 0.26,
    "alta_pct": -0.07,
    "fonte": "ipea_out26",
    "id": "C0-06",
    "sentido": "sobe"
   },
   {
    "mes": "2023-07",
    "alimentos_domicilio_pct": -0.72,
    "muito_baixa_pct": -0.28,
    "alta_pct": 0.5,
    "fonte_nome": "Ipea, Carta de Conjuntura nº 60, Nota 14, \"Inflação por faixa de renda – Julho/2023\"",
    "fonte": "ipea_metodo",
    "id": "C0-13",
    "sentido": "cai"
   },
   {
    "mes": "2026-07",
    "alimentos_domicilio_pct": -1.14,
    "muito_baixa_pct": -0.05,
    "alta_pct": 0.32,
    "fonte_nome": "Ipea, Carta de Conjuntura nº 72, Nota 7, \"Inflação por faixa de renda: julho de 2026\"",
    "fonte": "ipea_metodo",
    "id": "C0-15",
    "sentido": "cai"
   },
   {
    "mes": "2025-09",
    "alimentos_domicilio_pct": -0.41,
    "muito_baixa_pct": 0.59,
    "alta_pct": 0.35,
    "fonte_nome": "Ipea, Carta de Conjuntura nº 69, Nota 3, \"Inflação por faixa de renda: setembro de 2025\"",
    "fonte": "ipea_metodo",
    "id": "C0-16",
    "sentido": "contraexemplo",
    "nota": "Os alimentos caíram, mas a conta de luz subiu 10,3% no mês, segundo o Ipea, e pesou mais para quem ganha menos."
   }
  ],
  "doze_meses_out26": {
   "muito_baixa_pct": 4.52,
   "alta_pct": 4.73,
   "fonte": "ipea_out26",
   "id": "C0-05"
  }
 },
 "cafe": {
  "fatia_mundial_texto": "quase 40%",
  "fonte_fatia": "usda",
  "id_fatia": "C1-12",
  "exportado_pct": [
   {
    "ano": "2023/24",
    "valor": 70.5
   },
   {
    "ano": "2024/25",
    "valor": 68.3
   },
   {
    "ano": "2025/26",
    "valor": 60.1
   }
  ],
  "exportado_calculo": {
   "formula": "exportação do Brasil ÷ produção do Brasil × 100, em sacas de 60 kg, por ano comercial do USDA",
   "fonte": "usda",
   "id": "C1-13",
   "nota": "2025/26 ainda é estimativa do USDA."
  },
  "serie_arabica_usd_kg": [
   [
    "2023-01",
    4.56
   ],
   [
    "2023-02",
    5.06
   ],
   [
    "2023-03",
    4.9
   ],
   [
    "2023-04",
    5.06
   ],
   [
    "2023-05",
    4.85
   ],
   [
    "2023-06",
    4.57
   ],
   [
    "2023-07",
    4.27
   ],
   [
    "2023-08",
    4.12
   ],
   [
    "2023-09",
    4.05
   ],
   [
    "2023-10",
    4.05
   ],
   [
    "2023-11",
    4.35
   ],
   [
    "2023-12",
    4.65
   ],
   [
    "2024-01",
    4.47
   ],
   [
    "2024-02",
    4.6
   ],
   [
    "2024-03",
    4.61
   ],
   [
    "2024-04",
    5.27
   ],
   [
    "2024-05",
    5.08
   ],
   [
    "2024-06",
    5.48
   ],
   [
    "2024-07",
    5.67
   ],
   [
    "2024-08",
    5.76
   ],
   [
    "2024-09",
    6.12
   ],
   [
    "2024-10",
    6.1
   ],
   [
    "2024-11",
    6.72
   ],
   [
    "2024-12",
    7.57
   ],
   [
    "2025-01",
    7.81
   ],
   [
    "2025-02",
    9.05
   ],
   [
    "2025-03",
    8.92
   ],
   [
    "2025-04",
    8.64
   ],
   [
    "2025-05",
    8.77
   ],
   [
    "2025-06",
    8.01
   ],
   [
    "2025-07",
    7.18
   ],
   [
    "2025-08",
    8.08
   ],
   [
    "2025-09",
    8.83
   ],
   [
    "2025-10",
    8.9
   ],
   [
    "2025-11",
    9.05
   ],
   [
    "2025-12",
    8.4
   ],
   [
    "2026-01",
    8.02
   ],
   [
    "2026-02",
    7.08
   ],
   [
    "2026-03",
    7.37
   ],
   [
    "2026-04",
    7.3
   ],
   [
    "2026-05",
    6.95
   ],
   [
    "2026-06",
    6.79
   ],
   [
    "2026-07",
    7.91
   ],
   [
    "2026-08",
    7.97
   ],
   [
    "2026-09",
    7.26
   ],
   [
    "2026-10",
    7.4
   ]
  ],
  "fonte_arabica": "bm",
  "serie_dolar": [
   [
    "2023-01",
    5.2007
   ],
   [
    "2023-02",
    5.1717
   ],
   [
    "2023-03",
    5.2115
   ],
   [
    "2023-04",
    5.0197
   ],
   [
    "2023-05",
    4.9828
   ],
   [
    "2023-06",
    4.8516
   ],
   [
    "2023-07",
    4.8008
   ],
   [
    "2023-08",
    4.9035
   ],
   [
    "2023-09",
    4.937
   ],
   [
    "2023-10",
    5.0648
   ],
   [
    "2023-11",
    4.8983
   ],
   [
    "2023-12",
    4.8972
   ],
   [
    "2024-01",
    4.9144
   ],
   [
    "2024-02",
    4.9644
   ],
   [
    "2024-03",
    4.9801
   ],
   [
    "2024-04",
    5.1291
   ],
   [
    "2024-05",
    5.133
   ],
   [
    "2024-06",
    5.389
   ],
   [
    "2024-07",
    5.542
   ],
   [
    "2024-08",
    5.5526
   ],
   [
    "2024-09",
    5.5416
   ],
   [
    "2024-10",
    5.6241
   ],
   [
    "2024-11",
    5.8071
   ],
   [
    "2024-12",
    6.097
   ],
   [
    "2025-01",
    6.0218
   ],
   [
    "2025-02",
    5.7656
   ],
   [
    "2025-03",
    5.7468
   ],
   [
    "2025-04",
    5.7837
   ],
   [
    "2025-05",
    5.6674
   ],
   [
    "2025-06",
    5.5471
   ],
   [
    "2025-07",
    5.5285
   ],
   [
    "2025-08",
    5.4469
   ],
   [
    "2025-09",
    5.3674
   ],
   [
    "2025-10",
    5.3855
   ],
   [
    "2025-11",
    5.3409
   ],
   [
    "2025-12",
    5.4531
   ],
   [
    "2026-01",
    5.338
   ],
   [
    "2026-02",
    5.2006
   ],
   [
    "2026-03",
    5.2316
   ],
   [
    "2026-04",
    5.0331
   ],
   [
    "2026-05",
    4.9837
   ],
   [
    "2026-06",
    5.1276
   ],
   [
    "2026-07",
    5.1139
   ],
   [
    "2026-08",
    5.1532
   ],
   [
    "2026-09",
    5.1447
   ],
   [
    "2026-10",
    5.1294
   ]
  ],
  "fonte_dolar": "bcb_sgs",
  "serie_ipca_cafe_12m": [
   [
    "2023-01",
    8.55
   ],
   [
    "2023-02",
    4.91
   ],
   [
    "2023-03",
    0.54
   ],
   [
    "2023-04",
    -2.5
   ],
   [
    "2023-05",
    -4.38
   ],
   [
    "2023-06",
    -4.56
   ],
   [
    "2023-07",
    -6.38
   ],
   [
    "2023-08",
    -7.32
   ],
   [
    "2023-09",
    -7.62
   ],
   [
    "2023-10",
    -8.96
   ],
   [
    "2023-11",
    -9.14
   ],
   [
    "2023-12",
    -9.07
   ],
   [
    "2024-01",
    -8.5
   ],
   [
    "2024-02",
    -7.45
   ],
   [
    "2024-03",
    -5.1
   ],
   [
    "2024-04",
    -1.58
   ],
   [
    "2024-05",
    2.5
   ],
   [
    "2024-06",
    5.59
   ],
   [
    "2024-07",
    10.79
   ],
   [
    "2024-08",
    16.64
   ],
   [
    "2024-09",
    22.66
   ],
   [
    "2024-10",
    29.16
   ],
   [
    "2024-11",
    32.66
   ],
   [
    "2024-12",
    39.6
   ],
   [
    "2025-01",
    50.35
   ],
   [
    "2025-02",
    66.18
   ],
   [
    "2025-03",
    77.78
   ],
   [
    "2025-04",
    80.2
   ],
   [
    "2025-05",
    82.24
   ],
   [
    "2025-06",
    77.88
   ],
   [
    "2025-07",
    70.51
   ],
   [
    "2025-08",
    60.85
   ],
   [
    "2025-09",
    54.55
   ],
   [
    "2025-10",
    48.13
   ],
   [
    "2025-11",
    42.79
   ],
   [
    "2025-12",
    35.65
   ],
   [
    "2026-01",
    23.47
   ],
   [
    "2026-02",
    10.13
   ],
   [
    "2026-03",
    0.54
   ],
   [
    "2026-04",
    -5.99
   ],
   [
    "2026-05",
    -12.25
   ],
   [
    "2026-06",
    -15.98
   ],
   [
    "2026-07",
    -17.2
   ],
   [
    "2026-08",
    -16.94
   ],
   [
    "2026-09",
    -17.8
   ],
   [
    "2026-10",
    -18.39
   ]
  ],
  "fonte_ipca": "ibge_ipca",
  "item_ipca": "Café moído",
  "ids": "C1-15, C1-16, C1-23"
 },
 "feijao": {
  "exportacao_mil_t": [
   {
    "ano": "2023",
    "valor": 53.2
   },
   {
    "ano": "2024",
    "valor": 160.4
   },
   {
    "ano": "2025",
    "valor": 163.5
   }
  ],
  "exportacao_nota": "Feijão comum (Phaseolus vulgaris), NCM 0713.33. A classificação não separa o carioca. Somas anuais dos dados mensais: cálculo da equipe.",
  "fonte_exportacao": "comex",
  "id_exportacao": "C1-26",
  "ipca_carioca_12m": [
   {
    "mes": "2024-12",
    "valor": -8.57
   },
   {
    "mes": "2025-12",
    "valor": -4.21
   },
   {
    "mes": "2026-09",
    "valor": 39.11
   }
  ],
  "fonte_ipca": "ibge_ipca",
  "id_ipca": "C1-27",
  "conab_exportacao_mil_t": 533.2,
  "conab_consumo_mil_t": 2700,
  "conab_safra": "2024/25",
  "fonte_conab": "conab_feijao",
  "id_conab": "C1-28"
 },
 "arroz": {
  "safras": [
   {
    "safra": "2018/19",
    "area_mil_ha": 1702.5,
    "producao_mil_t": 10483.6,
    "estimativa": false
   },
   {
    "safra": "2019/20",
    "area_mil_ha": 1665.8,
    "producao_mil_t": 11183.4,
    "estimativa": false
   },
   {
    "safra": "2020/21",
    "area_mil_ha": 1679.2,
    "producao_mil_t": 11766.4,
    "estimativa": false
   },
   {
    "safra": "2021/22",
    "area_mil_ha": 1617.3,
    "producao_mil_t": 10780.5,
    "estimativa": false
   },
   {
    "safra": "2022/23",
    "area_mil_ha": 1479.6,
    "producao_mil_t": 10031.8,
    "estimativa": false
   },
   {
    "safra": "2023/24",
    "area_mil_ha": 1606.6,
    "producao_mil_t": 10577.0,
    "estimativa": false
   },
   {
    "safra": "2024/25",
    "area_mil_ha": 1763.9,
    "producao_mil_t": 12757.7,
    "estimativa": false
   },
   {
    "safra": "2025/26",
    "area_mil_ha": 1516.7,
    "producao_mil_t": 11076.2,
    "estimativa": false
   },
   {
    "safra": "2026/27",
    "area_mil_ha": 1504.5,
    "producao_mil_t": 10552.4,
    "estimativa": true
   }
  ],
  "nota_estimativa": "2026/27: estimativa da Conab (2º levantamento, nov/2026), safra ainda em plantio.",
  "fonte_safras": "conab_arroz",
  "id_safras": "C3-01, C3-08",
  "serie_ipca_arroz_12m": [
   [
    "2022-01",
    -19.28
   ],
   [
    "2022-02",
    -17.92
   ],
   [
    "2022-03",
    -13.88
   ],
   [
    "2022-04",
    -11.53
   ],
   [
    "2022-05",
    -10.27
   ],
   [
    "2022-06",
    -10.0
   ],
   [
    "2022-07",
    -7.93
   ],
   [
    "2022-08",
    -6.36
   ],
   [
    "2022-09",
    -6.05
   ],
   [
    "2022-10",
    -4.66
   ],
   [
    "2022-11",
    0.32
   ],
   [
    "2022-12",
    5.98
   ],
   [
    "2023-01",
    12.29
   ],
   [
    "2023-02",
    14.27
   ],
   [
    "2023-03",
    12.28
   ],
   [
    "2023-04",
    10.24
   ],
   [
    "2023-05",
    10.41
   ],
   [
    "2023-06",
    10.81
   ],
   [
    "2023-07",
    10.11
   ],
   [
    "2023-08",
    11.84
   ],
   [
    "2023-09",
    16.16
   ],
   [
    "2023-10",
    19.59
   ],
   [
    "2023-11",
    22.14
   ],
   [
    "2023-12",
    24.54
   ],
   [
    "2024-01",
    28.47
   ],
   [
    "2024-02",
    30.72
   ],
   [
    "2024-03",
    28.39
   ],
   [
    "2024-04",
    25.46
   ],
   [
    "2024-05",
    26.76
   ],
   [
    "2024-06",
    30.13
   ],
   [
    "2024-07",
    30.44
   ],
   [
    "2024-08",
    27.74
   ],
   [
    "2024-09",
    23.93
   ],
   [
    "2024-10",
    20.3
   ],
   [
    "2024-11",
    15.87
   ],
   [
    "2024-12",
    8.24
   ],
   [
    "2025-01",
    1.19
   ],
   [
    "2025-02",
    -3.99
   ],
   [
    "2025-03",
    -4.87
   ],
   [
    "2025-04",
    -7.06
   ],
   [
    "2025-05",
    -12.07
   ],
   [
    "2025-06",
    -16.77
   ],
   [
    "2025-07",
    -18.77
   ],
   [
    "2025-08",
    -20.13
   ],
   [
    "2025-09",
    -21.93
   ],
   [
    "2025-10",
    -23.86
   ],
   [
    "2025-11",
    -25.9
   ],
   [
    "2025-12",
    -26.56
   ],
   [
    "2026-01",
    -27.3
   ],
   [
    "2026-02",
    -27.86
   ],
   [
    "2026-03",
    -26.75
   ],
   [
    "2026-04",
    -21.61
   ],
   [
    "2026-05",
    -16.92
   ],
   [
    "2026-06",
    -14.57
   ],
   [
    "2026-07",
    -12.41
   ],
   [
    "2026-08",
    -8.85
   ],
   [
    "2026-09",
    -2.61
   ],
   [
    "2026-10",
    4.68
   ]
  ],
  "fonte_ipca": "ibge_ipca",
  "id_ipca": "C3-13",
  "ipca_2025_pct": -26.56,
  "producao_2025_26_pct": -13.2,
  "fonte_producao": "conab_graos",
  "id_producao": "C3-02"
 },
 "boi": {
  "femeas_pct": [
   [
    "1997-T1",
    37.49
   ],
   [
    "1997-T2",
    33.85
   ],
   [
    "1997-T3",
    30.95
   ],
   [
    "1997-T4",
    31.15
   ],
   [
    "1998-T1",
    34.08
   ],
   [
    "1998-T2",
    30.36
   ],
   [
    "1998-T3",
    26.17
   ],
   [
    "1998-T4",
    28.25
   ],
   [
    "1999-T1",
    32.76
   ],
   [
    "1999-T2",
    31.89
   ],
   [
    "1999-T3",
    29.62
   ],
   [
    "1999-T4",
    32.52
   ],
   [
    "2000-T1",
    35.63
   ],
   [
    "2000-T2",
    33.26
   ],
   [
    "2000-T3",
    28.48
   ],
   [
    "2000-T4",
    28.87
   ],
   [
    "2001-T1",
    31.94
   ],
   [
    "2001-T2",
    28.88
   ],
   [
    "2001-T3",
    24.69
   ],
   [
    "2001-T4",
    27.14
   ],
   [
    "2002-T1",
    29.38
   ],
   [
    "2002-T2",
    27.23
   ],
   [
    "2002-T3",
    27.06
   ],
   [
    "2002-T4",
    29.93
   ],
   [
    "2003-T1",
    36.27
   ],
   [
    "2003-T2",
    36.89
   ],
   [
    "2003-T3",
    35.68
   ],
   [
    "2003-T4",
    34.25
   ],
   [
    "2004-T1",
    41.36
   ],
   [
    "2004-T2",
    41.36
   ],
   [
    "2004-T3",
    40.99
   ],
   [
    "2004-T4",
    37.84
   ],
   [
    "2005-T1",
    45.8
   ],
   [
    "2005-T2",
    44.91
   ],
   [
    "2005-T3",
    41.2
   ],
   [
    "2005-T4",
    41.53
   ],
   [
    "2006-T1",
    47.12
   ],
   [
    "2006-T2",
    45.84
   ],
   [
    "2006-T3",
    41.05
   ],
   [
    "2006-T4",
    39.86
   ],
   [
    "2007-T1",
    45.03
   ],
   [
    "2007-T2",
    43.63
   ],
   [
    "2007-T3",
    36.55
   ],
   [
    "2007-T4",
    35.64
   ],
   [
    "2008-T1",
    45.58
   ],
   [
    "2008-T2",
    41.59
   ],
   [
    "2008-T3",
    34.58
   ],
   [
    "2008-T4",
    33.81
   ],
   [
    "2009-T1",
    41.67
   ],
   [
    "2009-T2",
    39.66
   ],
   [
    "2009-T3",
    34.73
   ],
   [
    "2009-T4",
    34.07
   ],
   [
    "2010-T1",
    38.98
   ],
   [
    "2010-T2",
    36.38
   ],
   [
    "2010-T3",
    33.28
   ],
   [
    "2010-T4",
    35.86
   ],
   [
    "2011-T1",
    43.4
   ],
   [
    "2011-T2",
    43.11
   ],
   [
    "2011-T3",
    37.57
   ],
   [
    "2011-T4",
    36.82
   ],
   [
    "2012-T1",
    45.48
   ],
   [
    "2012-T2",
    44.23
   ],
   [
    "2012-T3",
    40.31
   ],
   [
    "2012-T4",
    38.31
   ],
   [
    "2013-T1",
    47.03
   ],
   [
    "2013-T2",
    45.49
   ],
   [
    "2013-T3",
    39.35
   ],
   [
    "2013-T4",
    36.84
   ],
   [
    "2014-T1",
    46.95
   ],
   [
    "2014-T2",
    44.29
   ],
   [
    "2014-T3",
    38.73
   ],
   [
    "2014-T4",
    37.29
   ],
   [
    "2015-T1",
    44.03
   ],
   [
    "2015-T2",
    41.91
   ],
   [
    "2015-T3",
    36.42
   ],
   [
    "2015-T4",
    33.31
   ],
   [
    "2016-T1",
    40.59
   ],
   [
    "2016-T2",
    40.74
   ],
   [
    "2016-T3",
    36.64
   ],
   [
    "2016-T4",
    36.28
   ],
   [
    "2017-T1",
    45.1
   ],
   [
    "2017-T2",
    42.66
   ],
   [
    "2017-T3",
    38.15
   ],
   [
    "2017-T4",
    36.72
   ],
   [
    "2018-T1",
    46.72
   ],
   [
    "2018-T2",
    44.35
   ],
   [
    "2018-T3",
    38.78
   ],
   [
    "2018-T4",
    37.1
   ],
   [
    "2019-T1",
    46.55
   ],
   [
    "2019-T2",
    44.14
   ],
   [
    "2019-T3",
    37.29
   ],
   [
    "2019-T4",
    35.46
   ],
   [
    "2020-T1",
    42.68
   ],
   [
    "2020-T2",
    39.61
   ],
   [
    "2020-T3",
    34.04
   ],
   [
    "2020-T4",
    29.79
   ],
   [
    "2021-T1",
    36.8
   ],
   [
    "2021-T2",
    36.49
   ],
   [
    "2021-T3",
    32.87
   ],
   [
    "2021-T4",
    28.81
   ],
   [
    "2022-T1",
    39.49
   ],
   [
    "2022-T2",
    39.75
   ],
   [
    "2022-T3",
    35.21
   ],
   [
    "2022-T4",
    35.33
   ],
   [
    "2023-T1",
    44.9
   ],
   [
    "2023-T2",
    44.01
   ],
   [
    "2023-T3",
    39.23
   ],
   [
    "2023-T4",
    39.18
   ],
   [
    "2024-T1",
    46.21
   ],
   [
    "2024-T2",
    45.09
   ],
   [
    "2024-T3",
    40.55
   ],
   [
    "2024-T4",
    39.84
   ],
   [
    "2025-T1",
    49.42
   ],
   [
    "2025-T2",
    50.62
   ],
   [
    "2025-T3",
    46.01
   ],
   [
    "2025-T4",
    41.8
   ],
   [
    "2026-T1",
    49.99
   ],
   [
    "2026-T2",
    49.04
   ]
  ],
  "femeas_calculo": {
   "formula": "(vacas + novilhas) ÷ total de bovinos abatidos × 100, por trimestre",
   "fonte": "ibge_abate",
   "id": "C4-01, C4-02",
   "nota": "Dados de 2025 e 2026 ainda podem ser revisados pelo IBGE."
  },
  "femeas_2025_ibge_pct": 46.8,
  "fonte_2025": "ibge_abate_caderno",
  "id_2025": "C4-01",
  "ciclo_anos": "5–6 anos",
  "fonte_ciclo": "embrapa",
  "id_ciclo": "C4-12",
  "fem_2tri26_pct": -1.9,
  "vacas_2tri26_pct": -5.0,
  "id_2tri26": "C4-06"
 },
 "biodiesel": {
  "misturas": [
   {
    "inicio": "2023-04",
    "pct": 12,
    "texto": "B12 a partir de 1º/04/2023",
    "fonte": "cnpe_3_23",
    "id": "C2-01"
   },
   {
    "inicio": "2024-03",
    "pct": 14,
    "texto": "B14 a partir de 1º/03/2024 (o B13 nunca vigorou)",
    "fonte": "cnpe_8_23",
    "id": "C2-02"
   },
   {
    "inicio": "2025-03",
    "pct": 14,
    "texto": "B15 previsto em lei para 1º/03/2025 foi suspenso; a mistura ficou em 14%",
    "fonte": "cnpe_6_25",
    "id": "C2-04"
   },
   {
    "inicio": "2025-08",
    "pct": 15,
    "texto": "B15 a partir de 1º/08/2025 (Resolução CNPE nº 8/2025); em 2026 a mistura continua em 15%",
    "fonte": "b15",
    "id": "C2-06, C2-07"
   }
  ],
  "antes": "Até mar/2023 a mistura era de 10% (B10).",
  "epe": [
   {
    "ano": "2022",
    "producao_mt": 9.9,
    "biodiesel_mt": 3.9,
    "biodiesel_pct": 39.4
   },
   {
    "ano": "2023",
    "producao_mt": 10.8,
    "biodiesel_mt": 4.8,
    "biodiesel_pct": 44.4
   },
   {
    "ano": "2024",
    "producao_mt": 11.3,
    "biodiesel_mt": 6.6,
    "biodiesel_pct": 58.4
   },
   {
    "ano": "2025",
    "producao_mt": 11.9,
    "biodiesel_mt": 6.7,
    "biodiesel_pct": 56.3
   }
  ],
  "epe_calculo": {
   "formula": "óleo de soja usado no biodiesel ÷ óleo de soja produzido no Brasil × 100 (milhões de toneladas)",
   "fonte": "epe",
   "id": "C2-09"
  },
  "ipca_oleo_12m": [
   {
    "mes": "2022-04",
    "valor": 31.53,
    "mistura": "B10"
   },
   {
    "mes": "2023-07",
    "valor": -36.93,
    "mistura": "B12"
   },
   {
    "mes": "2024-03",
    "valor": -23.71,
    "mistura": "entrada do B14"
   },
   {
    "mes": "2024-12",
    "valor": 29.21,
    "mistura": "B14"
   },
   {
    "mes": "2026-09",
    "valor": -1.86,
    "mistura": "B15"
   }
  ],
  "fonte_ipca": "ibge_ipca",
  "id_ipca": "C2-16"
 }
};
