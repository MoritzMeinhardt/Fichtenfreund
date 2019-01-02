var express = require('express');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');
var app = express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
    /*res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");*/
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT, PATCH, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    next();
});

mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('db connected');
});

const blogSchema = new mongoose.Schema({
    title: String,
    titlePicture: String,
    paragraphs: [],
    comments: []
});

const Blog = mongoose.model('Blog', blogSchema);


app.get('/api/blogs',  (req, res) => {
    Blog.find({}, (err, blogs) => {
        res.json(blogs);
    })
}).post('/api/blogs', (req, res) => {
    let blog = new Blog(req.body);
    blog.save();
    res.status(201).send(blog);
});

app.get('/api/blogs/:id', (req, res) => {
    Blog.findById(req.params.id, (err, blog) => {
        res.json(blog)
    })
}).put('/api/blogs/:id', (req,res) => {
    Blog.findById(req.params.id, (err, blog) => {
        console.log(err);
        blog.title = req.body.title;
        blog.titlePicture = req.body.titlePicture;
        blog.paragraphs = req.body.paragraphs;
        blog.save();
        res.json(blog);
    })
}).patch('/api/blogs/:id', (req,res)=>{
        Blog.findById(req.params.id, (err, blog) => {
            if(req.body._id){
                delete req.body._id;
            }
            for( let b in req.body ){
                blog[b] = req.body[b];
            }
            blog.save();
            res.json(blog);
        })
    }).delete('/api/blogs/:id', (req, res) => {
        Blog.findById(req.params.id, (err, blog) => {
            blog.remove(err => {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.status(200).send('removed');
                }
            });
        })
});


app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});