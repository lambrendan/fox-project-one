// User.js 

var mongoose = require('mongoose');
var crypto = require('crypto');

//Schema to define how the user data is stored
var UserSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    }
});

//Saves user's password in its hashed form
UserSchema.pre( 'save', function(next){
    var user = this;
    var hmac = crypto.createHash('sha256').update(user.password).digest('hex');
    user.password = hmac;
    next();
})

//Compare password function
UserSchema.methods.comparePassword = function(password, cb ) {
    var hmac = crypto.createHash('sha256').update(password).digest('hex');
    console.log(hmac); 
    console.log(this.password);
    if( this.password != hmac ) {
        isMatch = false;
        return cb(null, isMatch);
    }
    else {
        isMatch = true;
        return cb(null, isMatch);
    }
}

module.exports = mongoose.model('User', UserSchema);