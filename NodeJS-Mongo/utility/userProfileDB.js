/* @afreen */
/**
 * This module is responsible to get all user connections, add and remove a user connection.
 */

// import userconnection model
var connectionDB=require('./connectionDB');
var userConnection=require('../models/userconnection');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//define user connection schema
var userconnSchema = new Schema({
    userID:{type:String,default:'AF801136632'},
    connection:{type:Schema.Types.Mixed,default:'default connection object'},
    rsvp:{type:String,default:'yes,no,maybe'},
});
var userconnections=mongoose.model("userconnections",userconnSchema);
// export getConnections and getConnection function
module.exports = {

    getAllUserConnections: function(id){
        // return connections
        console.log("in getalluserconnections()");
        return new Promise((resolve, reject) => {
            userconnections
            .find({userID:id})
            .then((data) => {
              console.log("fetched all connections from db");
    
              let userconnections = [];
              data.forEach((userconnection) => {
                let userconnObj = new userConnection();
    
                userconnObj.userID = userconnection.userID;
                userconnObj.connection = userconnection.connection;
                userconnObj.rsvp = userconnection.rsvp;
                userconnections.push(userconnObj);
          
              });
              //resolve with array of data object
              resolve(userconnections);
            })
            .catch((err) => {
              return reject(err);
            });
        });

    },

    addUserConnection:function(userconnection) {
        return new Promise((resolve, reject) => {
            userconnections
            .findOneAndUpdate(
              {
                $and: [
                  { userID: userconnection.userid },
                  { connection: userconnection.conn },
                ]
              },
              {
                userID: userconnection.userID ,
               connection: userconnection.connection,
               rsvp:userconnection.rsvp
             },
             {
               upsert:true
             })
             .then ((data)=> {
              console.log("course either updated or added.");
              console.log(data);
              resolve(data);
             })
            .catch((err) => {
              console.log('ERROR : DURING ADDITION OF USER CONNECTION')
              return reject(err);
            });
        });
      },

      
      removeUserConnection:function(userconnection) {
        return new Promise((resolve, reject) => {
            userconnections
            .remove(
              {
                $and: [
                  { userID: userconnection.userID },
                  { connection: userconnection.connection },
                ],
              }
            ).then(( data)=> {
                console.log("user connection deleted!");
                resolve(data);
              }
            )
            .catch((error) => {
              return reject(error);
            });
        });
      }

  
}






