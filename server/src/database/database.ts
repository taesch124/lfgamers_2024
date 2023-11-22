import { Pool } from 'pg';

const PORT = Number(process.env.DB_PORT);
export const pool = new Pool({
    user: process.env.DB_USERNAME,
    host: process.env.DB_HOSTNAME,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: PORT,
});
