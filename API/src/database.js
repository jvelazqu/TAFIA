const Pool = require('pg').Pool

const pool = new Pool({
  user: 'tafia',
  host: 'localhost',
  database: 'tafia',
  password: 'tafia123',
  port: 5432,
})

module.exports = pool;