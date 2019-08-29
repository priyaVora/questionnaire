const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;
const assert = require('assert');

// Connection URL
const url = 'mongodb+srv://dbUser:dbUserPassword@cluster0-t2kyl.gcp.mongodb.net/test?retryWrites=true&w=majority';
const dbName = 'questionnaire_db';

var mongoOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};

var router = express.Router();

router.route("/viewusers").get(
    function (req, res) {
        try {
            console.log("View users from admin...");
            MongoClient.connect(url, mongoOptions, function (err, client) {
                assert.equal(null, err);
                const db = client.db(dbName);
                db.collection('Users')
                    .find()
                    .toArray().then(users => {
                        var model = {
                            title: "Users!",
                            loggedin: (req.session.state === 'Logged-in') ? true : false,
                            isAdmin: (req.session.user_level) === 'admin' ? true : false,
                            rawr: users
                        };
                        res.render("viewusers", model);
                    })

            });
        } catch (e) {
            console.log(e);
        }
    }
);


router.route('/user/:username/suspend').get(
    function (req, res) {
        const {
            username
        } = req.params;
        try {
            MongoClient.connect(url, mongoOptions, function (err, client) {
                assert.equal(null, err);
                const db = client.db(dbName);
                var myquery = {
                    username: username
                };
                var newvalues = {
                    $set: {
                        status: "suspended"
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

router.route('/user/:username/activate').get(
    function (req, res) {
        const {
            username
        } = req.params;
        try {
            MongoClient.connect(url, mongoOptions, function (err, client) {
                assert.equal(null, err);
                const db = client.db(dbName);
                var myquery = {
                    username: username
                };
                var newvalues = {
                    $set: {
                        status: "active"
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




module.exports = router;
console.log("Admin routes are running.");