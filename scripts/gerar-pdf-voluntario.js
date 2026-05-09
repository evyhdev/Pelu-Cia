import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const outputDir = path.join(__dirname, "..", "docs");
const outputFile = path.join(outputDir, "explicacao-voluntario.pdf");

function cleanText(text) {
  return text
    .replace(/[“”]/g, '"')
    .replace(/[‘’]/g, "'")
    .replace(/[–—]/g, "-")
    .replace(/→/g, "->");
}

function pdfEscape(text) {
  return cleanText(text).replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
}

function wrapText(text, maxChars) {
  const words = cleanText(text).split(/\s+/);
  const lines = [];
  let line = "";

  for (const word of words) {
    if (!word) continue;
    const next = line ? `${line} ${word}` : word;
    if (next.length > maxChars && line) {
      lines.push(line);
      line = word;
    } else {
      line = next;
    }
  }

  if (line) lines.push(line);
  return lines;
}

class SimplePdf {
  constructor() {
    this.pages = [];
    this.current = [];
    this.y = 780;
    this.margin = 54;
    this.width = 612;
    this.height = 792;
    this.addPage();
  }

  addPage() {
    if (this.current.length) {
      this.pages.push(this.current.join("\n"));
    }

    this.current = [];
    this.y = 780;
  }

  ensureSpace(space) {
    if (this.y - space < 52) {
      this.addPage();
    }
  }

  text(line, size = 11, x = this.margin, leading = 15) {
    this.ensureSpace(leading + 4);
    this.current.push(`BT /F1 ${size} Tf ${x} ${this.y} Td (${pdfEscape(line)}) Tj ET`);
    this.y -= leading;
  }

  paragraph(text, size = 11, maxChars = 88, leading = 15) {
    const lines = wrapText(text, maxChars);
    for (const line of lines) {
      this.text(line, size, this.margin, leading);
    }
    this.y -= 6;
  }

  title(text) {
    this.ensureSpace(40);
    this.text(text, 22, this.margin, 27);
    this.y -= 8;
  }

  heading(text) {
    this.ensureSpace(34);
    this.y -= 6;
    this.text(text, 15, this.margin, 21);
  }

  bullet(text) {
    const lines = wrapText(text, 84);
    if (!lines.length) return;
    this.text(`- ${lines[0]}`, 11, this.margin, 15);
    for (const line of lines.slice(1)) {
      this.text(`  ${line}`, 11, this.margin, 15);
    }
    this.y -= 2;
  }

  code(lines) {
    this.ensureSpace(lines.length * 13 + 18);
    this.y -= 4;
    for (const line of lines) {
      this.text(line, 9, this.margin + 14, 13);
    }
    this.y -= 8;
  }

  build() {
    if (this.current.length) {
      this.pages.push(this.current.join("\n"));
    }

    const objects = [];
    objects.push("<< /Type /Catalog /Pages 2 0 R >>");

    const pageObjectNumbers = [];
    const contentObjectNumbers = [];
    let nextObj = 4;

    for (let i = 0; i < this.pages.length; i++) {
      pageObjectNumbers.push(nextObj++);
      contentObjectNumbers.push(nextObj++);
    }

    objects.push(`<< /Type /Pages /Kids [${pageObjectNumbers.map((n) => `${n} 0 R`).join(" ")}] /Count ${this.pages.length} >>`);
    objects.push("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>");

    for (let i = 0; i < this.pages.length; i++) {
      const pageObj = pageObjectNumbers[i];
      const contentObj = contentObjectNumbers[i];
      objects[pageObj - 1] =
        `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${this.width} ${this.height}] /Resources << /Font << /F1 3 0 R >> >> /Contents ${contentObj} 0 R >>`;

      const stream = this.pages[i];
      const streamBuffer = Buffer.from(stream, "latin1");
      objects[contentObj - 1] = `<< /Length ${streamBuffer.length} >>\nstream\n${stream}\nendstream`;
    }

    const chunks = ["%PDF-1.4\n"];
    const offsets = [0];

    objects.forEach((obj, index) => {
      offsets[index + 1] = Buffer.byteLength(chunks.join(""), "latin1");
      chunks.push(`${index + 1} 0 obj\n${obj}\nendobj\n`);
    });

    const xrefOffset = Buffer.byteLength(chunks.join(""), "latin1");
    chunks.push(`xref\n0 ${objects.length + 1}\n`);
    chunks.push("0000000000 65535 f \n");

    for (let i = 1; i <= objects.length; i++) {
      chunks.push(`${String(offsets[i]).padStart(10, "0")} 00000 n \n`);
    }

    chunks.push(`trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`);
    return Buffer.from(chunks.join(""), "latin1");
  }
}

const pdf = new SimplePdf();

pdf.title("Explicação dos códigos: voluntario.html e voluntario.css");
pdf.paragraph("Este material explica, em detalhes, como a página de voluntariado da Pelu&Cia foi montada. A ideia é mostrar a função de cada parte do HTML e do CSS de forma simples, como um guia de estudo para quem está começando.");

pdf.heading("1. Visão geral da página");
pdf.bullet("O arquivo src/pages/voluntario.html define a estrutura e o conteúdo da tela: cabeçalho, área principal, formulário e rodapé.");
pdf.bullet("O arquivo src/css/voluntario.css define a aparência específica dessa tela: cores, espaçamentos, imagem, formulário, botão e responsividade.");
pdf.bullet("A página também usa global.css, header.css e footer.css. Esses arquivos cuidam de estilos compartilhados, como container, cabeçalho e rodapé.");

pdf.heading("2. Início do voluntario.html");
pdf.paragraph("O HTML começa com <!DOCTYPE html>, que informa ao navegador que o documento usa HTML moderno. A tag html possui lang=\"pt-BR\", indicando que o conteúdo está em português do Brasil.");
pdf.code([
  '<!DOCTYPE html>',
  '<html lang="pt-BR">',
  '<head>',
  '    <meta charset="UTF-8">',
  '    <meta name="viewport" content="width=device-width, initial-scale=1.0">',
]);
pdf.bullet("meta charset=\"UTF-8\" permite acentos e caracteres especiais corretamente.");
pdf.bullet("meta viewport faz a página se adaptar melhor a celulares e telas pequenas.");
pdf.bullet("title define o texto que aparece na aba do navegador.");

pdf.heading("3. Links de CSS");
pdf.paragraph("Dentro do head, a página importa quatro arquivos CSS. A ordem importa: primeiro vêm estilos gerais, depois estilos de partes compartilhadas, e por fim o CSS específico da página.");
pdf.code([
  '<link rel="stylesheet" href="/src/css/global.css">',
  '<link rel="stylesheet" href="/src/css/header.css">',
  '<link rel="stylesheet" href="/src/css/voluntario.css">',
  '<link rel="stylesheet" href="/src/css/footer.css">',
]);
pdf.bullet("global.css guarda variáveis de cor e regras comuns, como fonte, margem padrão e .container.");
pdf.bullet("header.css estiliza o menu superior.");
pdf.bullet("voluntario.css estiliza apenas a página de voluntariado.");
pdf.bullet("footer.css deixa o rodapé igual ao das páginas inicial e sobre.");

pdf.heading("4. Cabeçalho");
pdf.paragraph("O header contém a logo e o menu de navegação. A classe header é usada pelo CSS do cabeçalho, enquanto container limita a largura do conteúdo.");
pdf.bullet("A logo fica dentro de um link para a página inicial.");
pdf.bullet("O nav tem aria-label=\"Menu principal\", ajudando leitores de tela a entenderem a função daquela área.");
pdf.bullet("Cada item do menu possui uma imagem pequena e um texto, por exemplo Ajudar, Notícias, Voluntariado e Sobre.");

pdf.heading("5. Conteúdo principal");
pdf.paragraph("A tag main possui a classe voluntariado-page. Isso ajuda o CSS a estilizar elementos dessa página sem afetar outras telas do site.");
pdf.code([
  '<main class="voluntariado-page">',
  '    <section class="hero">',
  '    <section class="foto-section">',
  '    <section class="inscricao" id="inscricao">',
  '</main>',
]);
pdf.bullet("A seção hero apresenta o título principal e uma frase de chamada.");
pdf.bullet("A seção foto-section mostra uma imagem de gato.");
pdf.bullet("A seção inscricao contém o formulário de cadastro para voluntários.");

pdf.heading("6. Seção hero");
pdf.paragraph("A hero é a primeira área visual da página. Ela tem um h1 com o título \"Seja um Voluntário\" e um parágrafo explicando rapidamente o convite.");
pdf.bullet("O h1 deve ser usado para o título principal da página.");
pdf.bullet("O parágrafo ajuda o visitante a entender o objetivo da tela sem precisar ler o formulário.");
pdf.bullet("No CSS, essa seção recebe fundo azul, texto branco, alinhamento central e espaçamento interno.");

pdf.heading("7. Seção da imagem");
pdf.paragraph("A foto fica dentro de uma div com classe foto-gato. A imagem usa uma URL externa do Unsplash e possui atributo alt, que descreve o conteúdo da imagem.");
pdf.bullet("O alt é importante para acessibilidade e também ajuda caso a imagem não carregue.");
pdf.bullet("As tags span com classe barra ainda existem no HTML, mas no CSS estão com display: none. Isso significa que elas não aparecem na tela.");
pdf.bullet("A imagem recebe width: 100%, altura fixa, object-fit: cover e border-radius para ficar organizada e proporcional.");

pdf.heading("8. Formulário de inscrição");
pdf.paragraph("O formulário usa a tag form com id formVoluntario, action=\"#\" e method=\"POST\". Como action está com #, ele ainda não envia para um servidor real.");
pdf.code([
  '<form id="formVoluntario" action="#" method="POST">',
  '    ...campos do formulário...',
  '</form>',
]);
pdf.bullet("id=\"formVoluntario\" permitiria selecionar esse formulário com JavaScript no futuro.");
pdf.bullet("method=\"POST\" é comum para envio de dados de cadastro.");
pdf.bullet("Os campos com required obrigam o usuário a preencher antes de enviar.");

pdf.heading("9. Linhas do formulário");
pdf.paragraph("Os campos são organizados em grupos com classe linha-form. Cada linha possui duas divs com classe campo, criando uma organização simples em duas colunas no computador.");
pdf.bullet("Na primeira linha ficam Nome Completo e CPF.");
pdf.bullet("Na segunda linha ficam E-mail e Telefone.");
pdf.bullet("Na terceira linha ficam Idade e Profissão.");
pdf.bullet("No CSS, .linha-form usa display: flex e gap para colocar os campos lado a lado com espaço entre eles.");

pdf.heading("10. Labels e inputs");
pdf.paragraph("Cada campo tem um label ligado ao input pelo atributo for. O valor do for deve ser igual ao id do input.");
pdf.code([
  '<label for="email">E-mail *</label>',
  '<input type="email" id="email" name="email" required>',
]);
pdf.bullet("label melhora a acessibilidade e facilita o clique no campo.");
pdf.bullet("type=\"email\" pede ao navegador uma validação básica de e-mail.");
pdf.bullet("type=\"number\" no campo idade permite limitar valores com min=\"16\".");
pdf.bullet("name é o nome do dado que seria enviado para o servidor.");

pdf.heading("11. Disponibilidade");
pdf.paragraph("A disponibilidade foi feita com botões de rádio, deixando as opções visíveis e soltas, sem caixa de seleção.");
pdf.code([
  '<input type="radio" name="disponibilidade" value="manha" required>',
  'Manhã',
]);
pdf.bullet("Todos os radios usam o mesmo name, disponibilidade. Isso faz o navegador permitir escolher apenas uma opção.");
pdf.bullet("O required no primeiro radio torna o grupo obrigatório.");
pdf.bullet("As opções são Manhã, Tarde, Noite e Finais de semana.");
pdf.bullet("A classe opcoes-disponibilidade organiza as opções com flex-wrap, permitindo quebra de linha em telas menores.");

pdf.heading("12. Termos e botão");
pdf.paragraph("Antes do botão, há uma caixa de seleção confirmando que as informações são verdadeiras e que o voluntariado exige compromisso.");
pdf.bullet("O checkbox também tem required, então precisa ser marcado antes do envio.");
pdf.bullet("O botão type=\"submit\" envia o formulário quando todos os campos obrigatórios estão preenchidos.");
pdf.bullet("A classe btn-submit estiliza o botão com fundo azul, texto branco, borda arredondada e efeito hover.");

pdf.heading("13. Rodapé");
pdf.paragraph("O rodapé usa a mesma estrutura das páginas inicial e sobre. Por isso, ele importa footer.css e usa classes como footer, footer-content, footer-about, footer-links e footer-social.");
pdf.bullet("footer-about mostra a logo e uma descrição curta do projeto.");
pdf.bullet("footer-links lista links rápidos para outras páginas.");
pdf.bullet("footer-social mostra cartões com Instagram e Email.");
pdf.bullet("footer-bottom mostra direitos reservados e a frase de desenvolvimento.");

pdf.heading("14. Início do voluntario.css");
pdf.paragraph("O CSS começa estilizando a hero dentro da página de voluntariado. O seletor .voluntariado-page .hero é mais específico que apenas .hero, então evita conflitos com outras páginas que também tenham uma seção chamada hero.");
pdf.code([
  '.voluntariado-page .hero {',
  '    background-color: var(--azul-logo);',
  '    color: white;',
  '    text-align: center;',
  '    padding: 45px 20px;',
  '}',
]);
pdf.bullet("var(--azul-logo) usa uma variável definida no global.css.");
pdf.bullet("text-align: center centraliza o texto.");
pdf.bullet("padding cria espaço interno, deixando a área respirar.");

pdf.heading("15. Título e texto da hero");
pdf.paragraph("O h1 recebe tamanho de fonte maior e margem inferior. O parágrafo recebe max-width e margin auto para não ficar largo demais.");
pdf.bullet("max-width: 650px limita a largura do texto.");
pdf.bullet("margin: 0 auto centraliza o parágrafo dentro da seção.");
pdf.bullet("Essas regras ajudam a leitura, principalmente em telas grandes.");

pdf.heading("16. Imagem do gato");
pdf.paragraph("A foto é controlada por .foto-section, .foto-gato e .foto-gato img.");
pdf.bullet(".foto-section controla o espaçamento da área inteira.");
pdf.bullet(".foto-gato define largura máxima de 760px e centraliza o bloco.");
pdf.bullet(".foto-gato img usa width: 100% para acompanhar o tamanho do container.");
pdf.bullet("height: 330px define uma altura padrão, e object-fit: cover evita distorção da imagem.");
pdf.bullet("border-radius: 8px deixa os cantos levemente arredondados.");

pdf.heading("17. Card do formulário");
pdf.paragraph("A classe formulario-card cria uma caixa simples para o formulário. Ela usa fundo branco, borda cinza, raio de borda e padding.");
pdf.bullet("max-width: 760px evita que o formulário fique muito largo.");
pdf.bullet("border: 1px solid #dddddd cria uma borda discreta.");
pdf.bullet("padding: 28px cria espaço entre a borda e os campos internos.");
pdf.bullet("A classe container, vinda do global.css, também ajuda a centralizar o conteúdo.");

pdf.heading("18. Organização dos campos");
pdf.paragraph("O formulário usa dois conceitos principais: linha-form para agrupar campos lado a lado e campo para controlar cada bloco individual.");
pdf.code([
  '.linha-form {',
  '    display: flex;',
  '    gap: 18px;',
  '}',
  '',
  '.campo {',
  '    width: 100%;',
  '    margin-bottom: 18px;',
  '}',
]);
pdf.bullet("display: flex coloca os campos da linha um ao lado do outro.");
pdf.bullet("gap cria espaço entre as colunas.");
pdf.bullet("width: 100% faz cada campo ocupar o espaço disponível.");
pdf.bullet("margin-bottom separa verticalmente os campos.");

pdf.heading("19. Aparência dos inputs");
pdf.paragraph("Os inputs de texto, e-mail, telefone e número recebem a mesma aparência básica.");
pdf.bullet("width: 100% faz o input ocupar toda a largura do campo.");
pdf.bullet("padding: 10px melhora o conforto visual e o clique.");
pdf.bullet("border: 1px solid #cccccc cria uma borda simples.");
pdf.bullet("border-radius: 4px arredonda pouco, mantendo visual básico.");
pdf.bullet("font-size: 15px melhora a leitura.");

pdf.heading("20. Opções de disponibilidade no CSS");
pdf.paragraph("As opções de disponibilidade usam flex para ficarem na mesma linha quando houver espaço, mas podem quebrar para a linha de baixo.");
pdf.code([
  '.opcoes-disponibilidade {',
  '    display: flex;',
  '    flex-wrap: wrap;',
  '    gap: 14px 24px;',
  '}',
]);
pdf.bullet("flex-wrap: wrap é importante para responsividade.");
pdf.bullet("gap: 14px 24px define espaço vertical e horizontal entre as opções.");
pdf.bullet("Cada label usa display: flex e align-items: center para alinhar bolinha e texto.");

pdf.heading("21. Termos e botão");
pdf.paragraph("A área de termos usa display: flex para deixar o checkbox ao lado do texto. O botão recebe cor, padding, borda e cursor.");
pdf.bullet("align-items: flex-start alinha o checkbox com o começo do texto.");
pdf.bullet("cursor: pointer deixa claro que o botão é clicável.");
pdf.bullet(".btn-submit:hover muda a cor quando o mouse passa por cima.");

pdf.heading("22. Responsividade");
pdf.paragraph("No final do CSS existe uma media query para telas com largura até 700px. Ela adapta a página para celular.");
pdf.code([
  '@media (max-width: 700px) {',
  '    .linha-form {',
  '        display: block;',
  '    }',
  '}',
]);
pdf.bullet("Quando a tela é pequena, os campos deixam de ficar lado a lado e passam a ficar um embaixo do outro.");
pdf.bullet("O h1 diminui de 36px para 30px.");
pdf.bullet("A imagem passa de 330px para 240px de altura.");
pdf.bullet("Essas mudanças evitam aperto e deixam a página mais fácil de usar no celular.");

pdf.heading("23. Relação entre HTML e CSS");
pdf.paragraph("O HTML e o CSS se conectam principalmente pelas classes. Por exemplo, quando o HTML usa class=\"linha-form\", o CSS consegue encontrar esse elemento com .linha-form e aplicar display: flex.");
pdf.bullet("Classes são reutilizáveis e começam com ponto no CSS.");
pdf.bullet("IDs são únicos e começam com # no CSS, mas aqui eles aparecem mais para associar label e input.");
pdf.bullet("Seletores mais específicos, como .voluntariado-page .hero, ajudam a evitar que um estilo afete páginas erradas.");

pdf.heading("24. Pontos positivos do código");
pdf.bullet("A página usa tags semânticas como header, main, section, form e footer.");
pdf.bullet("Os campos possuem label, o que melhora acessibilidade e organização.");
pdf.bullet("O formulário está mais simples, com menos campos desnecessários.");
pdf.bullet("A disponibilidade ficou visível, sem depender de uma caixa select.");
pdf.bullet("O rodapé foi padronizado com as outras páginas do projeto.");
pdf.bullet("O CSS está curto e usa princípios básicos: cor, espaçamento, borda, flexbox e media query.");

pdf.heading("25. Melhorias futuras possíveis");
pdf.bullet("Adicionar máscara de CPF e telefone com JavaScript.");
pdf.bullet("Criar mensagens de sucesso ou erro após enviar o formulário.");
pdf.bullet("Enviar os dados para um backend real em vez de usar action=\"#\".");
pdf.bullet("Remover as tags span das barras no HTML, já que hoje elas estão escondidas com display: none.");
pdf.bullet("Padronizar a indentação do header para ficar igual ao restante do arquivo.");

pdf.heading("Resumo final");
pdf.paragraph("O voluntario.html monta a página e define o que aparece. O voluntario.css define como essa página aparece. Juntos, eles criam uma tela simples de voluntariado com cabeçalho, chamada principal, imagem, formulário organizado, disponibilidade em opções soltas, termos obrigatórios, botão de envio e rodapé igual ao restante do site.");

fs.mkdirSync(outputDir, { recursive: true });
fs.writeFileSync(outputFile, pdf.build());

console.log(outputFile);
