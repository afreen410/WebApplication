/* @afreen */
// import connection model
var Connection = require('../models/connection');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var alert=require('alert-node');
//Define connection schema
var connSchema = new Schema({
    connectionID:{type:String,default:'defaultID'},
    connectionName:{type:String,default:'defaultName'},
    connectionTopic:{type:String,default:'defaultTopic'},
    details:{type:String,default:'details..'},
    date:{type:Date,default:Date.now},
    starttime:{type:String,default:'11:00am'},
    endtime:{type:String,default:'12:00pm'},
    location:{type:String,default:'UNC Charlotte'}
});
var connections=mongoose.model("connections",connSchema);
// export getAllConnections and getConnection and saveNewConnection function
module.exports = {

    getAllConnections: function(){
        // return connections
        console.log("in getconnections()");
        return new Promise((resolve, reject) => {
            connections
            .find({})
            .then((data) => {
              let connections = [];
              data.forEach((connection) => {
                let connObj = new Connection();
                connObj.connID = connection.connectionID;
                connObj.connName = connection.connectionName;
                connObj.connTopic = connection.connectionTopic;
                connObj.detls = connection.details;
                connObj.stim = connection.starttime;
                connObj.etim = connection.endtime;
                connObj.dte = connection.date;
                connObj.loc=connection.location;
    
                connections.push(connObj);
               
              });
              resolve(connections);
            })
            .catch((err) => {
              return reject(err);
            });
        });

    },


    saveNewConnection: function(newconn){
      // save connections
      console.log("in save new connection()");
      return new Promise((resolve, reject) => {
          connections.findOneAndUpdate(
            {connectionID:newconn.connectionID},
            {
              connectionID:newconn.connectionID,
              connectionName:newconn.connectionName,
              connectionTopic:newconn.connectionTopic,
              details:newconn.details,
              date:newconn.date,
              starttime:newconn.starttime,
              endtime:newconn.endtime,
              location:newconn.location
            },
            {upsert:true})
          .then((data) => {
            console.log(" saved connections to db");
            alert('Saved connection to database!');
            resolve(data);
          })
          .catch((err) => {
            return reject(err);
          });
      });

  },


    getConnection:async function(id)
    {
     
      console.log("in getconnection()");
      return new Promise((resolve, reject) => {
          connections
          .find({connectionID:id})
          .then((data) => {
            let connections = [];
            data.forEach((connection) => {
              let connObj = new Connection();
              connObj.connID = connection.connectionID;
              connObj.connName = connection.connectionName;
              connObj.connTopic = connection.connectionTopic;
              connObj.detls = connection.details;
              connObj.stim = connection.starttime;
              connObj.etim = connection.endtime;
              connObj.dte = connection.date;
              connObj.loc=connection.location;
  
              connections.push(connObj);
             
            });
            console.log('in get connection i will return '+JSON.stringify(connections[0]));
            resolve(connections[0]);
          })
          .catch((err) => {
            return reject(err);
          });
      });
    }
}