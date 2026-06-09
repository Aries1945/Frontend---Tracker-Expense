import { Pool } from 'pg';

const pool = new Pool({
    user: 'bryanheinz',
    host: '127.0.0.1',
    database: 'fe-pengeluaran',
    password: '',
    port: 5432
})

export default pool;

