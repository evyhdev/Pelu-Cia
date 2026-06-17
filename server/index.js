import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { initDB } from './db.js';
import voluntariosRouter from './voluntarios.router.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use('/api/voluntarios', voluntariosRouter);

app.listen(PORT, async () => {
  await initDB();
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});