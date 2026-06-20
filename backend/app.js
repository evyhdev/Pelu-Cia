import express from 'express';
import cors from 'cors';
import noticiasRouter from './routes/noticias.router.js';
import voluntariosRouter from './routes/voluntarios.router.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use('/api/noticias', noticiasRouter);
app.use('/api/voluntarios', voluntariosRouter);

export default app;
