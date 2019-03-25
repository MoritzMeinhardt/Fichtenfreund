
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./api/config/database');
const User = require('./api/models/user');
const Blog = require('./api/models/blog');

// Connect to Database
mongoose.connect(config.database);

// On Connection
mongoose.connection.on('connected', () => {
    console.log('connected to database ' + config.database);
});

mongoose.connection.on('error', (err) => {
    console.log('Database error ' + err);
});

// --------------------------------------------------------------------------------------------------------------
let newUser = new User({
    name: "TESTUSER",
    email: "TESTMAIL",
    username: "TESTUSER",
    password: "TESTPW"
});

let newBlog = new Blog({
    title: "MEIN TEST TITEL",
    titlePicture: 'https://images.unsplash.com/photo-1496857239036-1fb137683000?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80',
    paragraphs: [],
    comments: []
});

console.log(newUser.name);
console.log(newBlog.title);

User.addUser(newUser, (err, user) => {
    if(err){
        console.log('Failed to register user. Error: ' + err);
    } else {
       console.log('User registered', user);
    }
});

Blog.addBlog(newBlog, (err, blog) => {
    if(err){
        console.log('Failed to register blog. Error: ' + err);
    } else {
        console.log('Blog registered', blog);
    }
});

// ------------------------------------------------------------------------------------------------------------------------

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
    res.sendFile(__dirname + '/dist/index.html');
});

// Start Server
app.listen(port, () => {
    console.log('Server startet on port ' + port);
} );