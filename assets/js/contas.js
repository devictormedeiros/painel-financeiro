

var contas = []; //inicializando um array de contas vazio
const contasGetJson = JSON.parse(localStorage.getItem('contas')); // pegando os dados JSON do localstorage
const formularioConta = document.getElementById('form'); // guardando o formulário
const listaContas = document.getElementById('listaContas'); // guardando o lista html
const calcularValorTotalHtml = document.getElementById('valor-total');// guardando o box de total de contas html
const secContas = document.getElementById('sec-contas'); // pega a div html "sec-contas"
var id = 0; // começa com id = 0 para cada item ele somar +1
const DateTime = luxon.DateTime; // start no Datetime
const dataAtual = DateTime.now(); // pegar a hora atual
const validateForm = new window.JustValidate(formularioConta, { focusInvalidField: true }); // colocando a variavel formulario numa função do Just validade para validar o formulario depois
//guardando o aviso toastify numa variavel avisoSucesso
const avisoSucesso = Toastify({
  text: "Conta adicionada",
  duration: 2000,
  close: true,
  gravity: "top", // `top` or `bottom`
  position: "right", // `left`, `center` or `right`
  stopOnFocus: true, // Prevents dismissing of toast on hover
  style: {
    background: "#2EB67D",
  }
});


// criando a classe contas e seus atributos
class Conta {
  constructor(nome, valor, vencimento, taxa, data, status) {
    this.id = id++;
    this.nome = nome
    this.valor = parseFloat(valor)
    this.taxa = parseFloat(taxa)
    this.dataAdd = data
    this.vencimento = vencimento
    this.status = status ? status : this.statusVencimento()
  }
  get getValorJuros() {
    return this.taxaDeJuros();
  }
  get getFormatarDataVencimento() {

    return this.formatarDataVencimento();
  }
  taxaDeJuros() {
    const valorJuros = (this.taxa / 100) * this.valor;
    return valorJuros + this.valor;
  }
  formatarDataVencimento() {
    return this.formatDate(this.vencimento);
  }
  formatDate(date) {
    return new Date(date).toLocaleDateString("pt-BR", { timeZone: 'UTC' });
  }
  statusVencimento() {
    let dataValor = new Date(this.vencimento);
    let dataAtual = new Date();
    let diferencaData = dataValor.getTime() - dataAtual.getTime();
    let diferencaDiasFloat = diferencaData / (1000 * 3600 * 24);
    let statusVencimento = 0
    if (diferencaDiasFloat < (-1)) {
      statusVencimento = 1 // vencida
    }
    else if (diferencaDiasFloat < 0) {
      statusVencimento = 2 // vence hoje
    }
    else if (diferencaDiasFloat > 0) {
      statusVencimento = 3 // pendente
    }
    return statusVencimento;
  }
  calcularDiasVencimento() {
    let dataValor = new Date(this.vencimento);
    let dataAtual = new Date();
    let diferencaData = dataValor.getTime() - dataAtual.getTime();
    let diferencaDias = diferencaData / (1000 * 3600 * 24);
    return diferencaDias;
  }
}

// se tiver um JSON no localStorage 
if (contasGetJson && contasGetJson.length) {
  contas = contasGetJson.map(conta => new Conta(conta.nome, conta.valor, conta.vencimento, conta.taxa, dataAtual, conta.status));
  renderizarHtml(contas);
  calcularValorTotal(contas);
  } else {
  secContas.style.display = "none";
  }


// função pra trazer o valor total 
function calcularValorTotal(arrContas) {
let soma = 0;
arrContas.forEach(conta => {
soma += conta.valor;
});
calcularValorTotalHtml.innerHTML =`R$ ${soma.toFixed(2)}`;
}

// função pra renderizar o HTML 
function renderizarHtml(arrayContas) {
  const contasOrdenadas = arrayContas.sort((a, b) => a.status - b.status);
  listaContas.innerHTML = '';
  secContas.style.display = 'flex';

  contasOrdenadas.forEach(conta => {
    const itemHTML = document.createElement('tr');
    let statusVencimento = conta.status;
    let mensagemVencimento = '';

    itemHTML.classList.add(`status_${statusVencimento}`);
    switch (statusVencimento) {
      case 1:
        mensagemVencimento = 'Vencida';
        break;
      case 2:
        mensagemVencimento = 'Vence Hoje';
        break;
      case 3:
        mensagemVencimento = 'Pendente';
        break;
        case 4:
          mensagemVencimento = 'Paga';
          break;
      default:
        console.error('Um erro encontrado');
    }

    itemHTML.innerHTML = `
      <td> ${conta.nome} </td>
      <td> R$${conta.valor} </td>
      <td> ${conta.getFormatarDataVencimento} </td>
      <td> ${conta.taxa}% </td>
      <td> R$${conta.getValorJuros} </td>
      <td class="${statusVencimento === 1 ? 'status-vencida' : ''}"> ${mensagemVencimento} </td>
      <td>
        <button class="btn-finalizar" title="Pagar" onClick="finalizarConta(${conta.id})" data-id="${conta.id}">
          <i class="fa-solid fa-check"></i>
        </button>
        <button class="btn-delete" onClick="excluirConta(${conta.id})" data-id="${conta.id}" title="Delete">
          <i class="fa-solid fa-trash"></i>
        </button>
      </td>
    `;

    listaContas.append(itemHTML);
  });
}



// função que recebe o ID da conta e exclui a conta especifica (TRABALHANDO NELA AINDA)
function excluirConta(idConta) {
  contas = contas.filter(conta => conta.id !== idConta);
  localStorage.setItem('contas', JSON.stringify(contas));
  contas.length ? renderizarHtml(contas) : secContas.style.display = 'none';
}


function finalizarConta(idConta) {
  let contaEncontrada = false;
  // Percorre o array de contas procurando a conta com o id especificado
  for (let conta of contas) {
    if (conta.id === idConta) {
      conta.status = 4;
      contaEncontrada = true;
      break;
    }
  }
  // Verifica se a conta foi encontrada
  if (!contaEncontrada) {
    console.error(`Conta com id ${idConta} não encontrada.`);
    return;
  }
  // Atualiza o armazenamento
  localStorage.setItem('contas', JSON.stringify(contas));
  // Renderiza o HTML
  renderizarHtml(contas);
}

// função para resetar os campos do formulario 
function resetarCampos(formularioHTML) {
  formularioHTML.reset();
}
// aplicando mascara no input de valor
// const input = document.getElementById("valorConta");
// input.addEventListener("input", function(event) {
//   let value = event.target.value;
//   value = value
//     .replace(/\D/g, "")
//     .replace(/(\d{1,2})$/, ",$1")
//     .replace(/(?=(\d{3})+(\D))/g, ".")
//     .replace(/(\D)$/, "$100");
  
//   event.target.value = value;
// });

// função usada sempre para cadastro de contas  
function enviarFormulario(e) {
  e.preventDefault();
  const nomeConta = document.getElementById('name');
  const valorConta = document.getElementById('valorConta');
  const taxaDeJuros = document.getElementById('taxaDeJuros');
  const vencimentoContaByInput = document.getElementById('vencimentoConta');
  
  const vencimentoConta = new Date(vencimentoContaByInput.value);
  const status = null;
  const minhaConta = new Conta(nomeConta.value, valorConta.value, vencimentoConta, taxaDeJuros.value, dataAtual, status);

  contas.push(minhaConta);
  localStorage.setItem('contas', JSON.stringify(contas));
  renderizarHtml(contas);
  calcularValorTotal(contas);
  resetarCampos(formularioConta);
  avisoSucesso.showToast();
}

validateForm
  .addField('#name', [
    {
      rule: 'required',
      errorMessage: 'Nome é obrigatório'
    },
  ])
  .addField('#valorConta', [
    {
      rule: 'required',
      errorMessage: 'Valor é obrigatório'
    },

  ])
  .addField('#taxaDeJuros', [
    {
      rule: 'required',
      errorMessage: 'Taxa de juros é obrigatória'
    },
    {
      rule: 'number',
      errorMessage: 'Taxa de juros precisa ser numérico'
    }
  ])
  .addField('#vencimentoConta', [
    {
      rule: 'required',
      errorMessage: 'Vencimento é obrigatório'
    },
  ])
  .onSuccess((event) => {
    let modalCadastro = document.getElementById('modalCadastro');
    enviarFormulario(event);

    modalCadastro.classList.remove('open');
  });



