const mysql = require('mysql');

//Connection Pool
const pool = mysql.createPool({
    connectionLimit: 100,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    multipleStatements: true
});

exports.first = (req, res) => {
    res.render('first');
}

exports.loginJ = (req, res) => {
    res.render('loginJ');
}

exports.loginC = (req, res) => {
    res.render('loginC');
}

exports.loginP = (req, res) => {
    res.render('loginP');
}