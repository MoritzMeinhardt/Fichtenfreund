const express = require('express');
const http = require('http'); // TEST
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./api/config/database');
const User = require('./api/models/user')

// Connect to Database
mongoose.connect(config.database);

// On Connection
mongoose.connection.on('connected', () => {
    console.log('connected to database ' + config.database);
});

mongoose.connection.on('error', (err) => {
    console.log('Database error ' + err);
});

let newUser = new User({
    name: "TESTUSER",
    email: "TESTMAIL",
    username: "TESTUSER",
    password: "TESTPW"
});

console.log(newUser.name);

User.addUser(newUser, (err, user) => {
    if(err){
        console.log('Failed to register user. Error: ' + err);
    } else {
       console.log('User registered');
    }
});

const app = express();

const users = require('./api/routes/users');
const blogs = require('./api/routes/blogs');

// Port Number
const port = process.env.PORT || 80;

// Body Parser Middleware
app.use(bodyParser.json());

// CORS Middleware
app.use(cors());

// Set Static Folder
app.use(express.static(path.join(__dirname, 'dist')));

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./api/config/passport')(passport);

app.use('/api/users', users);
app.use('/api/blogs', blogs);

// Index Route
app.get('*', function(req, res){
    res.sendfile(__dirname + '/dist/index.html');
});

// Start Server
app.listen(port, () => {
    console.log('Server startet on port ' + port);
} );