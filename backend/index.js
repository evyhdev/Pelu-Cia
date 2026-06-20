import 'dotenv/config';
import app from './app.js';
import { initDatabase } from './database/index.js';

const PORT = process.env.PORT || 3000;

async function startServer() {
  await initDatabase();
  app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Erro ao iniciar servidor:', err.stack || err.message || err);
  process.exit(1);
});
