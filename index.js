const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const path = require("path");
const mysql = require("mysql");
require("dotenv").config();

const app = express();
const port = process.env.port || 3000;
const static_path = path.join(__dirname, "../public");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//static files
app.use(express.static(static_path));

//templating engine
const handlebars = exphbs.create({ extname: "hbs" });
app.engine('hbs', handlebars.engine);
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

const routes = require('./server/routes/user');
app.use('/', routes);


app.listen(port, () => {
    console.log(`Listening from port ${port}`);
})