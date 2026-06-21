import nodemailer from 'nodemailer';

let transporterPromise;

function parseBoolean(value, fallback = false) {
  if (value === undefined) {
    return fallback;
  }

  return String(value).toLowerCase() === 'true';
}

function formatarDisponibilidade(disponibilidade) {
  const labels = {
    manha: 'Manhã',
    tarde: 'Tarde',
    noite: 'Noite',
    'finais-de-semana': 'Finais de semana',
  };

  return labels[disponibilidade] || disponibilidade;
}

function obterConfiguracaoEmail() {
  return {
    enabled: parseBoolean(process.env.MAIL_ENABLED, true),
    host: process.env.SMTP_HOST || 'localhost',
    port: Number(process.env.SMTP_PORT || 1025),
    secure: parseBoolean(process.env.SMTP_SECURE, false),
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASS || '',
    from: process.env.MAIL_FROM || 'nao-responda@pelucia.local',
    volunteerTo: process.env.VOLUNTEER_NOTIFICATION_TO || process.env.ADMIN_EMAIL || 'admin@pelucia.com',
    contactTo: process.env.CONTACT_NOTIFICATION_TO || process.env.ADMIN_EMAIL || 'admin@pelucia.com',
  };
}

async function obterTransporter() {
  if (!transporterPromise) {
    const config = obterConfiguracaoEmail();

    transporterPromise = Promise.resolve(
      nodemailer.createTransport({
        host: config.host,
        port: config.port,
        secure: config.secure,
        auth: config.user ? { user: config.user, pass: config.pass } : undefined,
      })
    );
  }

  return transporterPromise;
}

function montarMensagem(voluntario) {
  const disponibilidade = formatarDisponibilidade(voluntario.disponibilidade);
  const assunto = `Nova inscrição de voluntário: ${voluntario.nome}`;
  const criadoEm = voluntario.criado_em
    ? new Intl.DateTimeFormat('pt-BR', {
        dateStyle: 'short',
        timeStyle: 'short',
        timeZone: 'America/Sao_Paulo',
      }).format(new Date(voluntario.criado_em))
    : 'Não informado';

  return {
    subject: assunto,
    text: [
      'Nova inscrição de voluntário recebida.',
      '',
      `ID: ${voluntario.id}`,
      `Nome: ${voluntario.nome}`,
      `CPF: ${voluntario.cpf}`,
      `E-mail: ${voluntario.email}`,
      `Telefone: ${voluntario.telefone}`,
      `Idade: ${voluntario.idade}`,
      `Profissão: ${voluntario.profissao}`,
      `Disponibilidade: ${disponibilidade}`,
      `Recebido em: ${criadoEm}`,
    ].join('\n'),
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #1a1a1a;">
        <h2>Nova inscrição de voluntário</h2>
        <p>O sistema Pelu&Cia recebeu uma nova inscrição.</p>
        <ul style="padding-left: 18px;">
          <li><strong>ID:</strong> ${voluntario.id}</li>
          <li><strong>Nome:</strong> ${voluntario.nome}</li>
          <li><strong>CPF:</strong> ${voluntario.cpf}</li>
          <li><strong>E-mail:</strong> ${voluntario.email}</li>
          <li><strong>Telefone:</strong> ${voluntario.telefone}</li>
          <li><strong>Idade:</strong> ${voluntario.idade}</li>
          <li><strong>Profissão:</strong> ${voluntario.profissao}</li>
          <li><strong>Disponibilidade:</strong> ${disponibilidade}</li>
          <li><strong>Recebido em:</strong> ${criadoEm}</li>
        </ul>
      </div>
    `,
  };
}

export async function enviarEmailNovoVoluntario(voluntario) {
  const config = obterConfiguracaoEmail();

  if (!config.enabled) {
    return;
  }

  const transporter = await obterTransporter();
  const mensagem = montarMensagem(voluntario);

  await transporter.sendMail({
    from: config.from,
    to: config.volunteerTo,
    subject: mensagem.subject,
    text: mensagem.text,
    html: mensagem.html,
  });
}

export async function enviarEmailContato({ nome, email, mensagem }) {
  const config = obterConfiguracaoEmail();

  if (!config.enabled) {
    return;
  }

  const transporter = await obterTransporter();
  const subject = `Nova mensagem de contato: ${nome}`;
  const text = [
    'Nova mensagem recebida pelo formulário da página inicial.',
    '',
    `Nome: ${nome}`,
    `E-mail: ${email}`,
    '',
    'Mensagem:',
    mensagem,
  ].join('\n');

  const html = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #1a1a1a;">
      <h2>Nova mensagem de contato</h2>
      <p>O site da Pelu&Cia recebeu uma nova mensagem.</p>
      <p><strong>Nome:</strong> ${nome}</p>
      <p><strong>E-mail:</strong> ${email}</p>
      <p><strong>Mensagem:</strong></p>
      <p>${mensagem.replaceAll('\n', '<br>')}</p>
    </div>
  `;

  await transporter.sendMail({
    from: config.from,
    to: config.contactTo,
    replyTo: email,
    subject,
    text,
    html,
  });
}
