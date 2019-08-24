const express = require('express');
var router = express.Router();

router.route("/").get(function(req, res) {

    res.render("index");
});

router.route("/login").get(function(req, res) {

    res.render("login");
});

router.route("/register").get(function(req, res) {

    res.render("register");
});



module.exports = router;