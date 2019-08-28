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

var adminRoutes = require('./routes/adminRoutes');
app.use("/admin/", adminRoutes);
var routes = require('./routes/routes');
app.use("/", routes);

app.listen(port, function () {
    console.log("Express listening on port " + port);
});