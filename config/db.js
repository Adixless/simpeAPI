const mysql = require('mysql')
require('dotenv').config()

const db = mysql.createConnection({
    host: 'public_ip_sql_instance_Anda',
    user: 'root',
    database: 'nama_database_Anda',
    password: 'password_sql_Anda'
})

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to the database');
});

module.exports = db;