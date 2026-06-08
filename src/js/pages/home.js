export function renderHomePage() {
  return `
    <section class="hero-home">
      <div class="container hero-conteudo">
        <div class="hero-texto">
          <h1>Cuidando com amor dos animais do nosso campus</h1>
          <p>
            A Pelu&Cia é um projeto social da UFC - Campus Quixadá dedicado a
            alimentar, vacinar e garantir o bem-estar dos cães e gatos que vivem aqui.
          </p>

          <div class="hero-botoes">
            <a href="/ajudar" class="btn-dourado">
              <img src="/icons/ajudar.webp" alt="">
              Quero Ajudar
            </a>
            <a href="/voluntario" class="btn-contorno-branco">Seja Voluntário</a>
          </div>
        </div>

        <div class="hero-foto">
          <img class="hero-imagem" src="/images/home/pelucia.webp" alt="Animais do campus Quixadá">
        </div>
      </div>
    </section>

    <section class="ultimas-noticias">
      <div class="container">
        <h2>Últimas Notícias</h2>

        <div class="card-noticia">
          <img class="foto-evento" src="/images/noticias/pexels-nandamends-16608221.webp" alt="Feira de adoção">
          <div class="card-texto">
            <span class="categoria">Evento</span>
            <h3>Feira de Adoção no Campus UFC foi um sucesso</h3>
            <p class="data">28 de março de 2026</p>
            <p>
              Evento foi um sucesso! 12 animais encontraram seus lares definitivos
              durante a feira de adoção.
            </p>
            <a href="#" class="btn-card">Ler mais →</a>
          </div>
        </div>

        <div class="card-noticia">
          <img class="foto-historia" src="/images/noticias/pexels-muhammedtubtemur-20744921.webp" alt="Cachorro adotado">
          <div class="card-texto">
            <span class="categoria">História</span>
            <h3>História de Sucesso: Max encontra um lar</h3>
            <p class="data">15 de março de 2026</p>
            <p>
              Conheça a história emocionante de Max, que encontrou uma família
              amorosa após 8 meses no abrigo.
            </p>
            <a href="#" class="btn-card">Ler mais →</a>
          </div>
        </div>

        <div class="card-noticia">
          <img class="foto-saude" src="/images/noticias/pexels-rashi-rashu-2156740634-35587397.webp" alt="Animal sendo cuidado">
          <div class="card-texto">
            <span class="categoria">Saúde</span>
            <h3>Campanha de vacinação beneficia 40 animais</h3>
            <p class="data">8 de março de 2026</p>
            <p>
              Graças às doações, conseguimos vacinar 40 animais contra raiva,
              cinomose e outras doenças.
            </p>
            <a href="#" class="btn-card">Ler mais →</a>
          </div>
        </div>
      </div>
    </section>

    <section class="parceiros">
      <div class="container">
        <div class="titulo-secao">
          <h2>Nossos Parceiros</h2>
          <p>Empresas e instituições que apoiam nossa causa</p>
        </div>

        <div class="parceiros-lista">
          <div class="parceiro-card">Parceiro 1</div>
          <div class="parceiro-card">Parceiro 2</div>
          <div class="parceiro-card">Parceiro 3</div>
          <div class="parceiro-card">Parceiro 4</div>
        </div>
      </div>
    </section>

    <section class="contato">
      <div class="container">
        <div class="titulo-secao">
          <h2>Entre em Contato</h2>
          <p>Tem dúvidas? Quer saber mais sobre o projeto? Envie sua mensagem!</p>
        </div>

        <form class="formulario-contato">
          <label for="name">Nome</label>
          <input type="text" id="name" name="name" required>

          <label for="email">E-mail</label>
          <input type="email" id="email" name="email" required>

          <label for="message">Mensagem</label>
          <textarea id="message" name="message" required></textarea>

          <button type="submit">Enviar Mensagem</button>
        </form>
      </div>
    </section>
  `;
}
