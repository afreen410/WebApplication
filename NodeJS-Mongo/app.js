/* @afreen */

//setup express to use for routing
const express = require('express');
const app = express();
var connections=require('./routes/connections');
var common=require('./routes/commonroutes');
var alert=require('alert-node');
const bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/sports-meetup', {useNewUrlParser: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connection successful!');
});

//session handling
var session = require("express-session");
app.use(session({ secret: "nbad session secret" }));
//set view engine to EJS
app.set('view engine','ejs');

//set the path for static resources to be accessible
app.use('/assets',express.static('./assets'));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(function(req, res, next) {
    res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
    next();
  });
// app.js is used to route incoming requests to their appropriate controllers
//these controllers will contain the functionality  logic, communicate with the model 
//and get the needed data to complete a successful response. 
app.use('/connections',connections);
app.use('/',common);

//configure server to listen on a defined port
app.listen(8080,function()
{
    console.log('server listening on port 8080');
});