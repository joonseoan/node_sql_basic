const mysql = require('mysql2');

const { mysql_key } = require('../config/keys');

const pool = mysql.createPool({
    host: 'localhost', // connection proxy
    user: 'root', // user name in mysql
    database: 'node_complete', // database name we set
    password: mysql_key
});

module.exports = pool.promise();