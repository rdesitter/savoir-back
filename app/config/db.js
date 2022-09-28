require("dotenv").config();
const { Client } = require('pg')
const client = new Client( 
  {
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT,
    ssl: true
  } 
)
//console.log(client)

//await client.connect()
//const res = await client.query('SELECT NOW()')

module.exports = client; 