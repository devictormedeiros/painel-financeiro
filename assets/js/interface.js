
const btnFormCadastro = document.getElementById('btn-formCadastro');
const btnFormLogin = document.getElementById('btn-formLogin');
const FormCadastro = document.getElementById('formCadastro');
const formLogin = document.getElementById('formLogin');
const btnPainel = document.querySelectorAll('a.btn-painel');


// MODAL CADASTRO 
const modalCadastro = document.getElementById('modalCadastro');
const btnModalCadastro = document.getElementById('btnModalCadastro');
const closeModal = document.querySelector('.modal .close')

function loggout(e) {
    localStorage.removeItem('usuarioLogado');
    location.reload();
}

btnFormCadastro.addEventListener('click', event => {
    event.preventDefault();
    btnFormCadastro.classList.add('active')
    FormCadastro.classList.add('active')
    formLogin.classList.remove('active')
    btnFormLogin.classList.remove('active')
})

btnFormLogin.addEventListener('click', event => {
    event.preventDefault();
    btnFormLogin.classList.add('active')
    btnFormCadastro.classList.remove('active')
    formLogin.classList.add('active')
    FormCadastro.classList.remove('active')
})
btnModalCadastro.addEventListener('click', event => {
    event.preventDefault();
    modalCadastro.classList.add('open')

});
closeModal.addEventListener('click', event => {
    event.preventDefault();
    let formularioContaModal = document.getElementById('form'); 
    resetarCampos(formularioContaModal);
    modalCadastro.classList.remove('open')

})

const hamburguer = document.querySelector('.hamburguer');
const menuNavegacao = document.querySelector('#nav-lateral');

hamburguer.addEventListener('click', () => {
  hamburguer.classList.toggle('change');
  menuNavegacao.classList.toggle('show');
});

// btnPainel.forEach(el =>
//     el.addEventListener('click', event => {
//         event.preventDefault();
//         let dataPainel = event.target.dataset.page;
//         painelSec.forEach((element) => {
//             element.classList.remove('active');
//           });
//         document.getElementById(dataPainel).classList.add('active')
//     })
// )

// closeModal.addEventListener