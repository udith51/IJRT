const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const mysql = require("mysql");
require("dotenv").config();

const app = express();
const port = process.env.port || 5000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//static files
app.use(express.static('public'));

//templating engine
const handlebars = exphbs.create({ extname: "hbs" });
app.engine('hbs', handlebars.engine);
app.set('view engine', 'hbs');

//Router
app.get('', (req, res) => {//home page
    res.render('home');
});















app.listen(port, () => {
    console.log(`Listening from port ${port}`);
})