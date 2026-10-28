/*
  app.js — navegação entre as telas do app.

  O app tem uma página só (index.html). A parte do endereço depois do "#"
  diz qual tela mostrar, por exemplo:
    #/alimentos         -> grade de alimentos (tela inicial)
    #/alimento/batata   -> tela da batata
    #/cesta             -> cesta × salário
    #/fontes            -> fontes
    #/sobre             -> sobre o projeto
  Isso funciona até abrindo o arquivo com duplo clique, sem servidor.
*/

function mostrarTela(idTela, aba) {
  // esconde todas as telas e mostra só a escolhida
  document.querySelectorAll('.tela').forEach(t => { t.hidden = t.id !== idTela; });
  // marca a aba ativa no menu
  document.querySelectorAll('.abas a').forEach(a => {
    a.classList.toggle('ativa', a.dataset.aba === aba);
  });
  window.scrollTo(0, 0);
}

function rotear() {
  const partes = location.hash.replace('#/', '').split('/'); // "#/alimento/batata" -> ["alimento", "batata"]

  if (partes[0] === 'alimento' && partes[1]) {
    mostrarTela('tela-alimento', 'alimentos');
    mostrarAlimento(decodeURIComponent(partes[1]));
  } else if (partes[0] === 'cesta') {
    mostrarTela('tela-cesta', 'cesta');
    iniciarCesta();
  } else if (partes[0] === 'fontes') {
    mostrarTela('tela-fontes', 'fontes');
    iniciarFontes();
  } else if (partes[0] === 'sobre') {
    mostrarTela('tela-sobre', 'sobre');
  } else {
    mostrarTela('tela-alimentos', 'alimentos');
  }
}

montarGrade();
montarSobrePeriodo();
window.addEventListener('hashchange', rotear);
rotear();
