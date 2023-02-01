
try {
    if (typeof localStorage === 'undefined') {
      throw new Error('localStorage não está disponível');
    }
    
    fetch('assets/json/usuarios.json')
      .then((resp) => resp.json())
      .then((dados) => {
        localStorage.setItem('usuarios', JSON.stringify(dados));
      });
  } catch (error) {
    console.error(error);
  }
    
class Usuario {
    constructor(usuario, nome,imagem, email, senha) {
        this.id = ++id
        this.usuario = usuario
        this.nomeUsuario = nome
        this.imagemUsuario = imagem
        this.emailUsuario = email
        this.senha = senha
        
    }
}
var usuarios = [];

const formularioCadastro = document.getElementById('formCadastro');
const loginPageHtml = document.getElementById('login');
const dashboardPageHtml = document.getElementById('dashboard');

const formularioLogin = document.getElementById('formLogin');
const usuariosGetJson = JSON.parse(localStorage.getItem('usuarios')) || [];
const cadastroUsuarioSucesso = Toastify({
    text: "Usuario cadastrado",
    duration: 2000,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
        background: "#2EB67D",
    }
});

const cadastroValidation = new JustValidate('#formCadastro');
var usuarioLogado = localStorage.getItem('usuarioLogado', usuarioLogado) ? JSON.parse(localStorage.getItem('usuarioLogado', usuarioLogado)) : '';

function popularInfoUsuario(usuarioLogado){
    if (usuarioLogado.length > 0) {
        loginPageHtml.style.display = 'none';
        dashboardPageHtml.style.display = 'block';
        const nomeUsuarioPainel = document.getElementById('usuarioNome');
        const imagemUsuarioPainel = document.getElementById('usuarioImagem');
        nomeUsuarioPainel.innerHTML = usuarioLogado[0].nomeUsuario;
        if(usuarioLogado[0].imagemUsuario){
            imagemUsuarioPainel.src = usuarioLogado[0].imagemUsuario
        }
    }
}
popularInfoUsuario(usuarioLogado);





// se tiver um JSON no localStorage 
usuariosGetJson.forEach(usuario => {
    const classUsuario = new Usuario(usuario.usuario, usuario.nomeUsuario,usuario.imagemUsuario, usuario.emailUsuario, usuario.senha);
    usuarios.push(classUsuario);
});


cadastroValidation
    .addField('#nomeCadastro', [
        {
            rule: 'required',
            errorMessage: 'Nome é obrigatório',
        }
    ])
    .addField('#usuarioCadastro', [
        {
            rule: 'required',
            errorMessage: 'Usuário obrigatório',
        }
    ])
    .addField('#senhaUsuarioCadastro', [
        {
            rule: 'required',
            errorMessage: 'Senha obrigatória',
        },
        {
            rule: 'password',
            errorMessage: 'A senha deve conter no mínimo 8 caracteres, pelo menos uma letra e um número'
        }
    ])
    .addField('#emailUsuarioCadastro', [
        {
            rule: 'required',
            errorMessage: 'Email é obrigatório',
        },
        {
            rule: 'email',
            errorMessage: 'Email inválido!',
        },
        {
            validator: (value, fields) => {
                //   if (fields['#password'] && fields['#password'].elem) {
                //     const repeatPasswordValue = fields['#password'].elem.value;

                //     return value === repeatPasswordValue;
                //   }
                let lists = usuarios.filter(x => {
                    return x.emailUsuario === emailUsuarioCadastro.value;
                })
                if (lists.length === 0) {
                    return true;
                } else {
                    return
                }
            },
            errorMessage: 'Esse email já existe',
        },
    ])
    .onSuccess((event) => {
        cadastrarUsuario(); // aciona a função que trata o formulario
    });


// função para resetar os campos do formulario 
function resetarCampos(formularioHTML) {
    formularioHTML.reset();
}

function cadastrarUsuario() {
    const nomeUsuario = document.getElementById("nomeCadastro");
    const usuarioCadastro = document.getElementById("usuarioCadastro");
    const senhaUsuarioCadastro = document.getElementById("senhaUsuarioCadastro");
    const emailUsuarioCadastro = document.getElementById("emailUsuarioCadastro");
    const imagemUsuarioCadastro = document.getElementById("imagemUsuarioCadastro");
  
    const novoUsuario = new Usuario(
      usuarioCadastro.value,
      nomeUsuario.value,
      imagemUsuarioCadastro.value,
      emailUsuarioCadastro.value,
      senhaUsuarioCadastro.value
    );
  
    // Verifica se já existe um usuário com o email informado
    if (!usuarios.some(usuario => usuario.emailUsuario === emailUsuarioCadastro.value)) {
      usuarios.push(novoUsuario);
      const usuariosJSON = JSON.stringify(usuarios);

      localStorage.setItem("usuarios", usuariosJSON);
      resetarCampos(formularioCadastro);
      cadastroUsuarioSucesso.showToast();
    } else {
      emailUsuarioCadastro.value = "";
      // Considera adicionar uma mensagem de erro para o usuário.
    }
  }


formularioLogin.addEventListener('submit', (e) => {
    e.preventDefault();
    const emailUsuario = document.getElementById('emailUsuario');
    const senhaUsuario = document.getElementById('senhaUsuario');

    formularioLogin.classList.add("form-loading");
    setTimeout(() => {
        formularioLogin.classList.remove("form-loading");
    }, 3000)

    login(emailUsuario.value, senhaUsuario.value);
})

function login(emailUsuario, senhaUsuario) {
    let loginCorresp = usuarios.filter(x => {
        if (x.senha === senhaUsuario && x.emailUsuario === emailUsuario) {
            return true
        };
    });
    usuarioLogado = loginCorresp ? JSON.stringify(loginCorresp) : '';

    const pwarning = document.getElementById('warning');

    if (loginCorresp.length === 0) {

        setTimeout(() => {
            pwarning.classList = "show";
        }, 3000)
    } else {
        setTimeout(() => {
            loginPageHtml.style.display = 'none';
            dashboardPageHtml.style.display = 'block';
        
            localStorage.setItem('usuarioLogado', usuarioLogado);
            popularInfoUsuario(loginCorresp);
        }, 3000)
    }
}