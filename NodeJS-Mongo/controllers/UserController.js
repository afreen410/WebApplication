/* @afreen */
/*This controller is responsible for handling and directing requests that
 pertain to a particular user
 */
const express = require("express");

const router = express.Router();
//userprofile object is used to invoke the functions of userprofile
var userprofile = require('../utility/userProfileDB');

//user object is used to save user details 
const user=require('../models/user');

var alert=require('alert-node');

//userconnection binds the rsvp to a connection
const userconnection=require('../models/userconnection');

var connection=require('../models/connection');

//require variables for validation
const { check, validationResult,sanitize } = require('express-validator');


//connectionDB is used to get the list of connections and get a connection for a given connection id
var connectionDB = require('../utility/connectionDB.js');

const userDB=require("../utility/userDB");

 //POST handling parsers
var bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({ extended: false });





//define route to login a user
router.get('/login',function(req,res,next)
{
    res.render('login',{user:req.session.user,errors:req.session.errors,success:true});
});
/*When a login form is submitted  a post request is made to login,
and user session object is created to store username, a userobj session object is 
created to store a user and a user profile session object is created with a an empty
list of connections and the userobj. 
*/
router.post('/login',   check('username').custom(async (value,{req})=>{
  var user = await userDB.getUser(req.body.username);
    if(user==null)
    {
      throw new Error('Invalid UserID : User does not exist!');
    }
    if(user.password!=req.body.password)
    {
      throw new Error('Invalid Password!!');
    }
    return true;
 }),
 urlencodedParser,async function(req,res,next)
{

  const errors = validationResult(req);
  if (errors.array().length!=0) {
    req.session.errors= errors.array();
    res.render('login',{user:req.session.user,errors:req.session.errors,success:false});
    
  }

else{
  var user = await userDB.getUser(req.body.username);
      req.session.user = user.firstName+" "+user.lastName;
    req.session.theUser=user; 

      var connections=await userprofile.getAllUserConnections(req.session.theUser.userID);

      res.render('savedConnections',{user:req.session.user,userprofile:connections});
    next();
}
});


router.post('/signup',check('userid').custom((value,{req})=>{
  var letters = /^[0-9a-zA-Z]+$/;
  if(!value.match(letters))
  {
      throw new Error('UserID can contain only alphanumeric characters');
  }
  return true;
 }),
 check('fname').custom((value,{req})=>{
  var letters = /^[ a-zA-Z]+$/;
  if(!value.match(letters))
  {
      throw new Error('First name can contain only letters and spaces.');
  }
  return true;
 }),
 check('lname').custom((value,{req})=>{
  var letters = /^[ a-zA-Z]+$/;
  if(!value.match(letters))
  {
      throw new Error('Last name can contain only letters and spaces.');
  }
  return true;
 }),
 check('email').isEmail().withMessage('Email is invalid'),
 check('email').custom((value,{req})=>{
  if(!value.toLowerCase().endsWith("@uncc.edu"))
  {
      throw new Error('Use UNCC registered email id (Ex:a4@uncc.edu).');
  }
  return true;
 }),
 check('password').custom((value,{req})=>{
  var condition = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
  if(!value.match(condition)) {
    throw new Error('Password must contain one lowercase letter,one uppercase letter and a digit and the length should be between 6 and 20.');
  }
  return true;
 }
  ),
  check('confirmpassword').custom((value,{req})=>{
   
    if(!(value == req.body.password)) {
      throw new Error('Passwords do not match!');
    }
    return true;
   }
    ),
    check('city').custom((value,{req})=>{
      var letters = /^[ a-zA-Z]+$/;
      if(!value.match(letters))
      {
          throw new Error('City name can contain only letters and spaces.');
      }
      return true;
     }),
     check('state').custom((value,{req})=>{
      var letters = /^[ a-zA-Z]+$/;
      if(!value.match(letters))
      {
          throw new Error('State name can contain only letters and spaces.');
      }
      return true;
     }),
     check('country').custom((value,{req})=>{
      var letters = /^[ a-zA-Z]+$/;
      if(!value.match(letters))
      {
          throw new Error('Country name can contain only letters and spaces.');
      }
      return true;
     }),
     check('address').custom((value,{req})=>{
      var letters = /^[0-9a-zA-Z ,]+$/;
      if(!value.match(letters))
      {
          throw new Error('Address can contain only numbers, letters, comma and spaces.');
      }
      return true;
     }),
     check('zipcode').custom((value,{req})=>{
     
      if( value.toString().length<5)
      {
          throw new Error('Zipcode should have atleast 5 digits.');
      }
      return true;
     }),urlencodedParser,async function(req,res,next)
{
  const errors = validationResult(req)
  if (errors.array().length!=0) {
    req.session.errors=errors.array() ;
    res.render('signup',{success:false,errors:req.session.errors});
    // return res.status(422).json({ errors: errors.array() })
  }
else{
  var reqBody = req.body;
  var userobj = new user(reqBody.userid,reqBody.fname,reqBody.lname,reqBody.email,
    reqBody.password,reqBody.address,reqBody.city,reqBody.state,reqBody.zipcode,reqBody.country);
  await userDB.registerUser(userobj);
  alert('User Registered Successfully!');
  res.redirect('/newConnection');
}
  
});


/*A get req to saved connection occurs when a user provides an rsvp to a connection,
the saved connections of user are displayed. 
*/
router.get('/savedConnections',urlencodedParser,async function(req,res,next)
{
  if(req.session.theUser!=undefined)
  {

    var connection= await connectionDB.getConnection(req.query.connobj);
    var userConnection = new userconnection(req.session.theUser.userID,connection,req.query.rsvp);
      //Allow user to have a valid rsvp
      if((req.query.rsvp=='yes'||req.query.rsvp=='maybe'||req.query.rsvp=='no'))
      {
        var alluserconns=await userprofile.getAllUserConnections(req.session.theUser.userID);
        console.log('ALL USER CONNS'+alluserconns);
        if(connection != undefined)
        {
          await userprofile.addUserConnection(userConnection);
          alluserconns=await userprofile.getAllUserConnections(req.session.theUser.userID);
          res.render('savedConnections',{user:req.session.user,userprofile:alluserconns});
        }
        //when a user enters an invalid connectionID in url
        else
        {
          res.redirect('/connections');
          // res.render('savedConnections',{user:req.session.user,userprofile:userconnections});
        }

      }
    
  }
  else{
    alert('user needs to login');
    res.redirect('/login');
  }
  next();
});

/*This is invoked when a a user clicks on myconnections to view his/her saved connections*/
router.get('/savedConnections',async function(req,res,next){
  if(req.session.theUser!=undefined)
  {
    var userconnections=await userprofile.getAllUserConnections(req.session.theUser.userID);
    res.render('savedConnections',{user:req.session.user,userprofile:userconnections});
  }
  next();
});
/*This is invoked when a user selects update connection in saved connections table */
router.get('/updateconnection',async function(req,res)
{
      var connection= await connectionDB.getConnection(req.query.connobj);
    req.session.update='yes';
    if(connection!=undefined)
    {
    res.render('connection',{connection:connection,user:req.session.user});
    }
    //when a user enters an invalid connectionID in url
    else{
     
      res.redirect('/connections');
      }
    
  });

/*This is invoked when a user selects delete connection in saved connections table */
router.get('/deleteconnection',async function(req,res)
{
  if(req.session.theUser!=undefined)
  {
    var connection=await connectionDB.getConnection(req.query.connobj);
    if(connection!=undefined)
    {
    var userConnection = new userconnection(req.session.theUser.userID,connection,'response');
    await userprofile.removeUserConnection(userConnection);
    var userconnections=await userprofile.getAllUserConnections(req.session.theUser.userID);
    res.render('savedConnections',{user:req.session.user,userprofile:userconnections});
  
    }
    /*When user enters a connectionID in url and tries to delete it redirect to connections page*/
    else{
     
      res.redirect('/connections');
      }
    // else{
    //   var userconnections=await userprofile.getAllUserConnections(req.session.theUser.userID);
    //   res.render('savedConnections',{user:req.session.user,userprofile:userconnections});
    // }
  }
});




/**When a user logs out, the session object is destroyed */
router.all("/logout", urlencodedParser, function(req,res, next) {

    //delete session info
    req.session.destroy(function(err) {
      if (err) {
        console.log("error deleting session");
      } else {
        console.log("session deleted");
      }
      next();
    });
    res.redirect('/index');
  });
/**
 * export the controller functions
 */
module.exports = router;