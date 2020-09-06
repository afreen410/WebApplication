/* @afreen */
/* This controller handles general (root) request , new connection, saved connection,
 * about and contact request.
 */
//setup express to use for routing
var express=require('express');
//set up router to define routes
var router = express.Router();
//get an object for user controller
var UserController= require('../controllers/UserController');

//require alert-node to display alerts
var alert= require('alert-node');
//define root request
router.get('/', function(req,res)
{
    res.render('index',{user:req.session.user});
});
//define /index request and direct it to the root
router.get('/index', function(req,res)
{
    res.render('index',{user:req.session.user});
});
router.all('/login',UserController);

//define /newConnection request which is used to create new connections
router.get('/newConnection', function(req,res)
{
    if(req.session.theUser)
    {
    res.render('newConnection',{user:req.session.user,errors:req.session.errors,success:true});
    }
    else{
        alert('User needs to login to create a connection!');
        res.redirect('/login');
    }
});

router.post('/newConnection', UserController);


// this route takes us to saved connections page
router.all('/savedConnections', UserController);

//handling delete connection on saved connections page
router.get('/deleteconnection',UserController);

//handling update connection on saved connections page
router.get('/updateconnection',UserController);

//this route takes us back to homepage and destroys a session
router.all('/logout', UserController);

// this route takes us to about-us page
router.get('/about',function(req,res)
{
    res.render('about',{user:req.session.user});
});

// this route takes us to contact page
router.get('/contact',function(req,res)
{
    res.render('contact',{user:req.session.user});
});

router.get('/signup',function(req,res)
{
    res.render('signup',{success:true,errors:req.session.errors});
});

router.post('/signup',UserController);

// default route when user manually enters something in url
router.get('/*',function(req,res)
{
    if(req.session!=undefined)
    {
        res.redirect('/');
    // res.render('index',{user:req.session.user});
    }
    else{
        res.redirect('/login');
        // res.render('login',{user:req.session.user,errors:req.session.errors,success:true});
    }
});

//export the router
module.exports = router;