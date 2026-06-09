import { Pool } from 'pg';

const pool = new Pool({
    user: 'bryanheinz',
    host: '127.0.0.1',
    database: 'fe-pengeluaran',
<<<<<<< HEAD
    password: 'admin',
=======
    password: '',
>>>>>>> 65176b630e1a601fa4deab70e53171b6101c07ab
    port: 5432
})

export default pool;

