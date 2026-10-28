/*
  fontes.js — aba "Fontes": lista de onde veio cada número e cada foto.
*/

let fontesIniciadas = false;

function iniciarFontes() {
  if (fontesIniciadas) return; // só monta uma vez
  fontesIniciadas = true;

  // ----- IPCA (IBGE) -----
  const listaItens = IPCA.alimentos.map(a =>
    '<li><strong>' + maiuscula(a.nome) + '</strong>: ' + a.itens_ipca.map(i => i.nome).join(' e ') + '</li>'
  ).join('');
  document.getElementById('fontes-ipca').innerHTML =
    '<p>' + IPCA.fonte + ', de ' + mesLongo(MESES_IPCA[0]) + ' a ' + mesLongo(ULTIMO_MES_IPCA) +
    '. Dados baixados em ' + IPCA.baixado_em.split('-').reverse().join('/') + '.</p>' +
    '<ul class="lista-fontes">' +
    '<li>Tabela: <a href="' + IPCA.link_tabela + '" target="_blank" rel="noopener">' + IPCA.link_tabela + '</a></li>' +
    '<li>Consulta usada: <a href="' + IPCA.consulta_api + '" target="_blank" rel="noopener">' + IPCA.consulta_api + '</a></li>' +
    '</ul>' +
    '<p>Item do IPCA usado para cada alimento da cesta:</p><ul class="lista-fontes">' + listaItens + '</ul>';

  // ----- Documentos que explicam a escolha dos itens (ex.: metodologia do DIEESE) -----
  document.getElementById('fontes-metodologia').innerHTML = Object.values(IPCA.fontes_observacoes).map(doc =>
    '<li><strong>' + doc.nome + '</strong>, p. ' + doc.pagina + ': <a href="' + doc.link + '" target="_blank" rel="noopener">' +
    doc.link + '</a><br>Trecho: “' + doc.trecho + '”</li>'
  ).join('');

  // ----- DIEESE (cesta básica de São Paulo) -----
  montarFontesDieese();
  // A lista das cópias locais dos PDFs (data/copias-locais.js) só existe no computador
  // de quem tem a pasta fontes/: ela não vai para o GitHub. Por isso só tentamos
  // carregá-la quando o app é aberto do disco (duplo clique no index.html).
  if (location.protocol === 'file:') {
    const script = document.createElement('script');
    script.src = 'data/copias-locais.js';
    script.onload = montarFontesDieese; // achou a lista: monta de novo, com as cópias locais
    document.head.appendChild(script);
  }

  // ----- Salário mínimo -----
  const listaExtra = document.getElementById('lista-fontes-extra');
  DADOS.fontes_complementares.forEach(f => {
    const item = document.createElement('li');
    item.innerHTML = '<strong>' + f.nome + '</strong>: ' + f.assunto + ' (' + reais(f.salario_minimo_reais) + '). ' +
      '<a href="' + f.link + '" target="_blank" rel="noopener">' + f.link + '</a>';
    listaExtra.appendChild(item);
  });

  // ----- Fotos (continua abaixo) -----
  montarFontesFotos();
}

// Lista dos PDFs do DIEESE. O link principal é sempre o endereço oficial;
// o link da cópia local só aparece se o PDF estiver na pasta fontes/ deste computador.
function montarFontesDieese() {
  const copias = window.COPIAS_LOCAIS || []; // vazio na versão publicada
  document.getElementById('texto-fontes-dieese').textContent =
    'Relatórios mensais da ' + DADOS.fonte + '. Os dados vão até ' + rotuloLongo(ULTIMO) +
    '. Cada link leva ao PDF original no site do DIEESE' +
    (copias.length ? '; a cópia local fica na pasta fontes/ do projeto.' : '.');

  const listaFontes = document.getElementById('lista-fontes');
  listaFontes.innerHTML = '';
  REGISTROS.forEach(r => {
    const item = document.createElement('li');
    item.innerHTML = '<strong>' + rotuloLongo(r) + '</strong>: <a href="' + r.link_origem + '" target="_blank" rel="noopener">' +
      r.link_origem + '</a>' +
      (copias.includes(r.arquivo_pdf) ? ' (cópia local: <a href="' + r.arquivo_pdf + '">' + r.arquivo_pdf + '</a>)' : '');
    listaFontes.appendChild(item);
  });
}

function montarFontesFotos() {
  const listaFotos = document.getElementById('lista-fotos');
  const chaves = Object.keys(FOTOS);
  if (chaves.length === 0) {
    listaFotos.innerHTML = '<li>Nenhuma foto cadastrada.</li>';
  }
  IPCA.alimentos.filter(a => FOTOS[a.chave]).forEach(a => {
    const f = FOTOS[a.chave];
    const licenca = f.link_licenca
      ? '<a href="' + f.link_licenca + '" target="_blank" rel="noopener">' + f.licenca + '</a>'
      : f.licenca;
    const item = document.createElement('li');
    item.innerHTML = '<strong>' + maiuscula(a.nome) + '</strong>: ' + f.autor + ', ' + licenca +
      ' (<a href="' + f.pagina_commons + '" target="_blank" rel="noopener">página no Wikimedia Commons</a>)';
    listaFotos.appendChild(item);
  });
}
