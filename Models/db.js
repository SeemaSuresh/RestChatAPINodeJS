//This page contains all the queries to fethc, update, insert values to the mysql database that is used for this chat api 

var express = require('express');
app = express();
var db = express.Router();
var mysql = require('mysql');

//Connection string to the database
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'chat',
  database : 'chatdb'
});

connection.connect();

function login(email, password, callback){
  connection.query("select * from user where emailid = '" + email +"' and pwd = '" + password +"';",
      function(err, rows){
        if(err)
          callback(err, null);
        else
          callback(null, rows);
      });
}

function recvMessage( user, callback) {
  connection.query("select * from messages where sender = '" + user + "' or reciever= '" + user + "';", 
    function(err, rows){ 

      if (err){
        callback(err, null);
      }
      else
      {
        callback(null,rows);
      }
    });
}

function sendMessage(recv, user, message, callback)
{
  connection.query("Insert into messages(sender,reciever, message) values ('" + user + "','" + recv + "','" + message +"');",
    function(err, rows)
    { 
      if(err){

       callback(err,null);
     } 
     else{
          callback(null,rows);
          }
    });
}

function userFind(recv, callback) {
  connection.query("select emailid, fname, lname from user where emailid = '" + recv + "';", function(err, rows) { 
    if(err){

     callback(err,null);
   }
   else if(!rows.length) {
     callback(null,false);
   }
   else if(rows[0].emailid == recv){
     callback(null,rows);
   }
 });
}

function getAllUsers(callback)
{
  connection.query("select emailid from user;", function(err, rows) { 
    if(err){
     callback(err,null);
   }
   else if(!rows.length) {
     callback(null,false);
   }
   else{
     callback(null,rows);
   }
   
 });
}

function deleteUser(email, callback){
  connection.query("Delete from user where emailid = '" + email + "';", 
        function(err,rows){
                if (err) {
                    callback(err,null);
                } 
                else {
                    callback(null,rows);
                }
    });

}

function editProfile(email, fname, lname, callback)
{
  var query = "Update user SET ";
  if (fname !== undefined) {
    query = query + "fname = '" + fname + "',";
  }
  if (lname !== undefined) {
    query = query + "lname = '" + lname + "',";
  }

  // Removing the trailing comma
  query = query.substring(0, query.length - 1);

  query = query + " where emailid = '" + email + "' ;"
  connection.query(query, function (err, rows) {
    if (err) {
      callback(err,null);
    } else {
      callback(null,rows);
    }
  });
}

function createUser(email, password, callback){
  if(validateEmail(email))
  {
     connection.query("INSERT INTO user ( emailid, pwd ) values ('" + email +"','"+ password +"');", 
        function(err,rows){
                if (err) {
                    callback(err,null);
                } 
                else {
                    callback(null,rows);
                }
    });
  }
  else callback("email not valid", false);
}

//Checks if the user is in the session
function checkAuthentication(req, res, next){
  if(req.user){
      return true;
    }
    else{
      return false;
    }
}

//reference: http://stackoverflow.com/questions/46155/validate-email-address-in-javascript
function validateEmail(email, callback) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

module.exports = {
  recvMessage: recvMessage,
  userFind: userFind,
  sendMessage: sendMessage,
  editProfile: editProfile,
  getAllUsers: getAllUsers,
  createUser: createUser,
  deleteUser: deleteUser,
  login: login
};

