//prompt.js
var prompt = require('prompt');
var got = require('got');



//Start the prompt
prompt.start();

//Function that asks for user input
const getCommand = () => {
    prompt.get('command', function(err, result) {
        if (result.command === 'signup') {
            getSignupInput();
        } 
        else if( result.command === 'signin' ) {
            getSigninInput();
        }
        else if (result.command === 'delete' ) {
            getDeleteInput();
        }
        else if (result.command === 'quit') {
            console.log('Thanks for coming!');
            process.exit(0);
        }
        else {
            console.log('Please enter a valid command')
            getCommand();
        }
    });
};

//Function to prompt user to signup
const getSignupInput = () => {
    prompt.get(['email', 'username', 'password'],function(err, res) {
        const signup = got.post('http://localhost:3000/api/signup', {
             body: {
                "email": res.email,
                "username": res.username,
                "password": res.password
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
    }); 
};

//Function to prompt user to signin
const getSigninInput = () => {
    prompt.get(['username', 'password'], function(err, res) {
        const signin = got.post('http://localhost:3000/api/signin', {
             body: {
                "username": res.username,
                "password": res.password
            },
            json: true
        });
        signin  
            .then(function(res){
                console.log(res.body);
            })
            .catch(function(err){
                console.log(err);
            });
    });
}

//Function to prompt user to delete
const getDeleteInput = () => {
    prompt.get('username', function(err,res) {
        const deleteUser = got.delete('http://localhost:3000/api/delete/' + res.username );
        deleteUser  
            .then(function(res){
                console.log(res.body);
            })
            .catch(function(err){
                console.log(err);
            });
    });
}

//Function call to getCommand
getCommand();


/* 
prompt.get('command', function(err, result) {
     console.log('Please enter a command:') 
     if (err) {
         console.log( 'Bad Command!');
     }
     else {
         //Continue prompting until quit is entered
         while( result != 'quit') {
             //If user entered signup, 
             if( result == 'signup' ) {
                 prompt.get(['username, email, password'],function(err, res) {
                     const signup = got.post('http://localhost:3000/api/signup', {
                          body: {
                             "email": res.email,
                             "username": res.username,
                             "password": res.password
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
                 });                
             }
             //If user entered signin
             else if( result == 'signin') {
                 prompt.get(['username, password'], function(err, res) {
                     const signin = got.post('http://localhost:3000/api/signin', {
                          body: {
                             "username": res.username,
                             "password": res.password
                         },
                         json: true
                     });
                     signin  
                         .then(function(res){
                             console.log(res.body)
                         })
                         .catch(function(err){
                             console.log(err)
                         });
                 });
             }
             //If user entered delete
             else if (result == 'delete') {
                prompt.get('username', function(err,res) {
                     const deleteUser = got.delete('http://localhost:3000/api/delete/' + res.username );
                     deleteUser  
                         .then(function(res){
                             console.log(res.body)
                         })
                         .catch(function(err){
                             console.log(err)
                         });
                 });
             }
             //Reprompt the user to enter a command here 
             prompt.get('command', function(err,res) {
                 result = res.command;
             });
             console.log('Please enter a new command!: ');
         }
     }
}); */