import pool from '../config/db.js';
import { createSchema } from './schema.js';
import { seedNoticias } from './seeds/noticias.seed.js';

export async function initDatabase() {
  await createSchema(pool);
  await seedNoticias(pool);
}
