//variables
const
    express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    passport = require('./config/passport')()

//controllers
const userController = require('./controllers/users.js')
const playerController = require('./controllers/players.js')
const teamController = require('./controllers/teams.js')

//serve static files in public
app.use(express.static('public'));

//middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(bodyParser.json());

//routes
app.use('/users', userController),
app.use('/players', playerController),
app.use('/team', teamController);

//server start
app.listen(3001, () => { console.log("server listening at localhost:3001");
});