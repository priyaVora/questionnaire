const express = require('express');
const port = 3000;
const app = express();
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;
const assert = require('assert');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');

// Mongo variables
// Connection URL
const url = 'mongodb+srv://dbUser:dbUserPassword@cluster0-t2kyl.gcp.mongodb.net/test?retryWrites=true&w=majority';
const dbName = 'questionnaire_db';

var mongoOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};

var router = express.Router();

router.route("/").get(
    function (req, res) {
        console.log("Session: ", req.session);
        if (req.session.state === 'Logged-in') {
            console.log("State of User: " + req.session.userId + " " + req.session.state);
        }
        var model = {
            loggedin: (req.session.state === 'Logged-in') ? true : false,
            isAdmin: (req.session.user_level) === 'admin' ? true : false
        };
        console.log("Allow: ", model.loggedin);
        res.render("index", model);
    }
);

router.route("/logout").get(
    function (req, res) {
        res.render("index");
        req.session.state = "Logged-Out";
        console.log(req.session);
    }
);

router.route("/updateuser").post(
    function(req,res) {
        var model = {
            loggedin: (req.session.state === 'Logged-in') ? true : false,
            isAdmin: (req.session.user_level) === 'admin' ? true : false
        }; 
        console.log("Update user");
        console.log(req.body.username);
        const username = req.body.username;
        try {
            MongoClient.connect(url, mongoOptions, function (err, client) {
                assert.equal(null, err);
                const db = client.db(dbName);
                var myquery = {
                    username: username
                };
                var newvalues = {
                    $set: {
                        username: username,
                        hash: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync()),
                        email: req.body.email,
                        age: req.body.age,
                        answer1: req.body.flavor, 
                        answer2: req.body.message,
                        answer3: req.body.season
                    }
                };

                db.collection("Users").updateOne(myquery, newvalues, function (err, res) {
                    if (err) throw err;
                    console.log("1 document updated");
                });
                res.redirect('http://localhost:3000/admin/viewusers');
            });
        } catch (err) {
            console.log(err);
        }
    }
);

router.route("/viewprofile").get(
    function (req, res) {
        console.log(req.session);
        var model = {
            loggedin: (req.session.state === 'Logged-in') ? true : false,
            isAdmin: (req.session.user_level) === 'admin' ? true : false
        };
        res.render("profile", model);
    }
);
router.route('/login').get(
    function (req, res) {
        res.render("login");
    }
);
router.route('/register').get(
    function (req, res) {
        res.render("register");
    }
);

router.route('/login').post(
    function (req, res) {
        let pw = req.body.password;
        (async function mongo() {
            try {
                var client = await MongoClient.connect(url, mongoOptions);
                var db = client.db(dbName);
                return db.collection('Users')
                    .findOne({
                        "username": req.body.username
                    });
            } catch (err) {
                console.log(err);
            } finally {
                client.close();
            }
        }()).then(user => {
            if (user.status === "active") {
                if (bcrypt.compareSync(pw, user.hash)) {
                    req.session.userId = user._id;
                    req.session.state = "Logged-in";
                    req.session.user_level = user.user_level;
                    console.log(req.session);
                    res.redirect('http://localhost:3000/');
                }
            } else {
                res.render("suspended");
            }
        })
    }
);

router.route('/register').post(
    function (req, res) {
        (async function mongo() {
            try {
                const hash = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync())
                let obj = {
                    username: req.body.username,
                    hash: hash,
                    user_level: 'user',
                    email: req.body.email,
                    age: req.body.age,
                    status: 'active',
                    answer1: req.body.flavor,
                    answer2: req.body.message,
                    answer3: req.body.season
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
    }
)
module.exports = router;