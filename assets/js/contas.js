

var contas = []; //inicializando um array de contas vazio
const contasGetJson = JSON.parse(localStorage.getItem('contas')); // pegando os dados JSON do localstorage
const formularioConta = document.getElementById('form'); // guardando o formulário
const listaContas = document.getElementById('listaContas'); // guardando o lista html
const valorTotalHtml = document.getElementById('valor-total');// guardando o box de total de contas html
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
  constructor(nome, valor, vencimento, taxa, data) {
    this.id = id++;
    this.nome = nome
    this.valor = parseFloat(valor)
    this.taxa = parseFloat(taxa)
    this.dataAdd = data
    this.vencimento = vencimento
  }
  get getValorJuros() {
    return this.taxaDeJuros();
  }
  get getStatusVencimento() {
    return this.statusVencimento();
  }
  get getFormatarDataVencimento() {

    return this.formatarDataVencimento();
  }
  taxaDeJuros() {
    const valorJuros = (this.taxa * this.valor) / 100;
    const valorFinalJuros = valorJuros + this.valor;
    return valorFinalJuros
  }
  formatarDataVencimento() {
    let dataValor = new Date(this.vencimento);
    let dataFormatada = dataValor.toLocaleDateString('pt-BR', { timeZone: 'UTC' });
    return dataFormatada;
  }
  statusVencimento() {
    let dataValor = new Date(this.vencimento);
    let dataAtual = new Date();
    let diferencaData = dataValor.getTime() - dataAtual.getTime();
    let diferencaDiasFloat = diferencaData / (1000 * 3600 * 24);
    let statusVencimento = 0
    if (diferencaDiasFloat < (-1)) {
      statusVencimento = 2 // vencida
    }
    else if (diferencaDiasFloat < 0) {
      statusVencimento = 1 // vence hoje
    }
    else if (diferencaDiasFloat > 0) {
      statusVencimento = 0 // pendente
    }
    return statusVencimento;
  }
  calcularDiasVencimento(){
    let dataValor = new Date(this.vencimento);
    let dataAtual = new Date();
    let diferencaData = dataValor.getTime() - dataAtual.getTime();
    let diferencaDiasFloat = diferencaData / (1000 * 3600 * 24);
    return diferencaDiasFloat;
  }
}

// se tiver um JSON no localStorage 
if ((contasGetJson != null) && (contasGetJson.length > 0)) {
  contasGetJson.forEach(conta => {

    const classConta = new Conta(conta.nome, conta.valor, conta.vencimento, conta.taxa, dataAtual);
    contas.push(classConta);
  });
  renderizarHtml(contas)
  ValorTotal(contas);
} else {
  secContas.style.display = "none"; //se não tiver dados no JSON ele dá display none na linha da tabela html
}


// função pra trazer o valor total 
function ValorTotal(ArrContas) {
  let soma = 0;
  for (i = 0; i < ArrContas.length; i++) {
    soma += ArrContas[i].valor
  }
  valorTotalHtml.innerHTML = `R$ ${soma}`;
}


// função pra renderizar o HTML 
function renderizarHtml(arrayContas) {
  
  arrayContas.sort(function (a, b) {
    return a.calcularDiasVencimento() - b.calcularDiasVencimento();
  });
  listaContas.innerHTML = ""; // limpa toda a lista para depois construir denovo
  secContas.style.display = "flex"; //se tiver dados no JSON ele dá display flex na linha da tabela html
  arrayContas.forEach(conta => {
    const itemHtml = document.createElement('tr'); // para cada conta, ele cria um <tr> na tabela html
    let statusVencimento = conta.getStatusVencimento;
    itemHtml.classList.add('status_' + statusVencimento);
    switch (statusVencimento) {
      case 0:
        mensagemVencimento = 'Pendente';
        break;
      case 1:
        mensagemVencimento = 'Vence Hoje';
        break;
      case 2:
        mensagemVencimento = 'Vencida';
        break;
      default:
        console.log('Ocorreu um erro');
    }
    itemHtml.innerHTML = `<td> ${conta.nome}</td><td> R$${conta.valor} </td><td> ${conta.getFormatarDataVencimento} </td><td> ${conta.taxa}% </td><td> R$${conta.getValorJuros} </td><td class="${statusVencimento == 2 ? 'status-vencida' : ''}"> ${mensagemVencimento}</td><td><button class="btn-finalizar" title="Pagar" onClick="finalizarConta(${conta.id})" data-id="${conta.id}" class="btn-cadastro"><i class="fa-solid fa-check"></i></button><button class="btn-delete" onClick="excluirConta(${conta.id})" data-id="${conta.id}" title="Excluir" class="btn-cadastro"><i class="fa-solid fa-trash"></i></button></td>`; // cria um HTML ja com os dados impressos
    listaContas.append(itemHtml); // constroe a lista html denovo, mas agora com o itemHtml dentro
  });
}



// função que recebe o ID da conta e exclui a conta especifica (TRABALHANDO NELA AINDA)
function excluirConta(idConta) {
  let lists = contas.filter(x => {
    return x.id != idConta;
  })
  contas = lists;
  const contasJSON = JSON.stringify(lists);
  localStorage.setItem('contas', contasJSON);
  if (contas != '') {
    renderizarHtml(contas);
  } else {
    secContas.style.display = "none"; //se não tiver dados no JSON ele dá display none na linha da tabela html
  }
}

function finalizarConta(idConta) {
  let lists = contas.filter(x => {
    return x.id != idConta;
  })
  contas = lists;
  const contasJSON = JSON.stringify(lists);
  localStorage.setItem('contas', contasJSON);
  if (contas != '') {
    renderizarHtml(contas);
  } else {
    secContas.style.display = "none"; //se não tiver dados no JSON ele dá display none na linha da tabela html
  }
}

// função para resetar os campos do formulario 
function resetarCampos(formularioHTML) {
  const todosCampos = formularioHTML.elements;
  [...todosCampos].forEach((element) => {
    element.value = "";
  });
}

// função usada sempre para cadastro de contas  
function enviarFormulario(e) {
  e.preventDefault(); // tira ação padrao do formulario
  const nomeConta = document.getElementById('name');// pega o elemento do formulario
  const valorConta = document.getElementById('valorConta');// pega o elemento do formulario
  const taxaDeJuros = document.getElementById('taxaDeJuros');// pega o elemento do formulario
  const vencimentoContaByInput = document.getElementById('vencimentoConta'); // pega o elemento do formulario
  const vencimentoConta = new Date(vencimentoContaByInput.value) // pega o valor que veio do input de data e tranforma ela realmente numa data
  const minhaConta = new Conta(nomeConta.value, valorConta.value, vencimentoConta, taxaDeJuros.value, dataAtual); // guardando a conta criada numa variavel minhaConta

  contas.push(minhaConta); // pega a nova conta criada "minhaConta" e adiciona ela no array contas
  const contasJSON = JSON.stringify(contas); // converte o array de contas para um JSON
  localStorage.setItem('contas', contasJSON);  // adiciona o JSON numa key contas no localStorage
  renderizarHtml(contas); // cria o html
  ValorTotal(contas); // aciona a função para somar o total
  resetarCampos(formularioConta); // chama a função para resetar os campos
  avisoSucesso.showToast(); // solta o aviso toastify que configuramos lá em cima
}

validateForm
  .addField('#name', [
    {
      rule: 'required',
      errorMessage: 'O campo não pode ficar vazio'
    },
  ])
  .addField('#valorConta', [
    {
      rule: 'required',
      errorMessage: 'O campo não pode ficar vazio'
    },

  ])
  .addField('#taxaDeJuros', [
    {
      rule: 'required',
      errorMessage: 'O campo não pode ficar vazio'
    },
  ])
  .addField('#vencimentoConta', [
    {
      rule: 'required',
      errorMessage: 'O campo não pode ficar vazio'
    },
  ])
  .onSuccess((event) => {
    let modalCadastro = document.getElementById('modalCadastro');
    enviarFormulario(event); // aciona a função que trata o formulario
    
    modalCadastro.classList.remove('open');
  });


