<!doctype html>
<html lang="pt-br">
  <head>
    <title>Painel financeiro</title>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1,
      shrink-to-fit=no">
    <meta name="description" content="Painel financeiro para gerenciamento de
      suas finanças">
      <link rel="icon" type="image/x-icon" href="assets/img/favicon.ico">
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
      crossorigin="anonymous">
    <link rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css">
    <link rel="stylesheet" type="text/css"
      href="https://cdn.jsdelivr.net/npm/toastify-js/src/toastify.min.css">
    <link rel="stylesheet" href="assets/css/main.css">
    <script src="https://www.google.com/recaptcha/api.js" async defer></script>
  </head>
  <body>
    <main>
      <section class="page-app" id="login">
        <div class="container">
          <div class="row">
            <div class="col-5 mx-auto">
              <div class="box-info">
                <h2>Bem-vindo(a)! </h2>
                <p>Este aplicativo é para o controle de suas finanças, permitindo-lhe registrar contas a pagar e organizá-las em grupos: Pendentes, Vencendo Hoje e Vencidas.</p>
                <p>Se é a sua primeira vez aqui, clique em "Cadastrar" e preencha o formulário. <span>As informações podem ser fictícias e nós não armazenaremos nenhuma informação.</span></p>
              </div>
              <ul>
                <li>
                  <button class="btn-menu-login active" id="btn-formLogin">Login</button>
                </li>
                <li>
                  <button class="btn-menu-login" id="btn-formCadastro">Cadastrar</button>
                </li>
              </ul>
              
              <form action="" class="form-login" id="formCadastro">
                <div class="form-group">
                  <input type="text" required name="nomeCadastro"
                    id="nomeCadastro" placeholder="Nome">
                </div>
                <div class="form-group">
                  <input type="text" required name="usuarioCadastro"
                    id="usuarioCadastro" placeholder="Usuário">
                </div>
                <div class="form-group">
                  <input type="email" autocomplete="email" required
                    name="emailUsuarioCadastro"
                    id="emailUsuarioCadastro"
                    placeholder="Email">
                </div>
                <div class="form-group">
                  <input type="text" name="imagemUsuarioCadastro"
                    placeholder="Insira um link de uma imagem"
                    id="imagemUsuarioCadastro">
                </div>
                <div class="form-group">
                  <input type="password" autocomplete="current-password"
                    required
                    name="senhaUsuarioCadastro"
                    id="senhaUsuarioCadastro"
                    placeholder="Senha">
                </div>
                <div class="form-group-full">
                  <button type="submit">Cadastrar</button>
                </div>
              </form>
              <form action="" class="form-login active" id="formLogin">
                <div class="form-group">
                  <input type="email" autocomplete="email" required
                    name="emailUsuario"
                    id="emailUsuario" placeholder="Email">
                </div>
                <div class="form-group">
                  <input type="password" autocomplete="current-password"
                    required name="senhaUsuario"
                    id="senhaUsuario"
                    placeholder="Senha">
                </div>
                <div class="form-group">
                  <div class="g-recaptcha" data-sitekey="6Le-YUMkAAAAAOekaqloONb-PA517OYsR2Fr754T"></div>
                </div>
                <p id="warning">Usuário ou senha incorretos</p>
                <div class="form-group-full">
                  <button type="submit">Entrar</button>
                  <div class="spinner-loading">
                    <img src="assets/img/loading.svg" alt="">
                  </div>
                </div>
              </form>

            </div>
          </div>
        </div>
      </section>
      <section class="page-app" id="dashboard">
        <div class="container-fluid px-lg-0">
          <div class="row">
            <div class="col-lg-2 pe-lg-0 menu-lateral">
              <h1>Meu painel financeiro</h1>
              <div class="hamburguer">
                <div class="line"></div>
                <div class="line"></div>
                <div class="line"></div>
              </div>
              
              <nav id="nav-lateral">
                <div class="usuarioPainel">
                  <img id="usuarioImagem" src="assets/img/user.png" alt="">
                  <p id="usuarioNome"></p>
                </div>

                <ul id="listaNavegacao">
                  <li><a href="" class="btn-painel " id="btnModalCadastro"><i
                        class="fa-solid
                        fa-square-plus"></i> Nova conta</a></li>
                </ul>
                <ul id="listaSocial">
                  <li>  <a href="https://devictormedeiros.com" target="_blank" rel="noopener noreferrer"><i class="fa-solid fa-desktop"></i> Portfólio</a></li>
                  <li> <a href="https://github.com/devictormedeiros/painel-financeiro" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-github"></i> GitHub</a></li>
                </ul>
                <button class="btn-sair" onclick="loggout()"><i class="fa-sharp
                    fa-solid fa-arrow-right-from-bracket"></i>Sair</button>
              </nav>
            </div>
            <div class="col-lg-10 ps-lg-0">
              <div class="top-bar">
                <a href="https://devictormedeiros.com" target="_blank" rel="noopener noreferrer"><i class="fa-solid fa-desktop"></i> Portfólio</a>
                    <a href="https://github.com/devictormedeiros/painel-financeiro" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-github"></i> GitHub</a>
              </div>
              <div class="painel">
                <div class="page-internal" id="painelSecLista">
                  <div id="sec-contas">
                    <table id="tableContas">
                      <thead>
                        <tr>
                          <td>Nome da conta</td>
                          <td>Valor</td>
                          <td>Vencimento</td>
                          <td>Taxa de Juros</td>
                          <td>Valor c/ Juros</td>
                          <td>Status</td>
                          <td>Ações</td>
                        </tr>
                      </thead>
                      <tbody id="listaContas">

                      </tbody>
                    </table>
                    <table>
                      <thead>
                        <tr>
                          <td>Valor total</td>
                        </tr>
                      </thead>
                      <tbody id="status-financeiro">
                        <tr>
                          <td id="valor-total"></td>
                        </tr>

                      </tbody>
                    </table>
                  </div>
                  <div class="sec-videos">
                    <div class="lista-videos row">
                      <div class="col-lg-12">
                        <h3><i class="fa-solid fa-sack-dollar"></i>Para te ajudar
                          na organização:</h3>
                      </div>
                      <div class="video col-md-4">
                        <iframe src="https://www.youtube.com/embed/W2N_TqJzFns"
                          title="YouTube video player" frameborder="0"
                          allow="accelerometer; autoplay; clipboard-write;
                          encrypted-media; gyroscope; picture-in-picture;
                          web-share" allowfullscreen></iframe>
                      </div>
                      <div class="video col-md-4">
                        <iframe width="560" height="315"
                          src="https://www.youtube.com/embed/dSLhykOui3Y"
                          title="YouTube video player" frameborder="0"
                          allow="accelerometer; autoplay; clipboard-write;
                          encrypted-media; gyroscope; picture-in-picture;
                          web-share" allowfullscreen></iframe>
                      </div>
                      <div class="video col-md-4">
                        <iframe width="560" height="315"
                          src="https://www.youtube.com/embed/JP24jc7pXq8"
                          title="YouTube video player" frameborder="0"
                          allow="accelerometer; autoplay; clipboard-write;
                          encrypted-media; gyroscope; picture-in-picture;
                          web-share" allowfullscreen></iframe>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>
        <div class="modal" id="modalCadastro">

          <div class="modal-content">
            <button class="close">X</button>
            <form action="" id="form">
              <div class="form-group">
                <input type="text" required name="name" id="name"
                  placeholder="Nome da Conta">
              </div>
              <div class="form-group">
                <input type="text" required name="valorConta"
                  id="valorConta"
                  placeholder="Valor da conta">
              </div>
              <div class="form-group">
                <input type="number" required name="taxaDeJuros"
                  id="taxaDeJuros"
                  placeholder="Qual a taxa de juros por mês de atraso? (%)">
              </div>
              <div class="form-group">
                <input type="date" required name="vencimentoConta"
                  id="vencimentoConta">
              </div>
              <div class="form-group-full">
                <button type="submit">Cadastrar</button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </body>
    <footer>
      <?php 
      $recaptcha_secret = "6Le-YUMkAAAAAH97dWLhwd2KS_2Zb_zDvhlzHQ8j";
$response = $_POST["g-recaptcha-response"];
$url = "https://www.google.com/recaptcha/api/siteverify?secret=$recaptcha_secret&response=$response";
$verify = file_get_contents($url);
$captcha_success=json_decode($verify);
if ($captcha_success->success==false) {
    echo '<script>localstorage.setItem('.$captcha_success.')</script>';
}
?>
      <!-- Option 1: Bootstrap Bundle with Popper -->
      <script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
        crossorigin="anonymous"></script>

      <script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>
      <script type="text/javascript"
        src="https://cdn.jsdelivr.net/npm/toastify-js"></script>
      <script
        src="https://cdn.jsdelivr.net/npm/luxon@3.1.1/build/global/luxon.min.js"></script>
      <script
        src="https://unpkg.com/just-validate@latest/dist/just-validate.production.min.js"></script>
      <script
        src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js"
        integrity="sha512-E8QSvWZ0eCLGk4km3hxSsNmGWbLtSCSUcewDQPQWZF6pEU8GlT8a5fF32wOl1i8ftdMhssTrF/OhyGWwonTcXA=="
        crossorigin="anonymous" referrerpolicy="no-referrer"></script>
      <script src="assets/js/main.js"></script>
      <script src="assets/js/contas.js"></script>
      <script src="assets/js/interface.js"></script>
      <script src="assets/js/usuarios.js"></script>

    </footer>
  </html>
