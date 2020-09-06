/* @afreen */
// import user model
var User = require('../models/user');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//define a user schema
var userSchema = new Schema({
    userID:{type:String,default:'AF801136632'},
    firstName:{type:String,default:'AFREEN'},
    lastName:{type:String,default:'-'},
    email:{type:String,default:'a4@uncc.edu'},
    password:{type:String,default:'password'},
    address:{type:String,default:'9551 University Terrace Dr'},
    city:{type:String,default:'Charlotte'},
    state:{type:String,default:'North Carolina'},
    zipcode:{type:Number,default:282862},
    country:{type:String,default:'USA'},
});
var users=mongoose.model("users",userSchema);

module.exports = {

    getUser:async function(userid)
    {
     
      console.log("in getUser()");
      return new Promise((resolve, reject) => {
          users
          .find({userID:userid})
          .then((data) => {
            let users = [];
            data.forEach((user) => {
              let userObj = new User();
  
              userObj.userid = user.userID;
              userObj.fname = user.firstName;
              userObj.lname = user.lastName;
              userObj.mail = user.email;
              userObj.pwd = user.password;
              userObj.addressfield = user.address;
              userObj.cityname=user.city;
              userObj.statename=user.state;
              userObj.zip=user.zipcode;
              userObj.countryname=user.country;

              users.push(userObj);
             
            });

            resolve(users[0]);
          })
          .catch((err) => {
            return null;
          });
      });
    },
    registerUser: function(userobj){
     
      console.log("in register user func");
      return new Promise((resolve, reject) => {
          users.findOneAndUpdate(
            {userID:userobj.userID},
            {
              userID: userobj.userID,
              firstName: userobj.firstName,
              lastName : userobj.lastName,
              email : userobj.email,
              password: userobj.password,
              address: userobj.address,
              city: userobj.city,
              state: userobj.state,
              zipcode: userobj.zipcode,
              country: userobj.country
            },
            {upsert:true})
          .then((data) => {
            console.log(" saved user to db");
            resolve(data);
          })
          .catch((err) => {
            return reject(err);
          });
      });

  }

}