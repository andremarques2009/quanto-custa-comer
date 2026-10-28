/*
  util.js — funções de ajuda usadas por todas as telas do app.

  Regra do projeto: TODO número mostrado vem dos arquivos de dados
  (pasta data/). Estas funções só formatam os números, sem mudar o valor.
*/

// Cores (as mesmas do style.css)
const COR_DESTAQUE = '#b4451f'; // terracota
const COR_NEUTRA = '#6b7480';
const COR_TEXTO = '#1d232a';
const COR_GRADE = '#e6e6df';

// Cores para várias linhas no mesmo gráfico (uma por cidade)
const CORES_LINHAS = ['#b4451f', '#0072b2', '#009e73', '#cc79a7', '#e69f00'];

const MESES_CURTOS = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];
const MESES_LONGOS = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho',
  'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];

// "2025-01" -> "jan/2025"
function mesCurto(anoMes) {
  const [ano, mes] = anoMes.split('-');
  return MESES_CURTOS[Number(mes) - 1] + '/' + ano;
}

// "2025-01" -> "janeiro de 2025"
function mesLongo(anoMes) {
  const [ano, mes] = anoMes.split('-');
  return MESES_LONGOS[Number(mes) - 1] + ' de ' + ano;
}

// 851.82 -> "R$ 851,82" (sempre com 2 casas, como nas publicações)
function reais(valor) {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

// 60.66 -> "60,66%" (sempre com 2 casas, como nas publicações)
function porcento(valor) {
  return valor.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + '%';
}

// 3.5 -> "+3,50%" e -2.1 -> "-2,10%" (mostra o sinal de mais nas altas)
function porcentoComSinal(valor) {
  return (valor > 0 ? '+' : '') + porcento(valor);
}

// 7.5 -> "7,5" (sem acrescentar zeros)
function numero(valor) {
  return valor.toLocaleString('pt-BR');
}

// Nomes compridos viram duas linhas nos gráficos
// ("carne bovina de primeira" -> ["carne bovina", "de primeira"])
function quebrarNome(nome) {
  if (nome.length <= 16) return nome;
  const palavras = nome.split(' ');
  const meio = Math.ceil(palavras.length / 2);
  return [palavras.slice(0, meio).join(' '), palavras.slice(meio).join(' ')];
}

// Primeira letra maiúscula: "batata" -> "Batata"
function maiuscula(texto) {
  return texto.charAt(0).toUpperCase() + texto.slice(1);
}

// Configurações gerais dos gráficos (fonte do sistema, tamanho legível no projetor)
Chart.defaults.font.family = 'system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif';
// No computador/projetor as letras dos gráficos são maiores; no celular, menores para caber
const TELA_PEQUENA = window.innerWidth < 760;
Chart.defaults.font.size = TELA_PEQUENA ? 13 : 16;
// tamanho dos textos escritos dentro dos gráficos (ex.: "Maior: R$ ...")
const TAMANHO_ROTULO = TELA_PEQUENA ? 12 : 15;
Chart.defaults.color = COR_TEXTO;
Chart.defaults.maintainAspectRatio = false; // a altura vem do CSS
