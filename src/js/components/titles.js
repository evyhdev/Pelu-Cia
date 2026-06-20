function escaparHTML(valor) {
  return String(valor ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export function renderPageHeader({
  title,
  subtitle,
  className = "titulo-pagina",
  container = true,
}) {
  return `
    <section class="${className}">
      ${container ? '<div class="container">' : ""}
        <h1>${escaparHTML(title)}</h1>
        <p>${escaparHTML(subtitle)}</p>
      ${container ? "</div>" : ""}
    </section>
  `;
}

export function renderSectionHeading({ title, subtitle, className = "titulo-secao" }) {
  return `
    <div class="${className}">
      <h2>${escaparHTML(title)}</h2>
      ${subtitle ? `<p>${escaparHTML(subtitle)}</p>` : ""}
    </div>
  `;
}
