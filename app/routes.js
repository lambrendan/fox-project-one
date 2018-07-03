//route.js

//Module set-up
var mongoose = require('mongoose');
var passport = require('passport');

var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();
var User = require('../app/model/user');

var figlet = require('figlet');

require('../config/passport')(passport);
var config = require('../config/database');

//Router for signing up users
router.post('/signup', function(req, res){
    //Check to make sure that an email, username, and password was enetered
    if( !req.body.email || !req.body.username || !req.body.password ) {
        res.json({success: false, message: 'Please enter an email, username, and password.' });
    }
    //Create a new user
    else {
        var newUser = new User({
            email: req.body.email,
            username: req.body.username,
            password: req.body.password
        });

        //Save the user
        newUser.save(function(err){
            if(err) {
                return res.json({ success: false, message: 'That username already exists.'});
            }
            res.json({ success: true, message: 'Successfully created new user. '});
            figlet('Welcome', function( err, data ) {
                if (err ) {
                    console.log('Oops');
                }
                else {
                    console.log(data);
                }
            })
        });
    }
});

//Router for user log-in
router.post('/signin', function(req, res){
    //Find a username using built-in find function and throw an error if not found 
    User.findOne({ 
        username: req.body.username 
    }, function(err, user) {
        if( err ) throw err;
        if( !user ) {
            res.send({ success: false, message: 'User not found. Try again.' });
        }
        //Compare passwords and check to make sure they are correct.
        else {
            user.comparePassword( req.body.password, function(err, isMatch){
                //If password matches, create a Json token
                if( isMatch && !err ) {
                    var token = jwt.sign(user.toJSON(), config.secret, { expiresIn: 604800 } );
                    res.json({ success: true, token: 'JWT: ' + token});
                    figlet('Back Already?', function( err, data ) {
                        if (err ) {
                            console.log('Oops');
                        }
                        else {
                            console.log(data);
                        }
                    })
                }
                else {
                    res.json({ success: false, message: '   Wrong password entered.'});
                    figlet('Stop hacking accounts', function( err, data ) {
                        if (err ) {
                            console.log('Oops');
                        }
                        else {
                            console.log(data);
                        }
                    })
                    //res.status(401).send({ success: false, msg: 'Wrong password entered.'});
                }
            });
        }
    });
});

//Router for deleting a User
router.delete('/delete/:username', function(req, res){
    User.findOneAndRemove( {username: req.params.username}, function(err, user) {
        if(err || !user) {
            return res.json({ success: false, message:  "Couldn't find username" });
        }
        res.json({ success: true, message: 'Successfully deleted User'});
        figlet('Mr. Stark... I dont feel so good', function( err, data ) {
            if (err ) {
                console.log('Oops');
            }
            else {
                console.log(data);
            }
        })
    });
});

//Looking up the user first and then deleting

//Authentication
router.get('/dashboard', passport.authenticate('jwt', { session: false }), function( req, res) {
    res.send('It worked! User id is: ' + req.user._id + '.' );
});

module.exports = router;