// server.js 

//Setting up the modules that are needed ==============================================
var express = require('express');
var appl = express();

var bodyParser = require('body-parser');
var morgan = require('morgan');
var passport = require('passport');
var jwt = require ('jsonwebtoken');
var mongoose = require('mongoose');

//Parse the body for the POST requests =============================================== 
appl.use(bodyParser.urlencoded({ extended: false }));  
appl.use(bodyParser.json());

//Setup express application ===========================================================
var configDB = require('./config/database');

//Connect to the database =============================================================
mongoose.connect(configDB.database);

//Configuring the User ================================================================
var User = require('./app/model/user');

//Initialize passport =================================================================
appl.use( passport.initialize());
require('./config/passport')(passport);

//Configure the API ===================================================================
var api = require('./app/routes');
appl.use('/api', api);

//Specify the Port =====================================================================
appl.listen(3000, '0.0.0.0');



