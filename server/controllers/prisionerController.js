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

exports.view = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err)
            throw err;
        console.log('Connected to ID: ' + connection.threadId);

        connection.query('SELECT * FROM CRIMINAL', (err, rows) => {
            connection.release();
            if (!err) {
                res.render('homePris', { rows });
                console.log('Here');
            } else {
                console.log(err);
            }
        });
    });
}

exports.find = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err)
            throw err;
        console.log('Connected to ID: ' + connection.threadId);

        let searchBody = req.body.search;
        connection.query('SELECT * FROM CRIMINAL WHERE fname LIKE ? OR lname LIKE ?', ['%' + searchBody + '%', '%' + searchBody + '%'], (err, rows) => {
            connection.release();
            if (!err) {
                res.render('homePris', { rows });
                console.log('Here');
            } else {
                console.log(err);
            }
        });
    });
}

exports.form = (req, res) => {
    res.render('addPris');
}

exports.create = (req, res) => {
    const { fname, lname, sex, dob, crid, prid, arrested_on, current_status, arrested_for } = req.body;

    pool.getConnection((err, connection) => {
        if (err)
            throw err;
        console.log('Connected to ID: ' + connection.threadId);

        connection.query('INSERT INTO CRIMINAL SET fname = ?, lname = ? , sex = ? , dob= ? ,crid = ?, prid =?, arrested_on=?, current_status="Judgement Pending";INSERT CRIMINAL_REASON SET arrested_for=?, crid=?', [fname, lname, sex, dob, crid, prid, arrested_on, arrested_for, crid], (err, rows) => {
            connection.release();
            if (!err) {
                res.render('addPris', { alert: "Prisioner added successfully!" });
                console.log('Here');
            } else {
                console.log(err);
            }
            // console.log(rows);
        });
    });
}

exports.edit = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err)
            throw err;
        console.log('Connected to ID: ' + connection.threadId);

        connection.query('SELECT * FROM CRIMINAL WHERE crid = ?', [req.params.id], (err, rows) => {
            connection.release();
            if (!err) {
                res.render('editPris', { rows });
                console.log('Here');
            } else {
                console.log(err);
            }
            console.log(rows);
        });
    });
}

exports.update = (req, res) => {
    const { fname, lname, sex, dob, crid, prid, arrested_on } = req.body;

    pool.getConnection((err, connection) => {
        if (err)
            throw err;
        console.log('Connected to ID: ' + connection.threadId);

        connection.query('UPDATE CRIMINAL SET fname = ?, lname=?, sex = ?, dob= ? , prid =?, arrested_on=?  WHERE crid = ?', [fname, lname, sex, dob, prid, arrested_on, req.params.id], (err, rows) => {
            connection.release();
            if (!err) {
                pool.getConnection((err, connection) => {
                    if (err)
                        throw err;
                    console.log('Connected to ID: ' + connection.threadId);
                    connection.query('SELECT * FROM CRIMINAL WHERE crid = ?', [req.params.id], (err, rows) => {
                        connection.release();
                        if (!err) {
                            res.render('editPris', { rows, alert: "Prisoner details updated successfully!" });
                            console.log('Here');
                        } else {
                            console.log(err);
                        }
                        console.log(rows);
                    });
                });
            } else {
                console.log(err);
            }
            console.log(rows);
        });
    });
}

exports.delete = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err)
            throw err;
        console.log('Connected to ID: ' + connection.threadId);

        connection.query('DELETE FROM CRIMINAL WHERE crid = ?;DELETE FROM CRIMINAL_REASON WHERE crid = ?', [req.params.id, req.params.id], (err, rows) => {
            connection.release();
            if (!err) {
                res.redirect('/homePris');
                console.log('Here');
            } else {
                console.log(err);
            }
            console.log(rows);
        });
    });
}

exports.viewPris = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err)
            throw err;
        console.log('Connected to ID: ' + connection.threadId);
        // var x = req.params.id;
        connection.query('SELECT * FROM CRIMINAL WHERE crid = ?; SELECT arrested_for FROM CRIMINAL_REASON WHERE crid = ?', [req.params.id, req.params.id], (err, rows, fields) => {
            connection.release();
            if (!err) {
                res.render('viewPris', { rows });
                // console.log(query);
            } else {
                console.log(err);
            }
        });

    });
}