var args = require('args');
const got = require('got');
const prompt = require('prompt');

//HTTP Post to signup a user
const signup = function(name, sub, option) { 
    const signup = got.post('http://localhost:3000/api/signup', {
        body: {
            "email": option.email,
            "username": option.username,
            "password": option.password
        },
        json: true
    });
    signup  
        .then(function(res){
            console.log(res.body)
        })
        .catch(function(err){
            console.log(err)
        });
};

//HTTP Post to signin a user
const signin = function(name, sub, option) {
    const signin = got.post('http://localhost:3000/api/signin', {
        body: {
            "username": option.username,
            "password": option.password
        }, json: true
    });
    signin  
        .then(function(res){
            console.log(res.body)
        })
        .catch(function(err){
            console.log('Wrong password');
        });
};

//HTTP Delete to delete a user
const deleteUser = function(name, sub, option ) {
    var urlS = 'http://localhost:3000/api/delete/' + option.username;
    console.log(urlS);
    const deleteUser = got.delete(urlS);
    deleteUser
        .then(function(res){
            console.log(res.body);
        })
        .catch(function(err){
            console.log(err)
        });
};

//Create the command-line options
args 
    
    .option(['u', 'username'], 'Enter a username')
    .option(['e', 'email'], 'Enter an email')
    .option(['p', 'password'], 'Enter a password')
    .command('signup', 'User sign-up', signup)
    .command('signin', 'User sign-in', signin)
    .command('delete', 'Delete the user', deleteUser)

    const flags = args.parse(process.argv);
    var inputCommand = args.sub[0].toString();

    //Check to make sure that the correct commands were inputted
    if( inputCommand.trim() != 'signup' && inputCommand.trim() != 'signin' && inputCommand.trim() != 'delete' ){
        args.showHelp();
    }




