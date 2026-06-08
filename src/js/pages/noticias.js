export function renderNoticiasPage() {
  return `
    <section class="hero-noticias">
      <h1>Notícias</h1>
      <p>Fique por dentro de tudo que acontece na Pelu&Cia</p>
    </section>

    <section class="noticia-destaque">
      <div class="imagem-destaque">
        <img class="foto-principal" src="/images/noticias/pexels-delot-31440943.webp" alt="Cachorro resgatado">
      </div>

      <div class="texto-destaque">
        <span class="categoria-azul">Resgate</span>
        <h2>Resgate bem-sucedido no centro de Quixadá</h2>
        <p>
          Nossa equipe realizou mais um resgate importante, salvando 3 cachorrinhos
          que estavam em situação de risco.
        </p>
        <p class="data">5 de abril de 2026 | Equipe Pelu&Cia</p>
        <a href="#" class="btn-azul">Ler mais →</a>
      </div>
    </section>

    <section class="ultimas-noticias">
      <h2>Últimas notícias</h2>

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

      <div class="card-noticia">
        <img class="foto-infraestrutura" src="/images/noticias/pexels-karola-g-5713361.webp" alt="Abrigo para animais">
        <div class="card-texto">
          <span class="categoria">Infraestrutura</span>
          <h3>Novo abrigo: expansão das instalações</h3>
          <p class="data">1 de março de 2026</p>
          <p>
            Com apoio da comunidade, expandimos nosso abrigo para acolher
            mais 20 animais.
          </p>
          <a href="#" class="btn-card">Ler mais →</a>
        </div>
      </div>
    </section>
  `;
}
