var express = require('express');
app = express();
var user = express.Router();
var db = require('../Models/db');

user.post('/editProfile/:email', function(req, res, next){
	var email = req.params.email;
	var fname = req.query.fname;
	var lname = req.query.lname;
	console.log(email + fname + lname);
	  if(req.user == email ) {
	  	db.editProfile(email, fname, lname, function(err, result){
	  		if(err) res.json({"error" :err});
	  		else
	  			res.json({"editResult" : result});	
	  	});
	  }
	  else
	    res.send("User not authenticated"); 	   
});

user.get('/viewProfile/:email', function(req, res, next){
	var recv = req.params.email;
	   db.userFind(recv, function(err, result){
	   		if(err) res.json({"error" :err});
	  		else
	  			res.json({"searchResult" : result});	
	   });
});


user.get('/listUsers', function(req, res, next){
	db.getAllUsers(function(err, result){
	   		if(err) 
	   			res.json({"error" :err});
	  		else
	  			res.json({"AllUsers" : result});	
	   });	   
});

user.delete('/deleteProfile' , function(req, res, next)
{
	var email = req.user;
			db.deleteUser(email, function(err, result){
				if(err) res.json({"error": err});
				else{
					res.json({"user" : "deleted"});
					app.get('/logout');
				}
			});
});

module.exports = user;