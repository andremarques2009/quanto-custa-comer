/*
  cesta.js — aba "Cesta × salário": custo da cesta básica de São Paulo
  comparado com o salário mínimo (dados do DIEESE/Conab).

  Os gráficos só são criados na primeira vez que a aba é aberta
  (um gráfico criado em uma aba escondida ficaria com tamanho zero).
*/

const DADOS = window.DADOS_CESTA;
const REGISTROS = DADOS.registros;              // um registro por mês, em ordem
const PRIMEIRO = REGISTROS[0];                  // primeiro mês da série
const ULTIMO = REGISTROS[REGISTROS.length - 1]; // mês mais recente

function rotuloCurto(registro) { return mesCurto(registro.mes_referencia); }
function rotuloLongo(registro) { return mesLongo(registro.mes_referencia); }

// Monta o texto "123 horas e 27 minutos" a partir do registro
function tempoTexto(registro) {
  const h = registro.tempo_trabalho_horas;
  const m = registro.tempo_trabalho_minutos;
  return h + ' horas e ' + m + (m === 1 ? ' minuto' : ' minutos');
}

// Frase de fonte que aparece embaixo de cada gráfico
function textoFonteCesta(complemento) {
  return 'Fonte: ' + DADOS.fonte + '. Cidade de São Paulo. ' + complemento;
}

// Procura um registro pelo mês, por exemplo "2026-06"
function registroDoMes(anoMes) {
  return REGISTROS.find(r => r.mes_referencia === anoMes);
}

let cestaIniciada = false;

function iniciarCesta() {
  if (cestaIniciada) return; // só monta uma vez
  cestaIniciada = true;
  montarCustoCesta();
  montarSalario();
  montarAlimentosSP();
}

const PERIODO_CESTA = 'Meses de referência: ' + rotuloLongo(PRIMEIRO) + ' a ' + rotuloLongo(ULTIMO) + '.';


// ===================================================================
// O CUSTO DA CESTA BÁSICA
// ===================================================================
function montarCustoCesta() {
  const valoresCesta = REGISTROS.map(r => r.valor_cesta_reais);
  const iMaior = valoresCesta.indexOf(Math.max(...valoresCesta)); // posição do maior valor
  const iMenor = valoresCesta.indexOf(Math.min(...valoresCesta)); // posição do menor valor

  // Lista de alimentos da cesta, tirada dos dados do mês mais recente,
  // exibida em ordem alfabética (localeCompare respeita os acentos do português)
  const nomesAlimentos = Object.keys(ULTIMO.produtos_variacao_12_meses_pct)
    .sort((a, b) => a.localeCompare(b, 'pt-BR'));

  document.getElementById('texto-cesta').textContent =
    'A cesta básica do DIEESE é uma lista de ' + nomesAlimentos.length + ' alimentos (' +
    nomesAlimentos.join(', ') + ') em quantidade suficiente para alimentar um adulto durante um mês. ' +
    'Em São Paulo, ela custava ' + reais(PRIMEIRO.valor_cesta_reais) + ' em ' + rotuloLongo(PRIMEIRO) +
    ' e ' + reais(ULTIMO.valor_cesta_reais) + ' em ' + rotuloLongo(ULTIMO) + '. ' +
    'O valor mais alto do período foi ' + reais(valoresCesta[iMaior]) + ' (' + rotuloLongo(REGISTROS[iMaior]) + ')' +
    ' e o mais baixo, ' + reais(valoresCesta[iMenor]) + ' (' + rotuloLongo(REGISTROS[iMenor]) + ').';

  document.getElementById('fonte-cesta').textContent = textoFonteCesta(PERIODO_CESTA);

  // Plugin simples que escreve "Maior" e "Menor" ao lado dos pontos destacados
  const pluginMaiorMenor = {
    id: 'maiorMenor',
    afterDatasetsDraw(chart) {
      const ctx = chart.ctx;
      const pontos = chart.getDatasetMeta(0).data;
      const marcas = [
        { i: iMaior, texto: 'Maior: ' + reais(valoresCesta[iMaior]), cor: COR_DESTAQUE, deslocY: -14 },
        { i: iMenor, texto: 'Menor: ' + reais(valoresCesta[iMenor]), cor: COR_NEUTRA, deslocY: 22 }
      ];
      ctx.save();
      ctx.font = 'bold ' + TAMANHO_ROTULO + 'px ' + Chart.defaults.font.family;
      marcas.forEach(m => {
        const p = pontos[m.i];
        // perto das bordas, o texto fica para dentro do gráfico
        const pertoDaDireita = p.x > chart.chartArea.right - 120;
        const pertoDaEsquerda = p.x < chart.chartArea.left + 120;
        ctx.textAlign = pertoDaDireita ? 'right' : (pertoDaEsquerda ? 'left' : 'center');
        ctx.fillStyle = m.cor;
        ctx.fillText(m.texto, p.x, p.y + m.deslocY);
      });
      ctx.restore();
    }
  };

  new Chart(document.getElementById('grafico-cesta'), {
    type: 'line',
    data: {
      labels: REGISTROS.map(rotuloCurto),
      datasets: [{
        label: 'Valor da cesta básica (R$)',
        data: valoresCesta,
        borderColor: COR_DESTAQUE,
        backgroundColor: COR_DESTAQUE,
        borderWidth: 3,
        tension: 0.2,
        // pontos maiores no maior e no menor valor
        pointRadius: valoresCesta.map((v, i) => (i === iMaior || i === iMenor ? 8 : 3)),
        pointBackgroundColor: valoresCesta.map((v, i) => (i === iMenor ? COR_NEUTRA : COR_DESTAQUE)),
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2
      }]
    },
    options: {
      layout: { padding: { top: 24, bottom: 8, left: 4, right: 12 } },
      plugins: {
        legend: { display: false },
        tooltip: { callbacks: { label: c => 'Cesta: ' + reais(c.parsed.y) } }
      },
      scales: {
        y: { grace: '8%', ticks: { callback: v => reais(v) }, grid: { color: COR_GRADE } },
        x: { grid: { display: false } }
      }
    },
    plugins: [pluginMaiorMenor]
  });
}


// ===================================================================
// QUANTO DO SALÁRIO VAI PARA A CESTA
// ===================================================================
function montarSalario() {
  const porcentagens = REGISTROS.map(r => r.porcentagem_salario_minimo_liquido);

  // Mês em que o salário mínimo mudou (o primeiro mês com valor diferente do anterior)
  const iReajuste = REGISTROS.findIndex((r, i) =>
    i > 0 && r.salario_minimo_vigente_reais !== REGISTROS[i - 1].salario_minimo_vigente_reais);
  const antes = REGISTROS[iReajuste - 1];
  const depois = REGISTROS[iReajuste];

  document.getElementById('texto-salario-intro').textContent =
    'O DIEESE compara o preço da cesta com o salário mínimo líquido, isto é, o que sobra do salário mínimo ' +
    'depois do desconto de ' + numero(DADOS.desconto_previdencia_pct) + '% da Previdência Social. ' +
    'O gráfico mostra quanto desse salário foi gasto com a cesta básica em cada mês. ' +
    'O cartão mostra quantas horas de trabalho, ganhando o salário mínimo, foram necessárias para comprar a cesta.';

  // Texto sobre o reajuste, montado comparando os valores dos dados
  let texto =
    'Poder de compra é a quantidade de coisas que dá para comprar com o mesmo dinheiro. ' +
    'Em ' + rotuloLongo(depois) + ', o salário mínimo passou de ' +
    reais(antes.salario_minimo_vigente_reais) + ' para ' + reais(depois.salario_minimo_vigente_reais) + '. ';

  if (depois.porcentagem_salario_minimo_liquido < antes.porcentagem_salario_minimo_liquido) {
    texto += 'Com isso, o peso da cesta caiu: foi de ' + porcento(antes.porcentagem_salario_minimo_liquido) +
      ' do salário líquido em ' + rotuloLongo(antes) + ' para ' +
      porcento(depois.porcentagem_salario_minimo_liquido) + ' em ' + rotuloLongo(depois) + '. ';
  } else {
    texto += 'Mesmo assim, o peso da cesta não caiu: foi de ' + porcento(antes.porcentagem_salario_minimo_liquido) +
      ' para ' + porcento(depois.porcentagem_salario_minimo_liquido) + '. ';
  }

  // Compara junho do ano do reajuste com junho do ano anterior
  const anoReajuste = Number(depois.mes_referencia.slice(0, 4));
  const junhoDepois = registroDoMes(anoReajuste + '-06');
  const junhoAntes = registroDoMes((anoReajuste - 1) + '-06');
  if (junhoDepois && junhoAntes) {
    const pDepois = junhoDepois.porcentagem_salario_minimo_liquido;
    const pAntes = junhoAntes.porcentagem_salario_minimo_liquido;
    if (pDepois > pAntes) {
      texto += 'Mas o alívio durou pouco: com a alta dos alimentos, em ' + rotuloLongo(junhoDepois) +
        ' a cesta já levava ' + porcento(pDepois) + ' do salário líquido, mais do que os ' +
        porcento(pAntes) + ' de ' + rotuloLongo(junhoAntes) + ', quando o salário mínimo ainda era menor.';
    } else {
      texto += 'Em ' + rotuloLongo(junhoDepois) + ', a cesta levava ' + porcento(pDepois) +
        ' do salário líquido, contra ' + porcento(pAntes) + ' em ' + rotuloLongo(junhoAntes) + '.';
    }
  }
  document.getElementById('texto-reajuste').textContent = texto;

  document.getElementById('fonte-salario').textContent = textoFonteCesta(PERIODO_CESTA +
    ' Salário mínimo de 2026: ' + DADOS.fontes_complementares[0].nome + '.');

  let mesSelecionado = REGISTROS.length - 1; // começa no mês mais recente

  // Plugin que desenha a linha tracejada do reajuste do salário mínimo
  const pluginReajuste = {
    id: 'linhaReajuste',
    afterDatasetsDraw(chart) {
      const ctx = chart.ctx;
      const x = chart.scales.x.getPixelForValue(iReajuste);
      const area = chart.chartArea;
      ctx.save();
      ctx.strokeStyle = COR_TEXTO;
      ctx.setLineDash([6, 4]);
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(x, area.top);
      ctx.lineTo(x, area.bottom);
      ctx.stroke();
      // Texto à esquerda da linha
      ctx.setLineDash([]);
      ctx.fillStyle = COR_TEXTO;
      ctx.textAlign = 'right';
      const tamanho = chart.width < 500 ? 11 : TAMANHO_ROTULO; // letra menor no celular
      ctx.font = 'bold ' + tamanho + 'px ' + Chart.defaults.font.family;
      ctx.fillText('Reajuste do salário mínimo', x - 6, area.top + 14);
      ctx.font = tamanho + 'px ' + Chart.defaults.font.family;
      ctx.fillText(reais(antes.salario_minimo_vigente_reais) + ' → ' +
        reais(depois.salario_minimo_vigente_reais), x - 6, area.top + 32);
      ctx.restore();
    }
  };

  const grafico = new Chart(document.getElementById('grafico-salario'), {
    type: 'line',
    data: {
      labels: REGISTROS.map(rotuloCurto),
      datasets: [{
        label: '% do salário mínimo líquido',
        data: porcentagens,
        borderColor: COR_DESTAQUE,
        backgroundColor: COR_DESTAQUE,
        borderWidth: 3,
        tension: 0.2,
        // o ponto do mês selecionado fica maior
        pointRadius: c => (c.dataIndex === mesSelecionado ? 8 : 3),
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2
      }]
    },
    options: {
      layout: { padding: { top: 8, right: 12 } },
      interaction: { mode: 'nearest', axis: 'x', intersect: false },
      plugins: {
        legend: { display: false },
        tooltip: { callbacks: { label: c => porcento(c.parsed.y) + ' do salário mínimo líquido' } }
      },
      scales: {
        y: { grace: '10%', ticks: { callback: v => numero(v) + '%' }, grid: { color: COR_GRADE } },
        x: { grid: { display: false } }
      },
      // clicar em um ponto escolhe aquele mês no cartão
      onClick: (evento, elementos) => {
        if (elementos.length > 0) selecionarMes(elementos[0].index);
      }
    },
    plugins: [pluginReajuste]
  });

  // Preenche o seletor de mês do cartão
  const seletor = document.getElementById('seletor-mes-horas');
  REGISTROS.forEach((r, i) => seletor.add(new Option(rotuloLongo(r), i)));
  seletor.addEventListener('change', () => selecionarMes(Number(seletor.value)));

  // Atualiza o cartão de horas com o mês escolhido
  function selecionarMes(i) {
    mesSelecionado = i;
    const r = REGISTROS[i];
    seletor.value = i;
    document.getElementById('cartao-horas').textContent = tempoTexto(r);
    document.getElementById('cartao-detalhes').innerHTML =
      '<li>Cesta: <strong>' + reais(r.valor_cesta_reais) + '</strong></li>' +
      '<li>Salário mínimo: <strong>' + reais(r.salario_minimo_vigente_reais) + '</strong></li>' +
      '<li>Parte do salário líquido: <strong>' + porcento(r.porcentagem_salario_minimo_liquido) + '</strong></li>' +
      '<li class="fonte">Fonte: DIEESE/Conab, ' + rotuloLongo(r) + '</li>';
    grafico.update();
  }
  selecionarMes(mesSelecionado);
}


// ===================================================================
// QUAIS ALIMENTOS MAIS PESARAM (São Paulo, DIEESE)
// ===================================================================
function montarAlimentosSP() {
  document.getElementById('texto-alimentos-sp').textContent =
    'Escolha um mês para ver quanto o preço de cada alimento subiu ou caiu em 12 meses, ' +
    'ou seja, comparando com o mesmo mês do ano anterior. Barras para a direita do zero são altas de preço; ' +
    'barras para a esquerda são quedas. Os PDFs do DIEESE informam a variação em porcentagem de cada alimento, ' +
    'e não o preço em reais.';

  // Plugin que escreve o valor (%) na ponta de cada barra
  const pluginValoresBarras = {
    id: 'valoresBarras',
    afterDatasetsDraw(chart) {
      const ctx = chart.ctx;
      const valores = chart.data.datasets[0].data;
      ctx.save();
      ctx.font = 'bold ' + TAMANHO_ROTULO + 'px ' + Chart.defaults.font.family;
      ctx.fillStyle = COR_TEXTO;
      ctx.textBaseline = 'middle';
      chart.getDatasetMeta(0).data.forEach((barra, i) => {
        const v = valores[i];
        // alta: valor depois da ponta da barra; queda: valor à direita do zero
        // (assim o número não fica em cima do nome do alimento)
        ctx.textAlign = 'left';
        ctx.fillText(porcento(v), (v < 0 ? barra.base : barra.x) + 6, barra.y);
      });
      ctx.restore();
    }
  };

  const grafico = new Chart(document.getElementById('grafico-alimentos-sp'), {
    type: 'bar',
    data: { labels: [], datasets: [{ data: [], backgroundColor: [], borderRadius: 3 }] },
    options: {
      indexAxis: 'y', // barras deitadas
      layout: { padding: { left: 4, right: 12 } },
      plugins: {
        legend: { display: false },
        tooltip: { callbacks: { label: c => 'Variação em 12 meses: ' + porcento(c.parsed.x) } }
      },
      scales: {
        x: { grace: '25%', ticks: { callback: v => numero(v) + '%' }, grid: { color: COR_GRADE } },
        y: { grid: { display: false } }
      }
    },
    plugins: [pluginValoresBarras]
  });

  const seletor = document.getElementById('seletor-mes-alimentos');
  REGISTROS.forEach((r, i) => seletor.add(new Option(rotuloLongo(r), i)));
  seletor.addEventListener('change', () => mostrar(Number(seletor.value)));

  function mostrar(i) {
    const r = REGISTROS[i];
    seletor.value = i;
    const produtos = Object.entries(r.produtos_variacao_12_meses_pct); // [nome, {variacao_pct, ...}]

    // Separa os alimentos com número dos que o PDF descreve sem número
    const comNumero = produtos.filter(([, p]) => p.variacao_pct !== null)
      .sort((a, b) => b[1].variacao_pct - a[1].variacao_pct); // da maior alta para a maior queda
    const semNumero = produtos.filter(([, p]) => p.variacao_pct === null);

    // Atualiza o gráfico (asterisco nos valores que têm observação)
    grafico.data.labels = comNumero.map(([nome, p]) => quebrarNome(p.observacao ? nome + ' *' : nome));
    grafico.data.datasets[0].data = comNumero.map(([, p]) => p.variacao_pct);
    grafico.data.datasets[0].backgroundColor = comNumero.map(([, p]) =>
      (p.variacao_pct > 0 ? COR_DESTAQUE : COR_NEUTRA));
    grafico.update();

    // Notas embaixo do gráfico
    let notas = '';
    const observacoes = [...new Set(comNumero.filter(([, p]) => p.observacao).map(([, p]) => p.observacao))];
    observacoes.forEach(o => { notas += '<p>* ' + o + '</p>'; });
    semNumero.forEach(([nome, p]) => {
      notas += '<p><strong>' + nome + '</strong>: sem valor numérico no PDF. O PDF diz: “' + p.texto_no_pdf + '”</p>';
    });
    document.getElementById('notas-alimentos-sp').innerHTML = notas;

    document.getElementById('fonte-alimentos-sp').textContent =
      // nome do PDF como está no site do DIEESE (a pasta fontes/ não vai para a versão publicada)
      textoFonteCesta('Mês de referência: ' + rotuloLongo(r) + ' (arquivo ' + r.link_origem.split('/').pop() + ').');
  }
  mostrar(REGISTROS.length - 1);
}
