/* @afreen */
/*This controller is responsible for handling and directing requests that
 pertain to displaying the categories of connections (catalog) and individual 
 connection details.
 */
const { check, validationResult,sanitize } = require('express-validator');
const alert=require('alert-node');
var connectionDB = require('../utility/connectionDB.js');
var connection=require('../models/connection');

//userconnection binds the rsvp to a connection
const userconnection=require('../models/userconnection');


//userprofile object is used to invoke the functions of userprofile
var userprofile = require('../utility/userProfileDB');

/* This function brings all connection models from the database and sends that data
   to the connections view for display.
 */
var getAllConnections = async (req,res) => {
    var connections = await connectionDB.getAllConnections();
    // res.render('connections',{connections:connections,user:req.session.user});
    res.render('connections',{connections:connections,user:req.session.user});
}
/*
 *This function responds by bringing the requested connection model from the database 
 and sending that data to the connection view for display. If the connection ID is not present 
 then it redirects a user to the connections page.
 */
var getConnection =async (req,res)=>{
    var connection = await connectionDB.getConnection(req.params.id);

    if(connection == undefined)
    {
        res.redirect('/connections');
    }
    res.render('connection',{connection:connection,user:req.session.user});
    
}


/**Save a new connection */
var newConnection = async (req,res)=>
{
  const errors = validationResult(req);
    if (errors.array().length!=0) {
      req.session.errors= errors.array();
      res.render('newConnection',{user:req.session.user,errors:req.session.errors,success:false});
      // return res.status(422).json({ errors: errors.array() })
    }
else{
  //create a connection obj n save it.
 
    var newConnection= new connection(req.body.connid,req.body.name,req.body.topic,req.body.details,
      req.body.date,req.body.stime,req.body.etime,req.body.where);
      await connectionDB.saveNewConnection(newConnection);
      var userConnection = new userconnection(req.session.theUser.userID,newConnection,'yes');
    
      await userprofile.addUserConnection(userConnection);
      alluserconns=await userprofile.getAllUserConnections(req.session.theUser.userID);
      res.render('savedConnections',{user:req.session.user,userprofile:alluserconns});


    // var connections = await connectionDB.getAllConnections();
    // res.render('connections',{connections:connections,user:req.session.user});
}
}



/**
 * export the controller functions
 */
module.exports = {
    getAllConnections: getAllConnections,
    getConnection:getConnection,
    newConnection:newConnection
};