const { Client } = require("pg");

const client = new Client({
    host: 'localhost',
    port: 5432,
    password: 'transmission',
    database: 'transmission'
});





module.exports = client;