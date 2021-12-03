const mysql = require('mysql');

//Connection Pool
const pool = mysql.createPool({
    connectionLimit: 100,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});


exports.view = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err)
            throw err;
        console.log('Connected to ID: ' + connection.threadId);

        connection.query('SELECT * FROM USER', (err, rows) => {
            connection.release();
            if (!err) {
                res.render('home', { rows });
                console.log('Here');
            } else {
                console.log(err);
            }
            console.log(rows);
        });
    });
}

exports.find = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err)
            throw err;
        console.log('Connected to ID: ' + connection.threadId);

        let searchBody = req.body.search;
        connection.query('SELECT * FROM USER WHERE first_name LIKE ? OR last_name LIKE ?', ['%' + searchBody + '%', '%' + searchBody + '%'], (err, rows) => {
            connection.release();
            if (!err) {
                res.render('home', { rows });
                console.log('Here');
            } else {
                console.log(err);
            }
            console.log(rows);
        });
    });
}

exports.form = (req, res) => {
    res.render('add-user');
}

exports.create = (req, res) => {
    const { first_name, last_name, email, phone, comments } = req.body;

    pool.getConnection((err, connection) => {
        if (err)
            throw err;
        console.log('Connected to ID: ' + connection.threadId);

        connection.query('INSERT INTO USER SET first_name = ?, last_name = ? , email = ? , phone= ? ,comments = ?', [first_name, last_name, email, phone, comments], (err, rows) => {
            connection.release();
            if (!err) {
                res.render('add-user');
                console.log('Here');
            } else {
                console.log(err);
            }
            console.log(rows);
        });
    });
}