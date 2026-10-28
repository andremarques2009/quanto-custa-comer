/*
  alimentos.js — tela inicial (grade com os 13 alimentos) e tela de cada alimento
  (gráfico da inflação nos últimos 4 anos, por região do Brasil).

  Dados: IPCA do IBGE (window.DADOS_IPCA, gerado de data/ipca-alimentos.json)
  Fotos: Wikimedia Commons (window.DADOS_FOTOS, gerado de data/fotos.json)
*/

const IPCA = window.DADOS_IPCA;
const FOTOS = window.DADOS_FOTOS ? window.DADOS_FOTOS.fotos : {};
const MESES_IPCA = IPCA.meses;                       // ["2022-10", ..., "2026-09"]
const ULTIMO_MES_IPCA = MESES_IPCA[MESES_IPCA.length - 1];
const LOCAL_BRASIL = IPCA.locais.find(l => l.regiao === 'Brasil');
const REGIOES = ['Brasil', 'Norte', 'Nordeste', 'Centro-Oeste', 'Sudeste', 'Sul'];

// Nome da área como o IBGE publica. Regiões metropolitanas já vêm com o nome oficial
// ("Região Metropolitana de São Paulo"); municípios ganham "(município)" para não confundir.
function nomeArea(local) {
  return local.nivel === 'Município' ? local.nome_exibicao + ' (município)' : local.nome_exibicao;
}

// O gráfico abre a partir do primeiro mês da pesquisa da cesta (DIEESE), para as duas
// partes do app cobrirem o mesmo período; um botão mostra os 4 anos completos.
const MES_INICIO_RECENTE = window.DADOS_CESTA.registros[0].mes_referencia;
const I_INICIO_RECENTE = Math.max(0, MESES_IPCA.indexOf(MES_INICIO_RECENTE));
const PERIODOS = {
  recente: { nome: 'Desde ' + mesLongo(MES_INICIO_RECENTE), inicio: I_INICIO_RECENTE },
  completo: { nome: 'Período completo (desde ' + mesLongo(MESES_IPCA[0]) + ')', inicio: 0 }
};

const MEDIDAS = {
  doze_meses: {
    nome: 'Acumulado em 12 meses',
    explica: 'Acumulado em 12 meses: quanto o preço subiu ou caiu em comparação com o mesmo mês do ano anterior.'
  },
  mensal: {
    nome: 'Mês a mês',
    explica: 'Mês a mês: quanto o preço subiu ou caiu em comparação com o mês anterior.'
  }
};

// Busca a série de um item do IPCA em um local: devolve a lista de 48 valores (ou null)
function serieIPCA(codigoItem, idLocal, medida) {
  const porLocal = IPCA.series[String(codigoItem)];
  if (!porLocal || !porLocal[idLocal]) return null;
  const valores = porLocal[idLocal][medida];
  // série sem nenhum número = o IBGE não publica esse item nesse local
  return valores.some(v => v !== null) ? valores : null;
}

// Nome do item do IPCA para mostrar na tela: usa o "rotulo" quando existe
// (ex.: "Chã de dentro (coxão mole)"); senão, o nome como o IBGE publica
function rotuloItem(item) {
  return item.rotulo || item.nome;
}

// Apelido entre parênteses no rótulo: "Chã de dentro (coxão mole)" -> "coxão mole"
function apelidoItem(item) {
  const achado = item.rotulo ? item.rotulo.match(/\(([^)]+)\)$/) : null;
  return achado ? achado[1] : null;
}

// Nome curto, sem o apelido: "Banana d'água (nanica)" -> "Banana d'água"
function nomeCurtoItem(item) {
  return item.rotulo ? item.rotulo.replace(/\s*\([^)]*\)$/, '') : item.nome;
}

// Último valor da série (mês mais recente)
function ultimoValor(serie) {
  return serie ? serie[serie.length - 1] : null;
}

// Monta a foto (ou um quadro com o nome, se a foto não existir)
function htmlFoto(chave, nome) {
  const foto = FOTOS[chave];
  if (foto) return '<img src="' + foto.arquivo + '" alt="' + foto.descricao + '">';
  return '<span class="foto-vazia">' + maiuscula(nome) + '</span>';
}


// ===================================================================
// TELA INICIAL: GRADE DE ALIMENTOS
// ===================================================================

function montarGrade() {
  const ordem = document.getElementById('ordem-alimentos').value;

  // Para cada alimento, pega a variação em 12 meses no Brasil no mês mais recente
  const lista = IPCA.alimentos.map(a => {
    const item = a.itens_ipca[0];
    const valor = ultimoValor(serieIPCA(item.codigo, LOCAL_BRASIL.id, 'doze_meses'));
    return { alimento: a, item: item, valor: valor };
  });

  if (ordem === 'nome') lista.sort((x, y) => x.alimento.nome.localeCompare(y.alimento.nome, 'pt-BR'));
  if (ordem === 'maior') lista.sort((x, y) => (y.valor ?? -Infinity) - (x.valor ?? -Infinity));
  if (ordem === 'menor') lista.sort((x, y) => (x.valor ?? Infinity) - (y.valor ?? Infinity));

  document.getElementById('grade-alimentos').innerHTML = lista.map(({ alimento, item, valor }) => {
    let selo;
    if (valor === null) {
      selo = '<span class="selo">sem dado do IBGE</span>';
    } else {
      const subiu = valor > 0;
      selo = '<span class="selo ' + (subiu ? 'selo-alta' : 'selo-queda') + '">' +
        (subiu ? '▲ ' : '▼ ') + porcentoComSinal(valor) + '</span>';
    }
    // quando o alimento tem mais de um tipo no IPCA, diz qual está no selo
    const tipo = alimento.itens_ipca.length > 1 ? '<span class="tipo">' + rotuloItem(item) + '</span>' : '';
    return '<a class="card-alimento" href="#/alimento/' + alimento.chave + '">' +
      '<div class="foto">' + htmlFoto(alimento.chave, alimento.nome) + '</div>' +
      '<div class="card-corpo">' +
      '<h3>' + maiuscula(alimento.nome) + '</h3>' + tipo + selo +
      '<span class="botao">Ver inflação →</span>' +
      '</div></a>';
  }).join('');

  // explicação do número dos cartões, uma vez só, acima da grade
  document.getElementById('legenda-grade').textContent =
    'Variação em 12 meses no Brasil, até ' + mesLongo(ULTIMO_MES_IPCA);

  document.getElementById('fonte-grade').textContent =
    'Variação em 12 meses no Brasil, em ' + mesLongo(ULTIMO_MES_IPCA) + '. Fonte: ' + IPCA.fonte + '.';
}

document.getElementById('ordem-alimentos').addEventListener('change', montarGrade);

// Explicação completa do período do gráfico, na aba Sobre (tudo calculado a partir dos dados)
function montarSobrePeriodo() {
  const anos = MESES_IPCA.length / 12;
  document.getElementById('sobre-periodo').textContent =
    'O período completo mostra os últimos ' + anos + ' anos (' + MESES_IPCA.length + ' meses) com dados publicados pelo IBGE: de ' +
    mesLongo(MESES_IPCA[0]) + ' a ' + mesLongo(ULTIMO_MES_IPCA) + ', o mês mais recente disponível quando os dados foram baixados. ' +
    'O gráfico abre em ' + mesLongo(MES_INICIO_RECENTE) + ', o primeiro mês da pesquisa da cesta básica usada na aba ' +
    '"Cesta × salário", para as duas partes do app mostrarem o mesmo período.';
}


// ===================================================================
// TELA DE UM ALIMENTO
// ===================================================================

// O que está escolhido na tela agora
const escolha = { alimento: null, item: 0, regiao: 'Brasil', medida: 'doze_meses', periodo: 'recente' };
let graficoAlimento = null;

// Cria um grupo de "pílulas" (botões de escolha) e avisa quando uma é clicada
function montarPilulas(idElemento, opcoes, valorAtual, aoEscolher) {
  const caixa = document.getElementById(idElemento);
  caixa.innerHTML = '';
  opcoes.forEach(op => {
    const botao = document.createElement('button');
    botao.type = 'button';
    botao.textContent = op.rotulo;
    botao.className = 'pilula' + (op.valor === valorAtual ? ' ativa' : '');
    botao.setAttribute('aria-pressed', op.valor === valorAtual);
    botao.addEventListener('click', () => aoEscolher(op.valor));
    caixa.appendChild(botao);
  });
}

// Chamada pelo app.js quando o endereço é #/alimento/<chave>
function mostrarAlimento(chave) {
  const alimento = IPCA.alimentos.find(a => a.chave === chave);
  if (!alimento) { location.hash = '#/alimentos'; return; }
  if (escolha.alimento !== alimento) escolha.item = 0; // trocou de alimento: volta ao primeiro tipo
  escolha.alimento = alimento;

  document.getElementById('alimento-nome').textContent = maiuscula(alimento.nome);
  document.getElementById('alimento-foto').innerHTML = htmlFoto(alimento.chave, alimento.nome);

  const foto = FOTOS[alimento.chave];
  document.getElementById('alimento-credito').innerHTML = foto
    ? 'Foto: ' + foto.autor + ', ' + foto.licenca + ', via <a href="' + foto.pagina_commons +
      '" target="_blank" rel="noopener">Wikimedia Commons</a>'
    : '';

  // Aviso sobre a escolha do item do IPCA, em destaque logo abaixo do título
  const aviso = document.getElementById('alimento-aviso');
  aviso.hidden = !alimento.observacao;
  if (alimento.observacao) {
    // quando a observação vem de um documento, cita o documento e a página
    const doc = alimento.fonte_observacao ? IPCA.fontes_observacoes[alimento.fonte_observacao] : null;
    const textoFonte = doc
      ? ' Fonte: <a href="' + doc.link + '" target="_blank" rel="noopener">' + doc.nome + '</a>, p. ' + doc.pagina + '.'
      : '';
    // separa a primeira frase do restante (no celular, o restante fica recolhido)
    const partes = alimento.observacao.match(/^(.+?[.!?])\s+(.+)$/s);
    const inicio = partes ? partes[1] : alimento.observacao;
    const resto = (partes ? ' ' + partes[2] : '') + textoFonte;
    aviso.classList.remove('aberto');
    aviso.innerHTML = inicio + (resto
      ? '<span class="aviso-resto" id="aviso-resto">' + resto + '</span>' +
        ' <button type="button" class="ler-mais" aria-expanded="false" aria-controls="aviso-resto">ler mais</button>'
      : '');
    // o botão "ler mais" só aparece no celular (veja o style.css)
    const botao = aviso.querySelector('.ler-mais');
    if (botao) {
      botao.addEventListener('click', () => {
        const aberto = aviso.classList.toggle('aberto');
        botao.setAttribute('aria-expanded', aberto);
        botao.textContent = aberto ? 'ler menos' : 'ler mais';
      });
    }
  }

  atualizarAlimento();
}

// Redesenha tudo da tela do alimento com base na "escolha" atual
function atualizarAlimento() {
  const alimento = escolha.alimento;
  const item = alimento.itens_ipca[escolha.item];

  // Ex.: Item do IPCA usado: "Chã de dentro" (coxão mole)
  const apelido = apelidoItem(item);
  document.getElementById('alimento-descricao').textContent =
    'Item do IPCA usado: "' + item.nome + '"' + (apelido ? ' (' + apelido + ')' : '');

  // Pílulas: tipo (só aparece se houver mais de um), região e medida
  document.getElementById('grupo-item').hidden = alimento.itens_ipca.length < 2;
  montarPilulas('escolha-item', alimento.itens_ipca.map((it, i) => ({ rotulo: rotuloItem(it), valor: i })),
    escolha.item, v => { escolha.item = v; atualizarAlimento(); });
  montarPilulas('escolha-regiao', REGIOES.map(r => ({ rotulo: r, valor: r })),
    escolha.regiao, v => { escolha.regiao = v; atualizarAlimento(); });
  montarPilulas('escolha-medida', Object.keys(MEDIDAS).map(m => ({ rotulo: MEDIDAS[m].nome, valor: m })),
    escolha.medida, v => { escolha.medida = v; atualizarAlimento(); });
  montarPilulas('escolha-periodo', Object.keys(PERIODOS).map(p => ({ rotulo: PERIODOS[p].nome, valor: p })),
    escolha.periodo, v => { escolha.periodo = v; atualizarAlimento(); });

  document.getElementById('explica-medida').textContent = MEDIDAS[escolha.medida].explica;

  // Uma frase sobre o período (a explicação completa está na aba Sobre)
  document.getElementById('explica-periodo').innerHTML =
    'O gráfico abre em ' + mesLongo(MES_INICIO_RECENTE) + '; o período completo vai de ' + mesLongo(MESES_IPCA[0]) +
    ' a ' + mesLongo(ULTIMO_MES_IPCA) + ' (<a href="#/sobre">por quê?</a>).';

  // Áreas da região escolhida (no "Brasil", só o resultado nacional publicado pelo IBGE)
  const locais = IPCA.locais.filter(l => l.regiao === escolha.regiao);
  const linhas = [];
  locais.forEach(local => {
    const serie = serieIPCA(item.codigo, local.id, escolha.medida);
    // a linha do Brasil leva o nome do tipo: "Chã de dentro – Brasil"
    const rotulo = local.id === LOCAL_BRASIL.id ? nomeCurtoItem(item) + ' – Brasil' : nomeArea(local);
    if (serie) linhas.push({ rotulo: rotulo, dados: serie });
  });

  // Linhas de comparação, tracejadas
  const comparacoes = [];
  const serieBrasil = serieIPCA(item.codigo, LOCAL_BRASIL.id, escolha.medida);
  if (escolha.regiao === 'Brasil') {
    // no Brasil, compara o alimento com a inflação geral (todos os produtos e serviços)
    const geral = serieIPCA(IPCA.indice_geral.codigo, LOCAL_BRASIL.id, escolha.medida);
    if (geral) comparacoes.push({ rotulo: 'Inflação geral (IPCA) – Brasil', dados: geral });
  } else if (serieBrasil) {
    // nas regiões, compara cada área com o Brasil
    comparacoes.push({ rotulo: nomeCurtoItem(item) + ' – Brasil', dados: serieBrasil });
  }

  const inicio = PERIODOS[escolha.periodo].inicio;
  desenharGraficoAlimento(linhas, comparacoes, inicio);

  document.getElementById('fonte-alimento').textContent =
    'Fonte: ' + IPCA.fonte + '. Meses de referência no gráfico: ' + mesLongo(MESES_IPCA[inicio]) + ' a ' +
    mesLongo(ULTIMO_MES_IPCA) + '.';

  const semDadosRanking = montarRanking(item);
  montarNotasAlimento(alimento, semDadosRanking);
}

// "inicio" é a posição do primeiro mês mostrado (0 = período completo)
function desenharGraficoAlimento(linhas, comparacoes, inicio) {
  const meses = MESES_IPCA.slice(inicio);
  const datasets = linhas.map((l, i) => ({
    label: l.rotulo,
    data: l.dados.slice(inicio),
    borderColor: CORES_LINHAS[i % CORES_LINHAS.length],
    backgroundColor: CORES_LINHAS[i % CORES_LINHAS.length],
    borderWidth: 2.5,
    pointRadius: 0,
    pointHoverRadius: 5,
    tension: 0.2
  })).concat(comparacoes.map(c => ({
    label: c.rotulo,
    data: c.dados.slice(inicio),
    borderColor: COR_NEUTRA,
    backgroundColor: COR_NEUTRA,
    borderDash: [6, 4],
    borderWidth: 2,
    pointRadius: 0,
    pointHoverRadius: 5,
    tension: 0.2
  })));

  if (!graficoAlimento) {
    graficoAlimento = new Chart(document.getElementById('grafico-alimento'), {
      type: 'line',
      data: { labels: meses.map(mesCurto), datasets: datasets },
      options: {
        interaction: { mode: 'index', intersect: false },
        plugins: {
          legend: { position: 'bottom', labels: { boxWidth: 14, boxHeight: 3 } },
          tooltip: {
            callbacks: {
              title: itens => mesLongo(MESES_IPCA[escolhaInicio() + itens[0].dataIndex]),
              label: c => c.dataset.label + ': ' + porcentoComSinal(c.parsed.y)
            }
          }
        },
        scales: {
          y: {
            ticks: { callback: v => numero(v) + '%' },
            // a linha do zero fica mais escura: acima dela, alta; abaixo, queda
            grid: { color: c => (c.tick.value === 0 ? COR_TEXTO : COR_GRADE) }
          },
          x: { grid: { display: false }, ticks: { maxRotation: 0, autoSkipPadding: 12 } }
        }
      }
    });
  } else {
    graficoAlimento.data.labels = meses.map(mesCurto);
    graficoAlimento.data.datasets = datasets;
    graficoAlimento.update();
  }
}

// Posição do primeiro mês mostrado no gráfico agora
function escolhaInicio() {
  return PERIODOS[escolha.periodo].inicio;
}

// Lista dos locais, da maior para a menor variação no mês mais recente.
// Devolve os nomes dos locais sem dados do IBGE, para aparecerem nas notas.
function montarRanking(item) {
  // No "Brasil", o ranking mostra todos os locais pesquisados; nas regiões, só os da região
  const locais = IPCA.locais.filter(l => l.regiao !== 'Brasil' &&
    (escolha.regiao === 'Brasil' || l.regiao === escolha.regiao));

  const todos = locais
    .map(l => ({ nome: nomeArea(l), regiao: l.regiao, valor: ultimoValor(serieIPCA(item.codigo, l.id, escolha.medida)) }));
  const valores = todos.filter(x => x.valor !== null).sort((a, b) => b.valor - a.valor);
  const semDados = todos.filter(x => x.valor === null).map(x => x.nome);

  document.getElementById('titulo-ranking').textContent =
    (escolha.regiao === 'Brasil' ? 'Todas as áreas pesquisadas' : 'Áreas pesquisadas no ' + escolha.regiao) +
    ' em ' + mesLongo(ULTIMO_MES_IPCA) + ' (' + MEDIDAS[escolha.medida].nome.toLowerCase() + ')';

  document.getElementById('ranking-alimento').innerHTML = valores.map(x =>
    '<li><span>' + x.nome + (escolha.regiao === 'Brasil' ? ' <small>(' + x.regiao + ')</small>' : '') + '</span>' +
    '<strong class="' + (x.valor > 0 ? 'alta' : 'queda') + '">' + (x.valor > 0 ? '▲ ' : (x.valor < 0 ? '▼ ' : '')) +
    porcentoComSinal(x.valor) + '</strong></li>'
  ).join('') + semDados.map(nome =>
    '<li class="sem-dados"><span>' + nome + '</span><span>sem dados do IBGE</span></li>'
  ).join('');

  return semDados;
}

function montarNotasAlimento(alimento, semDados) {
  // (o aviso sobre a escolha do item fica em destaque no topo da tela: veja mostrarAlimento)
  let notas = '';
  if (semDados.length > 0) {
    notas += '<p>Sem dados do IBGE para este item em: <strong>' + semDados.join(', ') + '</strong>. ' +
      'Nessas áreas, a tabela do IBGE mostra o símbolo "-" em vez de um número, ' +
      'por isso elas não aparecem no gráfico nem têm valor na lista.</p>';
  }
  // conta as áreas pelo tipo, a partir dos dados
  const nRM = IPCA.locais.filter(l => l.nivel.startsWith('Região Metropolitana')).length;
  const nMun = IPCA.locais.filter(l => l.nivel === 'Município').length;
  notas += '<p>O IPCA é pesquisado em ' + nRM + ' regiões metropolitanas e ' + nMun + ' municípios, e não em regiões ' +
    'inteiras do Brasil. Por isso o gráfico mostra cada área separada, agrupada pela região do país a que pertence. ' +
    'Os nomes das regiões metropolitanas são os oficiais do IBGE.</p>';
  document.getElementById('notas-alimento').innerHTML = notas;
}
