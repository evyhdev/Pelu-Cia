import pg from 'pg';
import 'dotenv/config';

const { Pool } = pg;

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5434,
  database: process.env.DB_NAME || 'pelucia',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || '',
});

export default pool;
