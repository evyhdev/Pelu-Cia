const noticiasIniciais = [
  {
    titulo: 'Resgate bem-sucedido no centro de Quixadá',
    foto: '/images/noticias/pexels-delot-31440943.webp',
    resumo: 'Nossa equipe realizou mais um resgate importante, salvando 3 cachorrinhos que estavam em situação de risco.',
    noticia: 'A equipe da Pelu&Cia foi acionada por moradores do centro de Quixadá após a identificação de três cachorrinhos em situação de risco. Os animais estavam desidratados, assustados e sem abrigo adequado. Com o apoio de voluntários, eles foram recolhidos com segurança, receberam avaliação inicial e foram encaminhados para cuidados temporários. A ação reforça a importância da comunicação da comunidade com o projeto para que casos urgentes sejam atendidos com rapidez.',
    data: '2026-04-05',
    tipo: 'Resgate',
  },
  {
    titulo: 'Feira de Adoção no Campus UFC foi um sucesso',
    foto: '/images/noticias/pexels-nandamends-16608221.webp',
    resumo: 'Doze animais encontraram seus lares definitivos durante a feira de adoção realizada no campus.',
    noticia: 'A feira de adoção organizada pela Pelu&Cia no Campus da UFC reuniu estudantes, servidores e moradores da região interessados em adotar com responsabilidade. Durante o evento, os visitantes puderam conhecer os animais, conversar com voluntários e receber orientações sobre adaptação, vacinação, alimentação e acompanhamento pós-adoção. Ao final da ação, doze animais foram adotados e seguirão sendo acompanhados pela equipe nos primeiros meses.',
    data: '2026-03-28',
    tipo: 'Evento',
  },
  {
    titulo: 'História de Sucesso: Max encontra um lar',
    foto: '/images/noticias/pexels-muhammedtubtemur-20744921.webp',
    resumo: 'Conheça a trajetória de Max, que encontrou uma família amorosa após oito meses de acolhimento.',
    noticia: 'Max chegou ao projeto ainda filhote, depois de ser encontrado próximo ao campus em condição de abandono. Durante oito meses, recebeu cuidados veterinários, alimentação adequada e socialização com voluntários. A adoção aconteceu após uma família conhecer sua história em uma visita ao projeto. Hoje, Max vive em um lar definitivo e sua adaptação tem sido acompanhada pela equipe da Pelu&Cia.',
    data: '2026-03-15',
    tipo: 'História',
  },
  {
    titulo: 'Campanha de vacinação beneficia 40 animais',
    foto: '/images/noticias/pexels-rashi-rashu-2156740634-35587397.webp',
    resumo: 'Com apoio de doações, quarenta animais receberam vacinas essenciais contra doenças graves.',
    noticia: 'A Pelu&Cia realizou uma campanha de vacinação voltada aos animais acolhidos e monitorados pelo projeto. A iniciativa foi possível graças às doações recebidas da comunidade e ao apoio de profissionais parceiros. Foram aplicadas vacinas contra raiva, cinomose e outras doenças de grande impacto para a saúde animal. A ação também incluiu registro dos atendimentos e orientação aos tutores temporários.',
    data: '2026-03-08',
    tipo: 'Saúde',
  },
  {
    titulo: 'Novo abrigo: expansão das instalações',
    foto: '/images/noticias/pexels-karola-g-5713361.webp',
    resumo: 'Com apoio da comunidade, o abrigo foi ampliado para acolher mais animais com segurança.',
    noticia: 'A expansão das instalações da Pelu&Cia representa um avanço importante para o acolhimento temporário de animais resgatados. O novo espaço melhora a separação por porte, condição de saúde e fase de adaptação, reduzindo riscos e aumentando o conforto dos animais. A obra contou com doações de materiais, trabalho voluntário e organização coletiva para tornar o ambiente mais funcional.',
    data: '2026-03-01',
    tipo: 'Infraestrutura',
  },
];

export async function seedNoticias(pool) {
  for (const noticia of noticiasIniciais) {
    await pool.query(
      `INSERT INTO noticias (titulo, foto, resumo, noticia, data, tipo)
       VALUES ($1, $2, $3, $4, $5, $6)
       ON CONFLICT (titulo) DO NOTHING`,
      [noticia.titulo, noticia.foto, noticia.resumo, noticia.noticia, noticia.data, noticia.tipo]
    );
  }
}
