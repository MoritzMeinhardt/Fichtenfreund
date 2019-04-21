const mongoose = require('mongoose');
const config = require('../config/database');

// Blog Schema
const BlogSchema = new mongoose.Schema({
    title: String,
    titlePicture: String,
    paragraphs: [],
    comments: [],
    galleryImages: []
});

const Blog = module.exports = mongoose.model('Blog', BlogSchema);

module.exports.getBlogById = function(id, callback) {
    User.findById(id, callback);
};

/*module.exports.getBlogByUsername = function(username, callback) {
    const query = {username: username};
    User.findOne(query, callback);
};*/

module.exports.addBlog = function(newBlog, callback){
    newBlog.save(callback);
    /*bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if(err) throw err;
            newUser.password = hash;
            newUser.save(callback);
        })
    });*/
};

/*
module.exports.comparePassword = function(candidatePassword, hash, callback){
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
        if(err) throw err;
        callback(null, isMatch);
    });
};*/
