import express from 'express';
import cors from 'cors';
import authRouter from './routes/auth.router.js';
import contatoRouter from './routes/contato.router.js';
import contasRouter from './routes/contas.router.js';
import doacoesRouter from './routes/doacoes.router.js';
import noticiasRouter from './routes/noticias.router.js';
import voluntariosRouter from './routes/voluntarios.router.js';

const app = express();

app.use(cors());
app.use(express.json({ limit: '5mb' }));
app.use(express.static('public'));

app.use('/api/auth', authRouter);
app.use('/api/contato', contatoRouter);
app.use('/api/contas', contasRouter);
app.use('/api/doacoes', doacoesRouter);
app.use('/api/noticias', noticiasRouter);
app.use('/api/voluntarios', voluntariosRouter);

export default app;
