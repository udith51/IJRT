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

exports.view = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err)
            throw err;
        console.log('Connected to ID: ' + connection.threadId);

        connection.query('SELECT * FROM POLICE', (err, rows) => {
            connection.release();
            if (!err) {
                res.render('homePol', { rows });
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
        connection.query('SELECT * FROM POLICE WHERE fname LIKE ? OR lname LIKE ?', ['%' + searchBody + '%', '%' + searchBody + '%'], (err, rows) => {
            connection.release();
            if (!err) {
                res.render('homePol', { rows });
                console.log('Here');
            } else {
                console.log(err);
            }
        });
    });
}
// 
exports.form = (req, res) => {
    res.render('addPol');
}

exports.create = (req, res) => {
    const { fname, lname, sex, dob, pid, sid, designation, phone } = req.body;

    pool.getConnection((err, connection) => {
        if (err)
            throw err;
        console.log('Connected to ID: ' + connection.threadId);

        connection.query('INSERT INTO `police` (`pid`, `sid`, `fname`, `lname`, `designation`, `sex`, `dob`, `phone`) VALUES (?,?,?,?,?,?,?,?);', [pid, sid, fname, lname, designation, sex, dob, phone], (err, rows) => {
            connection.release();
            if (!err) {
                res.render('addPol', { alert: "Police Officer added successfully!" });
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

        connection.query('SELECT * FROM POLICE WHERE pid = ?', [req.params.id], (err, rows) => {
            connection.release();
            if (!err) {
                res.render('editPol', { rows });
                console.log('Here');
            } else {
                console.log(err);
            }
            console.log(rows);
        });
    });
}

exports.update = (req, res) => {
    const { fname, lname, sex, dob, pid, sid, designation, phone } = req.body;

    pool.getConnection((err, connection) => {
        if (err)
            throw err;
        console.log('Connected to ID: ' + connection.threadId);

        connection.query('UPDATE POLICE SET fname =?, lname=?, sex=?, dob=?, sid=?, designation=?, phone=? WHERE pid = ?', [fname, lname, sex, dob, sid, designation, phone, req.params.id], (err, rows) => {
            connection.release();
            if (!err) {
                pool.getConnection((err, connection) => {
                    if (err)
                        throw err;
                    console.log('Connected to ID: ' + connection.threadId);
                    connection.query('SELECT * FROM POLICE WHERE pid = ?', [req.params.id], (err, rows) => {
                        connection.release();
                        if (!err) {
                            res.render('editPol', { rows, alert: "Police Officers details updated successfully!" });
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

        connection.query('DELETE FROM POLICE WHERE pid = ?', [req.params.id], (err, rows) => {
            connection.release();
            if (!err) {
                res.redirect('/homePol');
                console.log('Here');
            } else {
                console.log(err);
            }
            console.log(rows);
        });
    });
}

exports.viewPol = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err)
            throw err;
        console.log('Connected to ID: ' + connection.threadId);
        // var x = req.params.id;
        connection.query('SELECT * FROM CRIMINAL WHERE crid = ?; SELECT arrested_for FROM CRIMINAL_REASON WHERE crid = ?', [req.params.id, req.params.id], (err, rows, fields) => {
            connection.release();
            if (!err) {
                res.render('viewPol', { rows });
                console.log('Here');
            } else {
                console.log(err);
            }
            console.log('BC');
            console.log(rows[0]);
            console.log(rows[1]);
            // console.log(RowDataPacket[0]);
        });
    });
}