const express = require('express');
const bodyParser = require('body-parser');
const port = 3000;
const app = express();

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine', 'pug');
app.listen(port, function() {
    console.log("Listening on port " + port);
});

var routes = require('./routes/routes');
app.use("/", routes);
var adminRoutes = require('./routes/adminRoutes')
app.use("/admin/", adminRoutes);