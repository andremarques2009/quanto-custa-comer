/*
  causas.js — aba "Causas": os mecanismos por trás do preço dos alimentos.

  A aba tem quatro partes:
    1. Por que pesa mais (o peso da comida no orçamento de cada faixa de renda)
    2. Café, dólar e exportação (protagonista), com o feijão como contraexemplo
    3. Arroz × boi (dois ciclos de produção que funcionam ao contrário)
    4. Biodiesel e óleo de soja (caso complementar, com ressalvas)

  Regras seguidas aqui:
  - As SIMULAÇÕES não têm nenhum número: só mostram a direção (sobe, cai).
    Elas ficam em caixas tracejadas com o aviso "Simulação: não é previsão".
  - Os DADOS REAIS vêm do arquivo data/causas.json, com fonte e mês.
  - Números calculados pelos alunos aparecem com o selo "Cálculo da equipe"
    e com a conta explicada.

  Tudo fica dentro de uma função (IIFE) para os nomes daqui não se misturarem
  com os das outras abas. Só a função iniciarCausas fica visível para o app.js.
*/
(function () {
  const C = window.DADOS_CAUSAS;
  const F = C.fontes;
  let iniciada = false;

  // ---------- pequenas ajudas ----------

  // número com casas decimais fixas, no formato brasileiro: 4.9144 -> "4,9144"
  function num(valor, casas) {
    return valor.toLocaleString('pt-BR', { minimumFractionDigits: casas, maximumFractionDigits: casas });
  }
  // "2024-T1" -> "1º tri 2024"
  function trimestre(t) {
    const [ano, tri] = t.split('-T');
    return tri + 'º tri ' + ano;
  }
  // texto de fonte com link, a partir do código da fonte (ex.: "bcb_sgs")
  function fonteLink(codigo) {
    const f = F[codigo];
    return '<a href="' + f.link + '" target="_blank" rel="noopener">' + f.nome + '</a>';
  }
  function el(id) { return document.getElementById(id); }

  // Gráfico de linha simples (um dado real por gráfico, nunca dois eixos)
  function graficoLinha(idCanvas, rotulos, valores, opcoes) {
    return new Chart(el(idCanvas), {
      type: 'line',
      data: {
        labels: rotulos,
        datasets: [{
          label: opcoes.rotulo,
          data: valores,
          borderColor: opcoes.cor || COR_TEXTO,
          backgroundColor: opcoes.cor || COR_TEXTO,
          borderWidth: 2.5,
          pointRadius: 0,
          pointHitRadius: 8,
          tension: 0.15
        }]
      },
      options: {
        interaction: { mode: 'index', intersect: false },
        plugins: {
          legend: { display: false },
          tooltip: { callbacks: { label: c => opcoes.rotulo + ': ' + opcoes.formato(c.parsed.y) } }
        },
        scales: {
          x: { ticks: { maxTicksLimit: 8, autoSkip: true }, grid: { display: false } },
          y: { ticks: { callback: v => opcoes.formato(v) }, grid: { color: COR_GRADE } }
        }
      }
    });
  }

  // ===================================================================
  // 1. POR QUE PESA MAIS (âncora)
  // ===================================================================
  function montarAncora() {
    const A = C.ancora;
    el('ancora-faixas').innerHTML =
      'O Ipea calcula a inflação de seis faixas de renda: os preços são os do IPCA, e o peso de cada produto muda conforme a faixa. ' +
      '<strong>Renda muito baixa</strong>: renda domiciliar abaixo de ' + reais(A.faixas.muito_baixa_limite_reais) +
      ' por mês; <strong>renda alta</strong>: acima de ' + reais(A.faixas.alta_limite_reais) + ' (' + A.faixas.referencia + ').';

    // Barras de orçamento: a largura da parte destacada é o peso publicado pelo Ipea
    const barras = [
      { nome: 'Renda muito baixa', pct: A.pesos.muito_baixa_pct },
      { nome: 'Renda alta', pct: A.pesos.alta_pct }
    ];
    el('ancora-orcamentos').innerHTML = barras.map(b =>
      '<div class="orcamento">' +
        '<p class="orcamento-nome">' + b.nome + '</p>' +
        '<div class="orcamento-barra" role="img" aria-label="' + b.nome + ': alimentação e bebidas são ' + porcento(b.pct).replace(',00', '') + ' do orçamento">' +
          '<span class="orcamento-comida" style="width:' + b.pct + '%"></span>' +
        '</div>' +
        '<p class="orcamento-valor"><strong>' + num(b.pct, 1) + '%</strong> do orçamento vai para alimentação e bebidas</p>' +
      '</div>'
    ).join('');
    el('ancora-fonte-pesos').innerHTML = 'Fonte: ' + fonteLink(A.pesos.fonte) + '. Pesos do grupo "' + A.pesos.grupo +
      '" (inclui comer fora de casa), da ' + A.pesos.referencia + '. A parte destacada, à esquerda de cada barra, tem o tamanho do peso.';

    // Meses reais, para comparar as duas faixas
    const pilulas = el('ancora-meses');
    A.meses.forEach((m, i) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'pilula' + (i === 0 ? ' ativa' : '');
      b.textContent = mesCurto(m.mes) + (m.sentido === 'sobe' ? ' · comida subiu' : m.sentido === 'cai' ? ' · comida caiu' : ' · exceção');
      b.setAttribute('aria-pressed', i === 0 ? 'true' : 'false');
      b.addEventListener('click', () => {
        pilulas.querySelectorAll('.pilula').forEach(p => { p.classList.remove('ativa'); p.setAttribute('aria-pressed', 'false'); });
        b.classList.add('ativa');
        b.setAttribute('aria-pressed', 'true');
        mostrarMes(m);
      });
      pilulas.appendChild(b);
    });
    mostrarMes(A.meses[0]);

    const d = A.doze_meses_out26;
    el('ancora-atencao').innerHTML =
      '<li><strong>Pesa mais para cima e para baixo.</strong> Quem ganha menos sente mais a alta da comida, e também o alívio quando ela cai. ' +
      'Por isso nem sempre tem a inflação maior: em 12 meses até outubro de 2026, a renda muito baixa teve ' + porcento(d.muito_baixa_pct) +
      ' e a renda alta, ' + porcento(d.alta_pct) + ' (' + fonteLink(d.fonte) + ').</li>' +
      '<li><strong>Classes C e D.</strong> Nenhuma fonte oficial encontrada liga as faixas do Ipea às classes C e D. Por isso a aba fala em "renda muito baixa", com o limite em reais.</li>';
  }

  function mostrarMes(m) {
    const linhas = [
      ['Alimentação no domicílio (preço, IPCA)', m.alimentos_domicilio_pct],
      ['Inflação da renda muito baixa', m.muito_baixa_pct],
      ['Inflação da renda alta', m.alta_pct]
    ];
    const maxAbs = Math.max(...linhas.map(l => Math.abs(l[1])));
    el('ancora-mes').innerHTML =
      '<p class="mes-titulo">' + maiuscula(mesLongo(m.mes)) + ', variação no mês</p>' +
      linhas.map((l, i) =>
        '<div class="barra-sinal">' +
          '<span class="barra-sinal-nome">' + l[0] + '</span>' +
          '<span class="barra-sinal-trilho">' +
            '<span class="barra-sinal-valor ' + (l[1] < 0 ? 'negativo' : 'positivo') + (i === 0 ? ' referencia' : '') + '" style="width:' + (Math.abs(l[1]) / maxAbs * 50) + '%"></span>' +
          '</span>' +
          '<strong class="barra-sinal-numero">' + porcentoComSinal(l[1]) + '</strong>' +
        '</div>'
      ).join('') +
      '<p class="fonte">Barras para a direita: alta; para a esquerda: queda. Fonte: ' +
      (m.fonte_nome ? m.fonte_nome : fonteLink(m.fonte)) + '.</p>' +
      (m.nota ? '<p class="nota-curta">' + m.nota + '</p>' : '');
  }

  // ===================================================================
  // 2. CAFÉ, DÓLAR E EXPORTAÇÃO
  // ===================================================================
  const ESTADOS = { cai: -1, igual: 0, sobe: 1 };
  const simCafe = { fora: 'sobe', dolar: 'igual' };

  function montarSimulacaoCafe() {
    [['sim-cafe-fora', 'fora'], ['sim-cafe-dolar', 'dolar']].forEach(([id, chave]) => {
      const grupo = el(id);
      ['cai', 'igual', 'sobe'].forEach(estado => {
        const b = document.createElement('button');
        b.type = 'button';
        b.className = 'pilula';
        b.textContent = estado === 'igual' ? 'fica igual' : estado;
        b.dataset.estado = estado;
        b.addEventListener('click', () => { simCafe[chave] = estado; desenharSimulacaoCafe(); });
        grupo.appendChild(b);
      });
    });
    desenharSimulacaoCafe();
  }

  // Uma "régua" sem números: 5 posições, do "paga menos" ao "paga mais"
  function regua(posicao) {
    let html = '<span class="regua" aria-hidden="true">';
    for (let i = -2; i <= 2; i++) html += '<span class="regua-casa' + (i === posicao ? ' marcada' : '') + '"></span>';
    return html + '</span>';
  }

  function desenharSimulacaoCafe() {
    // marca os botões escolhidos
    [['sim-cafe-fora', 'fora'], ['sim-cafe-dolar', 'dolar']].forEach(([id, chave]) => {
      el(id).querySelectorAll('.pilula').forEach(b => {
        const ativo = b.dataset.estado === simCafe[chave];
        b.classList.toggle('ativa', ativo);
        b.setAttribute('aria-pressed', ativo ? 'true' : 'false');
      });
    });
    const f = ESTADOS[simCafe.fora];
    const d = ESTADOS[simCafe.dolar];
    const total = f + d; // de -2 a 2: só serve para posicionar a régua, não é um preço
    const opostos = f !== 0 && d !== 0 && f !== d;

    let exportar, prateleira, frase;
    if (opostos) {
      exportar = 'depende de qual força é maior';
      prateleira = 'muda pouco ou depende';
      frase = 'As duas forças puxam para lados opostos e se anulam em parte. Algo assim aconteceu no 2º semestre de 2025: o arábica subiu lá fora, mas o dólar caiu, e o preço do café no Brasil caiu (leitura da equipe).';
    } else if (total > 0) {
      exportar = 'mais reais';
      prateleira = 'tende a subir';
      frase = 'Vender para fora rende mais reais. Para não perder o café, a torrefação no Brasil precisa pagar perto disso, e o preço na prateleira tende a subir. Produzir muito não protege o consumidor quando o produto pode ser exportado.';
    } else if (total < 0) {
      exportar = 'menos reais';
      prateleira = 'tende a cair';
      frase = 'Vender para fora rende menos reais. O produtor aceita vender mais barato aqui, e o preço na prateleira tende a cair. O mecanismo funciona nos dois sentidos.';
    } else {
      exportar = 'o mesmo';
      prateleira = 'não muda por este motivo';
      frase = 'Nada mudou lá fora nem no dólar: por este caminho, não há pressão sobre o preço.';
    }
    el('sim-cafe-cadeia').innerHTML =
      '<div class="elo"><span class="elo-titulo">Preço do café lá fora (em dólar)</span><span class="elo-estado">' + simCafe.fora.replace('igual', 'fica igual') + '</span></div>' +
      '<div class="elo-mais" aria-hidden="true">+</div>' +
      '<div class="elo"><span class="elo-titulo">Dólar</span><span class="elo-estado">' + simCafe.dolar.replace('igual', 'fica igual') + '</span></div>' +
      '<div class="elo-seta" aria-hidden="true">→</div>' +
      '<div class="elo"><span class="elo-titulo">Uma saca vendida para fora rende</span><span class="elo-estado">' + exportar + '</span>' + (opostos ? '' : regua(total)) + '</div>' +
      '<div class="elo-seta" aria-hidden="true">→</div>' +
      '<div class="elo"><span class="elo-titulo">Preço do café no supermercado</span><span class="elo-estado">' + prateleira + '</span></div>';
    el('sim-cafe-frase').textContent = frase;
  }

  function montarCafe() {
    const K = C.cafe;
    el('cafe-escala').innerHTML =
      'Segundo o USDA (Departamento de Agricultura dos Estados Unidos), o Brasil produz <strong>' + K.fatia_mundial_texto +
      '</strong> do café do mundo. Mesmo assim, o preço do café moído no Brasil chegou a subir <strong>' +
      porcento(Math.max(...K.serie_ipca_cafe_12m.map(p => p[1]))) + '</strong> em 12 meses (IPCA, ' +
      mesLongo(K.serie_ipca_cafe_12m.reduce((a, b) => (b[1] > a[1] ? b : a))[0]) + '). Como isso é possível?';

    // Quanto do café vai para fora (cálculo da equipe)
    el('cafe-exportado').innerHTML = K.exportado_pct.map(e =>
      '<div class="saca">' +
        '<div class="saca-barra" role="img" aria-label="' + e.ano + ': ' + num(e.valor, 1) + '% exportado">' +
          '<span class="saca-exportada" style="width:' + e.valor + '%"></span>' +
        '</div>' +
        '<p><strong>' + e.ano + '</strong>: ' + num(e.valor, 1) + '% da produção foi exportada</p>' +
      '</div>'
    ).join('');
    el('cafe-exportado-conta').innerHTML =
      '<strong>Conta:</strong> ' + K.exportado_calculo.formula + '. <strong>Fonte dos dados:</strong> ' + fonteLink(K.exportado_calculo.fonte) +
      '. ' + K.exportado_calculo.nota;

    const rot = s => s.map(p => mesCurto(p[0]));
    graficoLinha('graf-cafe-arabica', rot(K.serie_arabica_usd_kg), K.serie_arabica_usd_kg.map(p => p[1]),
      { rotulo: 'Arábica', formato: v => 'US$ ' + num(v, 2) });
    graficoLinha('graf-cafe-dolar', rot(K.serie_dolar), K.serie_dolar.map(p => p[1]),
      { rotulo: 'Dólar', formato: v => 'R$ ' + num(v, 2) });
    graficoLinha('graf-cafe-ipca', rot(K.serie_ipca_cafe_12m), K.serie_ipca_cafe_12m.map(p => p[1]),
      { rotulo: 'Café moído, 12 meses', formato: v => porcento(v), cor: COR_DESTAQUE });

    const ini = K.serie_arabica_usd_kg[0][0], fim = K.serie_arabica_usd_kg[K.serie_arabica_usd_kg.length - 1][0];
    el('cafe-fontes-graf').innerHTML =
      'De ' + mesLongo(ini) + ' a ' + mesLongo(fim) + '. Fontes: ' + fonteLink(K.fonte_arabica) + '; ' + fonteLink(K.fonte_dolar) +
      '; ' + fonteLink(K.fonte_ipca) + ', item "' + K.item_ipca + '". Os gráficos medem coisas diferentes: compare só a direção e a época.';

    // Feijão: o contraexemplo
    const B = C.feijao;
    el('feijao-texto').innerHTML =
      'A exportação de feijão comum foi de ' + B.exportacao_mil_t.map(e => numero(e.valor) + ' mil toneladas em ' + e.ano).join(', ') +
      ' (' + fonteLink(B.fonte_exportacao) + '). Mesmo assim, o preço do feijão carioca no IPCA <strong>caiu</strong> em 12 meses em ' +
      B.ipca_carioca_12m.slice(0, 2).map(p => mesCurto(p.mes) + ' (' + porcentoComSinal(p.valor) + ')').join(' e ') +
      '. Os números da Conab ajudam a entender: na safra ' + B.conab_safra + ', a exportação de feijão foi de ' + numero(B.conab_exportacao_mil_t) +
      ' mil toneladas, contra ' + numero(B.conab_consumo_mil_t) + ' mil consumidas no Brasil (' + fonteLink(B.fonte_conab) +
      '). O feijão fica quase todo aqui (leitura da equipe; a Conab não liga a exportação ao preço). ' +
      'Em ' + mesLongo(B.ipca_carioca_12m[2].mes) + ', o carioca subia ' + porcentoComSinal(B.ipca_carioca_12m[2].valor) +
      ' em 12 meses, por motivos que esta pesquisa não investigou.';
    el('feijao-nota').textContent = B.exportacao_nota;
  }

  // ===================================================================
  // 3. ARROZ × BOI: os dois ciclos
  // ===================================================================
  const CICLO_ARROZ = [
    'O preço do arroz está alto na hora de plantar.',
    'Os produtores plantam uma área maior.',
    'Na safra seguinte, a colheita é grande: tem mais arroz à venda.',
    'Com arroz sobrando, o preço cai.',
    'Com o preço baixo, os produtores plantam uma área menor.',
    'Na safra seguinte, a colheita é menor, e o preço volta a subir.'
  ];
  const CICLO_BOI = [
    'O preço do boi sobe.',
    'Os pecuaristas seguram as vacas e as novilhas para terem bezerros, em vez de vendê-las para o abate.',
    'Menos animais vão para o abate: sai menos carne agora, e o preço sobe mais.',
    'Anos depois, os bezerros crescem e viram bois: a oferta de carne aumenta.',
    'Com mais carne, o preço cai.',
    'Com o preço baixo, os pecuaristas vendem as fêmeas: sai mais carne agora, mas nascem menos bezerros para depois.'
  ];
  // o que acontece com a quantidade de comida à venda em cada etapa (para o contraste)
  const OFERTA_ARROZ = ['—', 'ainda igual (o arroz está crescendo)', 'aumenta', 'aumenta', 'ainda igual', 'diminui'];
  const OFERTA_BOI = ['—', 'diminui', 'diminui', 'aumenta', 'aumenta', 'aumenta agora'];
  let etapa = 0;

  function desenharCiclos() {
    const lista = (etapas, oferta) => etapas.map((t, i) =>
      '<li class="' + (i === etapa ? 'atual' : '') + '"' + (i === etapa ? ' aria-current="step"' : '') + '>' +
        '<span class="passo-numero">' + (i + 1) + '</span><span>' + t +
        (i === etapa && i > 0 ? '<br><small>Comida à venda agora: <strong>' + oferta[i] + '</strong></small>' : '') + '</span></li>'
    ).join('');
    el('ciclo-arroz').innerHTML = lista(CICLO_ARROZ, OFERTA_ARROZ);
    el('ciclo-boi').innerHTML = lista(CICLO_BOI, OFERTA_BOI);
    const frases = [
      'Comece pelo mesmo ponto: o preço subiu. Avance as etapas e compare as duas colunas.',
      'Mesma notícia, decisões diferentes: o rizicultor decide quanto plantar; o pecuarista decide o que fazer com a vaca.',
      'Aqui está o contraste: com o preço alto, o arroz à venda aumenta na safra seguinte; a carne à venda diminui primeiro, porque as fêmeas saem do abate.',
      'O arroz responde em uma safra. O boi demora anos: o bezerro precisa nascer e crescer.',
      'Nos dois casos, o excesso de oferta derruba o preço.',
      'E o ciclo recomeça. O arroz muda de direção de uma safra para a outra; o ciclo do boi leva cerca de 5–6 anos, segundo a Embrapa.'
    ];
    el('ciclo-frase').textContent = frases[etapa];
    el('ciclo-etapa').textContent = 'Etapa ' + (etapa + 1) + ' de ' + CICLO_ARROZ.length;
  }

  function montarCiclos() {
    el('ciclo-avancar').addEventListener('click', () => { etapa = (etapa + 1) % CICLO_ARROZ.length; desenharCiclos(); });
    el('ciclo-voltar').addEventListener('click', () => { etapa = (etapa - 1 + CICLO_ARROZ.length) % CICLO_ARROZ.length; desenharCiclos(); });
    desenharCiclos();

    // ----- Arroz: área plantada por safra (Conab) -----
    const R = C.arroz;
    new Chart(el('graf-arroz-area'), {
      type: 'bar',
      data: {
        labels: R.safras.map(s => s.safra + (s.estimativa ? ' (estimativa)' : '')),
        datasets: [{
          label: 'Área plantada (mil hectares)',
          data: R.safras.map(s => s.area_mil_ha),
          backgroundColor: R.safras.map(s => (s.estimativa ? '#ffffff' : COR_NEUTRA)),
          borderColor: R.safras.map(s => (s.estimativa ? COR_TEXTO : COR_NEUTRA)),
          borderWidth: R.safras.map(s => (s.estimativa ? 2 : 0)),
          borderDash: [4, 3]
        }]
      },
      options: {
        plugins: { legend: { display: false }, tooltip: { callbacks: { label: c => numero(c.parsed.y) + ' mil hectares' } } },
        scales: {
          x: { ticks: { maxRotation: 50, autoSkip: false }, grid: { display: false } },
          y: { beginAtZero: true, ticks: { callback: v => numero(v) }, grid: { color: COR_GRADE } }
        }
      }
    });
    el('arroz-fonte-area').innerHTML = 'Área plantada de arroz no Brasil, em mil hectares, por safra. A barra vazada da direita é ' +
      R.nota_estimativa.charAt(0).toLowerCase() + R.nota_estimativa.slice(1) + ' Fonte: ' + fonteLink(R.fonte_safras) + '.';
    graficoLinha('graf-arroz-ipca', R.serie_ipca_arroz_12m.map(p => mesCurto(p[0])), R.serie_ipca_arroz_12m.map(p => p[1]),
      { rotulo: 'Arroz, 12 meses', formato: v => porcento(v), cor: COR_DESTAQUE });
    el('arroz-fonte-ipca').innerHTML = 'Variação do preço do arroz em 12 meses, Brasil, de ' +
      mesLongo(R.serie_ipca_arroz_12m[0][0]) + ' a ' + mesLongo(R.serie_ipca_arroz_12m[R.serie_ipca_arroz_12m.length - 1][0]) +
      '. Fonte: ' + fonteLink(R.fonte_ipca) + '.';
    el('arroz-texto').innerHTML =
      'Segundo a Conab, a área cresceu em 2024/25 "impulsionada pelos elevados preços" e encolheu em 2025/26 principalmente pelo preço. ' +
      'Com a colheita grande de 2024/25, o arroz ficou <strong>' + porcento(Math.abs(R.ipca_2025_pct)) + ' mais barato</strong> em 2025 (IPCA, Brasil). ' +
      'Depois, a produção de 2025/26 caiu ' + num(Math.abs(R.producao_2025_26_pct), 1) + '% (' + fonteLink(R.fonte_producao) + ').';

    // ----- Boi: participação das fêmeas no abate (cálculo da equipe) -----
    const Bo = C.boi;
    graficoLinha('graf-boi-femeas', Bo.femeas_pct.map(p => trimestre(p[0])), Bo.femeas_pct.map(p => p[1]),
      { rotulo: 'Fêmeas no abate', formato: v => num(v, 1) + '%', cor: COR_DESTAQUE });
    el('boi-fonte').innerHTML = 'Participação das fêmeas (vacas e novilhas) no total de bovinos abatidos no Brasil, por trimestre, de ' +
      trimestre(Bo.femeas_pct[0][0]) + ' ao ' + trimestre(Bo.femeas_pct[Bo.femeas_pct.length - 1][0]) + '. Fonte dos dados: ' + fonteLink(Bo.femeas_calculo.fonte) + '.';
    el('boi-conta').innerHTML = '<strong>Conta:</strong> ' + Bo.femeas_calculo.formula + '. ' + Bo.femeas_calculo.nota;
    el('boi-texto').innerHTML =
      'Linha subindo: os pecuaristas vendem fêmeas (mais carne agora). Linha descendo: seguram fêmeas para ter bezerros (menos carne agora). ' +
      'As ondas da linha mostram o ciclo do boi (leitura da equipe, com base no mecanismo descrito pelo Banco Central), que a Embrapa estima em cerca de ' + Bo.ciclo_anos + ' (' + fonteLink(Bo.fonte_ciclo) + '). ' +
      'Em 2025, o IBGE registrou o maior número de fêmeas abatidas da série, iniciada em 1997, e elas foram ' + num(Bo.femeas_2025_ibge_pct, 1) + '% do abate total (' + fonteLink(Bo.fonte_2025) + ').';
  }

  // ===================================================================
  // 4. BIODIESEL E ÓLEO DE SOJA
  // ===================================================================
  function montarBiodiesel() {
    const Bd = C.biodiesel;
    el('bio-linha').innerHTML = '<li><span class="marco">até mar/2023</span><span>' + Bd.antes + '</span></li>' +
      Bd.misturas.map(m => '<li><span class="marco">' + mesCurto(m.inicio) + '</span><span>' + m.texto + ' (' + fonteLink(m.fonte) + ')</span></li>').join('');

    new Chart(el('graf-bio-destino'), {
      type: 'bar',
      data: {
        labels: Bd.epe.map(e => e.ano),
        datasets: [{
          label: '% do óleo de soja produzido que foi para o biodiesel',
          data: Bd.epe.map(e => e.biodiesel_pct),
          backgroundColor: Bd.epe.map((e, i) => (i === 2 ? COR_DESTAQUE : COR_NEUTRA))
        }]
      },
      options: {
        plugins: { legend: { display: false }, tooltip: { callbacks: { label: c => num(c.parsed.y, 1) + '% foi para o biodiesel' } } },
        scales: {
          x: { grid: { display: false } },
          y: { beginAtZero: true, max: 100, ticks: { callback: v => v + '%' }, grid: { color: COR_GRADE } }
        }
      }
    });
    el('bio-conta').innerHTML = '<strong>Conta:</strong> ' + Bd.epe_calculo.formula + '. Por exemplo, em ' + Bd.epe[2].ano + ': ' +
      num(Bd.epe[2].biodiesel_mt, 1) + ' ÷ ' + num(Bd.epe[2].producao_mt, 1) + ' × 100. Fonte dos volumes: ' + fonteLink(Bd.epe_calculo.fonte) + '.';

    el('bio-ipca').innerHTML = Bd.ipca_oleo_12m.map(p =>
      '<tr><td>' + mesCurto(p.mes) + '</td><td>' + p.mistura + '</td><td class="' + (p.valor < 0 ? 'queda' : 'alta') + '">' + porcentoComSinal(p.valor) + '</td></tr>'
    ).join('');
    el('bio-fonte-ipca').innerHTML = 'Variação do preço do óleo de soja em 12 meses, Brasil. Fonte: ' + fonteLink(Bd.fonte_ipca) + '.';
    el('bio-atencao').innerHTML =
      '<li><strong>O que está comprovado:</strong> a decisão de energia mudou para onde vai o óleo. A EPE liga a queda da exportação de óleo em 2024 ao maior uso no biodiesel (' + fonteLink('epe') + '). A Conab também escreve que uma mistura maior reduz o óleo disponível para exportar (Conab, Perspectivas para a Agropecuária).</li>' +
      '<li><strong>O que não está medido:</strong> nenhuma fonte independente calcula quanto o biodiesel muda o preço do óleo no supermercado. A única que liga os dois, em 2024, é um ' + fonteLink('cepea_abiove') + '. Por isso esta parte não tem simulação.</li>' +
      '<li><strong>Os dados contrariam uma leitura simples:</strong> a maior alta da tabela foi em 2022, com a mistura no mínimo (B10), e em 2026 o preço caiu com o B15.</li>' +
      '<li><strong>Elo com o café e o dólar:</strong> o grupo de trabalho do governo escreve que o óleo de soja no Brasil é precificado pelo valor internacional (' + fonteLink('gt_biodiesel') + '). O biodiesel acrescenta um comprador interno a um produto que já segue o preço de fora.</li>';
  }

  // ===================================================================
  // FONTES DA ABA
  // ===================================================================
  function montarFontes() {
    el('causas-fontes').innerHTML = Object.keys(F).map(k => '<li>' + fonteLink(k) + '</li>').join('');
  }

  // Botões do índice: rolam até a parte escolhida (o "#" do endereço é usado pelas telas)
  function montarIndice() {
    document.querySelectorAll('[data-ir]').forEach(b => {
      b.addEventListener('click', () => el(b.dataset.ir).scrollIntoView({ behavior: 'smooth', block: 'start' }));
    });
  }

  window.iniciarCausas = function () {
    if (iniciada) return; // só monta uma vez
    iniciada = true;
    montarIndice();
    montarAncora();
    montarSimulacaoCafe();
    montarCafe();
    montarCiclos();
    montarBiodiesel();
    montarFontes();
  };
})();
