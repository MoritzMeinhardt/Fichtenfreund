const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const Blog = require('../models/blog');

router.get('/',  (req, res) => {
    Blog.find({}, (err, blogs) => {
        res.json(blogs);
    })
}).post('/', passport.authenticate('jwt', {session:false}), (req, res) => {
    let blog = new Blog(req.body);
    blog.save();
    res.status(201).send(blog);
});

router.get('/:id', (req, res) => {
    Blog.findById(req.params.id, (err, blog) => {
        res.json(blog)
    })
}).put('/:id', passport.authenticate('jwt', {session:false}), (req,res) => {
    Blog.findById(req.params.id, (err, blog) => {
        console.log(err);
        blog.title = req.body.title;
        blog.titlePicture = req.body.titlePicture;
        blog.paragraphs = req.body.paragraphs;
        blog.save();
        res.json(blog);
    })
}).patch('/:id', passport.authenticate('jwt', {session:false}), (req,res)=>{
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
}).delete('/:id', passport.authenticate('jwt', {session:false}), (req, res) => {
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

module.exports = router;