const express = require('express');
const port = 3000;
const app = express();
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;
const assert = require('assert');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');

// Connection URL
const url = 'mongodb+srv://dbUser:dbUserPassword@cluster0-t2kyl.gcp.mongodb.net/test?retryWrites=true&w=majority';
const dbName = 'questionnaire_db';

var mongoOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};
app.set('view engine', 'pug');
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({
    extended: false
}))

app.get('/', function (req, res) {
    res.render("index");
});

app.get('/viewusers', function (req, res) {
    (async function mongo() {
        try {
            var client = await MongoClient.connect(url, mongoOptions);
            var db = client.db(dbName);
            db.collection('Users')
                .find()
                .toArray().then(users => {
                    var model = {
                        title: "Users!",
                        rawr: users
                    };
                    res.render("viewusers", model);
                })
        } catch (err) {
            console.log(err);
        } finally {
            client.close();
        }
    }());
});

app.get('/login', function (req, res) {
    res.render("login");
});

app.post('/login', function (req, res) {
    let pw = req.body.password;
    (async function mongo() {
        try {
            var client = await MongoClient.connect(url, mongoOptions);
            var db = client.db(dbName);
            return db.collection('Users')
                .findOne({
                    "username":req.body.username
                });
        } catch (err) {
            console.log(err);
        } finally {
            client.close();
        }
    }()).then(user => {
        if(bcrypt.compareSync(pw, user.hash)) { 
            res.redirect('http://localhost:3000/');
        }
    })
});

app.get('/register', function (req, res) {
    res.render("register");
});

app.post('/register', function (req, res) {
    (async function mongo() {
        try {
            const hash = bcrypt.hashSync(req.body.password);
            let obj = {
                username: req.body.username,
                hash: hash,
                user_level: 'user',
                email: req.body.email,
                age: req.body.age,
                status: 'active',
                answer1: req.body.answer1,
                answer2: req.body.answer2,
                answer3: req.body.answer3
            };
            var client = await MongoClient.connect(url, mongoOptions);
            var db = client.db(dbName);
            db.collection("Users").insertOne(obj, function (err, res) {
                if (err) throw err;
                console.log("1 document inserted");
            });
            res.redirect('http://localhost:3000/login');
        } catch (err) {
            console.log(err);
        } finally {
            client.close();
        }
    }());
});

app.listen(port, function () {
    console.log("Express listening on port " + port);
});