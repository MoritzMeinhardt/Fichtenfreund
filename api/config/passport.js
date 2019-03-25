const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user');
const config = require('./database');

module.exports = function(passport) {
    let opts = {};
    console.log("MYFUNCTION");
    //opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('Bearer');
    opts.secretOrKey = 'yoursecret'; //TODO SECRET IN ENVIRONEMTVARIABLE
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        console.log(jwt_payload);
        User.getUserById(jwt_payload.data._id, (err, user) => {
            if(err){
                return done(err, false);
            }

            if(user){
                return done(null, user);
            } else {
                return done(null, false);
            }
        })
    }));
}