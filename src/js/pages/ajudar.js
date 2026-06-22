export { renderAjudarPage } from "./ajudar/template.js";
import { carregarDadosAjudar } from "./ajudar/data.js";

export async function initAjudarPage() {
  await carregarDadosAjudar();
}
