var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var db = require('../Models/db');

  passport.use('local-signup',new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
   },
   function(email, password, done) {
        var recv = email;
        db.userFind(recv, function(err, result){
            if (err)
                return done(err, false);
            else if (result.length) {
                return done(null, false);
            } else {
                db.createUser(email, password, function(err, result){
                if (err) return done(err);
                var user = JSON.stringify(result[0]);
                return done(null, email);
                });
            }
        });
    }));
    
    passport.use('local-login',new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
   },
    function( email, password, done) { 
         db.login(email, password, function(err, result){
            if (err)
                return done(err, false);
            else if (result.length) 
                return done(null, email);    
    });

    }));

    passport.serializeUser(function(user, done) {
        done(null, user);
    });

    passport.deserializeUser(function(user, done) {
         var recv = user;
        db.userFind(recv, function(err, result){
           done(err, user);
        });
    });
module.exports = passport;
