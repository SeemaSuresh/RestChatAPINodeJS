//This is the main router page with all the rest api calls to passport.js and logging out of the system

var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var app = express();
var port = process.env.PORT || 8080;
var router = express.Router();
var chat = require('./apiEndpoints/chat');
var user = require('./apiEndpoints/user');


const apiRoutes = express.Router(),
    authRoutes = express.Router();


var http = require('http')
  , req = http.IncomingMessage.prototype;

app.use(require('body-parser').urlencoded({ extended: true }));
var passport = require('./config/passport');

app.use(cookieParser());
app.use(bodyParser());
app.use(session({ secret: 'keyboard cat' }));
app.use(passport.initialize());
app.use(passport.session());


console.log('Localhost started: http://localhost:' + port);

app.get('/', function(req, res) {
	res.send('Hello! The API is at http://localhost:' + port);
});

//begin Passport authentication methods for signup, login 
app.get('/signup',
  function(req, res){
    res.send('The email id is already in use');
  });
  
app.post('/signup', 
  passport.authenticate('local-signup',
   { 
   	failureRedirect: '/signup'
   }),

  function(req, res) {
    res.send('post signup Okay');
  });

app.get('/login',
  function(req, res){
    res.json({"login" : "This is a post request"});
  });
  
app.post('/login', 
  passport.authenticate('local-login', 
  	{ 
  		failureRedirect: '/login'
  	}),
  function(req, res) {
    res.send('post login Okay');
  });

//END Passport authentication methods for signup, login

app.get('/logout',
  function(req, res){
    res.send('get logout');
  });
  
app.post('/logout', 
  function(req, res){
    var auth = checkAuthentication(req);
    if(auth)
    {
      req.logout();
      res.send('logged out');
      
    }
    else{
      res.send('already logged out');
    }
    
  });



//Checks if the user is in the session
function checkAuthentication(req, res, next){
  if(req.user){
      return true;
    }
    else{
      return false;
    }
}

app.use('/chat', chat);


app.use('/user', user);
app.listen(port, function (){
	console.log('server started on port: '+port);
});
 