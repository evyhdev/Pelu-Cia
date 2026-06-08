export function renderSobrePage() {
  return `
    <section class="hero-sobre">
      <h1>Sobre a Pelu&Cia</h1>
      <p>
        Um projeto social da Universidade Federal do Ceará - Campus Quixadá,<br>
        dedicado ao resgate e adoção responsável de animais desde 2021.
      </p>
    </section>

    <section class="nossa-historia">
      <div class="historia-conteudo">
        <div class="historia-texto">
          <h2>Nossa História</h2>
          <p>
            A Pelu&Cia nasceu dentro do campus com um propósito simples, mas muito
            necessário: cuidar dos animais que foram abandonados e viviam entre as aulas.
            Rapidamente, nos deparamos com cães e gatos que precisavam não só de teto,
            mas de muito apoio, cuidado, carinho e, acima de tudo, de um lar.
          </p>
          <p>
            Nossa ação é construída no cuidado com o outro — um gesto que alimenta,
            sustenta e motiva. Trabalhamos para que, em todo momento, sejamos
            responsáveis pelo bem-estar desses animais.
          </p>
          <p>
            Mais do que assistência, o que fazemos é um pontapé inicial para quem
            precisa de ajuda e quem pode oferecer um novo começo. Cada ser é bem
            cuidado e cada decisão realizada transforma caminhos.
          </p>
          <p>
            O campus se tornou um ponto de encontro. O ambiente gerou apoio e cada vez
            mais pessoas e animais encontram aqui uma porta aberta para uma família.
          </p>
        </div>

        <div class="historia-imagem">
          <img src="/images/gato.webp" alt="Gato resgatado pela Pelu&Cia">
        </div>
      </div>
    </section>

    <section class="nosso-impacto">
      <h2>Nosso Impacto</h2>
      <p class="impacto-subtitulo">Ao longo do tempo, a Pelu&Cia vem causando impactos reais dentro do campus.</p>

      <div class="impacto-cards">
        <div class="card-impacto">
          <img src="/icons/visibilidade-sobre.webp" alt="Ícone de visibilidade" class="card-icone">
          <h3>Visibilidade</h3>
          <p>
            Hoje os animais, antes invisíveis, passaram a ser vistos como seres que
            merecem atenção e cuidados em todos os espaços e situações.
          </p>
        </div>

        <div class="card-impacto">
          <img src="/icons/mobilizacao-icon.webp" alt="Ícone de mobilização" class="card-icone">
          <h3>Mobilização</h3>
          <p>
            Conseguimos mobilizar a comunidade acadêmica com impactos reais ao longo
            dos semestres, motivando e transformando a vida dos animais.
          </p>
        </div>

        <div class="card-impacto">
          <img src="/icons/cultura-sobre.webp" alt="Ícone de cultura de cuidado" class="card-icone">
          <h3>Cultura de Cuidado</h3>
          <p>
            Cada membro cultiva uma cultura de cuidado e respeito. Os animais do
            campus recebem cada vez mais atenção, carinho e responsabilidade.
          </p>
        </div>
      </div>
    </section>

    <section class="faca-parte">
      <h2>Faça Parte dessa História</h2>
      <p>
        Seja através de uma doação ou do voluntariado, você pode fazer a diferença
        na vida de um animal que precisa de ajuda.
      </p>
      <div class="faca-parte-botoes">
        <a href="/ajudar" class="btn-dourado">Fazer uma Doação</a>
        <a href="/voluntario" class="btn-contorno-branco">Seja Voluntário</a>
      </div>
    </section>
  `;
}
