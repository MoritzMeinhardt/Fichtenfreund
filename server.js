
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./api/config/database');

//File Upload
const multer = require('multer');
const fs = require('fs');

const upload = multer({
    dest: 'uploads/' // this saves your file into a directory called "uploads"
});

// Connect to Database
mongoose.connect(config.database);

// On Connection
mongoose.connection.on('connected', () => {
    console.log('connected to database ' + config.database);
});

mongoose.connection.on('error', (err) => {
    console.log('Database error ' + err);
});

const app = express();

const users = require('./api/routes/users');
const blogs = require('./api/routes/blogs');

// Port Number
const port = process.env.PORT || 80;

// Body Parser Middleware
app.use(bodyParser.json());

// CORS Middleware
//app.use(cors()); // TODO FIXME dont use online but use offline
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});


// Set Static Folder
app.use(express.static(path.join(__dirname, 'dist')));

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./api/config/passport')(passport);

app.use('/api/users', users);
app.use('/api/blogs', blogs);


// It's very crucial that the file name matches the name attribute in your html
app.post('/api/file-upload', upload.single('file-to-upload'), (req, res) => {

    /** When using the "single"
     data come in "req.file" regardless of the attribute "name". **/
    var tmp_path = req.file.path;

    /** The original name of the uploaded file
     stored in the variable "originalname". **/
    var target_path = 'uploads/' + req.file.originalname;

    /** A better way to copy the uploaded file. **/
    var src = fs.createReadStream(tmp_path);
    var dest = fs.createWriteStream(target_path);
    src.pipe(dest);
    src.on('end', function() { res.json({sucess: 'true', path: target_path}); });
    src.on('error', function(err) { res.json({sucess: 'false ', err: err, path: null}) });
});

// Index Route
app.get('*', function(req, res){
    res.sendFile(__dirname + '/dist/index.html');
});

// Start Server
app.listen(port, () => {
    console.log('Server startet on port ' + port);
} );