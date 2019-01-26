/////*****VARIABLES
const
    express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    db = require('./models');

//serve static files in public
app.use(express.static('public'));

// MIDDLEWARE
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());


// ROUTES
// stay tuned

// SERVER START
app.listen(3000, () => {
  console.log("server listening at localhost:3000 :)");
});