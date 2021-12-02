const express = require('express');
const app = express();
const mysql = require('mysql');


const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: ''
})
db.connect(err => {
    if (err)
        // throw err;
        console.log('MySQL connected');
})
app.get('/createdb', (req, res) => {
    let sql = "Create DATABASE nodemysql";
    db.query(sql, err => {
        if (err)
            // throw err
            res.send("Database Created");
    })
})