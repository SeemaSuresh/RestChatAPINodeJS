var express = require('express');
app = express();
var chat = express.Router();
var db = require('../Models/db');


chat.post('/sendMessage/:receiver/:message', function(req, res, next) {
	   var recv = req.params.receiver;
	   var msg = req.params.message;
	   var user = req.user;

	   db.userFind(recv, function(err, result) {
	   			if(err) res.json({"error" :err});
	   			else if(!result) 
	   				{ 
	   					res.json({"message" : msg + "user not found"}); 
	   				}
	  			else
	  			{
	  				db.sendMessage(recv, user, msg, function(err, result){

	  					if(err) res.json({"error" :err});
	  					else if(!result) 
	  						{ 
	  							res.json({"message" : msg + "send failed"});
	  						}
	  					res.json({
	  						"message" : msg + " sent to " + recv
	  					});

	  				});
	  			}
	   });
	});


chat.get('/messages', function(req, res, callback){
	  var user = req.user;
	  db.recvMessage(user, function(err, result) {
	  	if(err) res.json({"error" :err});
	  	else
	  	res.json({"messages" : result});
	  });
});


module.exports = chat;

