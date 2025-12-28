const { Pool } = require('pg');

const pool = new Pool({
  user: 'myapp_user',
  host: 'localhost',
  database: 'myapp_db',
  password: 'postgres123', // your password
  port: 5432,
});

module.exports = pool;
