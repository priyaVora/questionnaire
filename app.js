const express = require('express');
const port = 3000;
const app = express();
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;
const assert = require('assert');
const bodyParser = require('body-parser');

// Connection URL
const url = '<connection_url>';
const dbName = 'questionnaire_db';

var mongoOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};
app.set('view engine', 'pug');
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', function (req, res) {
    res.render("index");
});

app.get('/login', function (req, res) {
    res.render("login");
});

app.post('/login', function (req, res) {
    res.send("User has login!");
});

app.get('/register', function (req, res) {
    res.render("register");
});

app.post('/register', function (req, res) {
    res.redirect('http://localhost:3000/login');
});

app.listen(port, function () {
    console.log("Express listening on port " + port);
});