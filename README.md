# RestChatAPINodeJS

This is a nodejs and mysql application with REST based Chat APIs (get, post, delete) to send message, get message, search user, list all users, edit and delete profiles with checks to include authenication using passportJS, sanitzation using regex match.

This project was run on a Windows 10 machine with npm. The end points for each of the REST APIs were tested using the postman app.

MYSQL Database: 

The name of the database is "chatdb" run on localhost root user with "chat" as can be seen in the db.js connection string to DB.
    It has 2 tables user and messages.
     user has 5 columns - id, emailid, pwd, fname, lname
     messages has 3 columns - sender, reciever, message
 
The nodejs application has 5 files index.js, config/passport.js , apiEndpoints/chat.js, apiEndpoints/user.js and models/db.js file.

I'll discuss the functionality of each file below.

index.js:
This is the main routing file and contains all the REST get, post and delete functionalities and references to the page passport, chat and user.
Methods: GET and POST - /signup - Allows the user to register to the chat application. 
                                  checks for email validity and duplication (Sanity check)
         GET and POST - /login - Allows an laready registered user to login and create an active express session
         GET and POST - /logout - Allows the user to signout and end session
        The above methods make use of passport.js functions for authentication

apiEndpoints/chat.js: 
this page has two REST methods to get messages and post messages
Methods: POST - chat/sendMessage/:receiver/:message - Allows user to send message by specifying the receiver and the message to the receiver
                                                  Checks if the receiver is valid user before sending.
                                                  Checks if the sender is in active session.
                                                  
         GET - chat/messages - Allows user to get all the messages sent and received by him. 
                          The user has to be logged in to be able to see his inbox messages


apiEndpoints/user.js:
This file has all the user based REST methods to search for a particular user, list all the users, edit and delete his own profile.
Methods: POST - /editProfile/:email - Allows the user to edit his details like email, pwd, fname, lname
                                    - Checks if the user is logged in with the same email id before letting him make changes
         GET - user/viewProfile/:email - Lets the user search for a particular user by passing the emailid in the query
         GET - user/listUsers - Gives the list of email, first and last names of all the registered users
         DELETE - user/deleteProfile - Allows the user to remove his registration and delete his data from the user table
                                     - USer needs to be in active session before he can perform the delete operation
                                     
Models/db.js:

This file has all the method calls from the above files that can run and retrieve query results from the database. 

Instructions to run the application:
1. Install nodejs and mysql
2. Run the script for database from the repo to import the schema and the datadump used in this application
3. install node packages specified in the package.json file by running the command "npm install --save". (express, bodyparser, cookieparser needs individual installation like "npm install --save express)
4. Once all the packages have been installed and the mysql is setup with the server details like )localhost, user: root, password: chat), copy all the js files with the folders as available in the repository above. Node Modules folder is not to be copied.
5. once everything is setup, from command prompt in this folder run "node index.js". This will instantiate a localhost server on the port 8080
6. Open Postman app and test the following urls (Please note that the GET, POST and DELETE calls have to be made by choosing the appropriate method from the dropdown on the top-left corner of the postman app)
       
    a. POST - http://localhost:8080/signup 
         For POST signup and login the parameters have to be passed in the "Body"  by selecting "x-www-form-urlencoded radio button" and giving the key values as
         email                        cirtual@gmail.com
         password                     test
         {Success Message: post signup Okay
          Failure Message: The email id is already in use}
          
    b. POST - http://localhost:8080/logout
        returns: logged out
        POST - http://localhost:8080/logout
        returns: already logged out
         
    c. POST - http://http://localhost:8080/login
        For POST signup and login the parameters have to be passed in the "Body"  by selecting "x-www-form-urlencoded radio button" and giving the key values as
         email                        signup@gmail.com
         password                     test
         {Success Message: Post Login Okay
          Failure MEssage:   "login": "Credentials not Found/Matched"}
          
    d. GET - http://localhost:8080/chat/messages
        Lists all messages user has been a part of if available
        
    e. POST - http://localhost:8080/chat/sendMessage/seema@gmail.com/hello%20there
       Returns -  "message": "hello there user not found"
       POST - http://localhost:8080/chat/sendMessage/test@gmail.com/hello%20there
       Returns - "message": "hello there sent to test@gmail.com"
       
    f. POST - http://localhost:8080/user/editProfile/abc@abc.com
       Returns: User not authenticated
       POST - http://localhost:8080/user/editProfile/signup@gmail.com?fname=test
       returns - {
                  "editResult": {
                    "fieldCount": 0,
                    "affectedRows": 1,
                    "insertId": 0,
                    "serverStatus": 34,
                    "warningCount": 0,
                    "message": "(Rows matched: 1  Changed: 0  Warnings: 0",
                    "protocol41": true,
                    "changedRows": 0
                  }
                }
                
      g. GET - http://localhost:8080/user/listUsers
         returns - List of all users (emailid)
         
      h. GET - http://localhost:8080/user/viewProfile/john@gmail.com
         returns - {
                      "searchResult": [
                        {
                          "emailid": "john@gmail.com",
                          "fname": "Snow",
                          "lname": null
                        }
                      ]
                    }
          GET - http://localhost:8080/user/viewProfile/john1@gmail.com
          returns - {
                      "searchResult": false
                    }
                    
                    
       i. DELETE - http://localhost:8080/user/deleteProfile
          returns - {
                      "user": "deleted"
                    }
                    
                    
                    
             
         
       
