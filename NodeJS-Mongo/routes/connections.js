/* @afreen */
/* connection.js is responsible to invoke connections controller based on the url 
given by the use. If a user requests a /connections url then the controller calls 
getAllConnections method and if the user requests for /connections/id then the details of
a particular connection is displayed.
 */
//setup express to use for routing
var express=require('express');
//set up router to define routes
var router = express.Router();

const { check, validationResult,sanitize } = require('express-validator');

var ConnectionsController = require('../controllers/ConnectionsController');

router.get('/',ConnectionsController.getAllConnections);
router.get('/:id',ConnectionsController.getConnection);
router.post('/newConnection',
check('connid').isAlphanumeric().withMessage('Connection ID must contain only alphabets and numbers.')
    .isLength({min:4}).withMessage('Connection ID length should be minimum 4 digits long.'),
check('name').custom((value,{req})=>{
    var letters = /^[a-zA-Z ]+$/;
    if(!value.match(letters))
    {
        throw new Error('Connection Name can contain only alphabets and spaces.');
    }
    return true;
    }),
check('topic').custom((value,{req})=>{
var letters = /^[a-zA-Z ]+$/;
if(!value.match(letters))
{
    throw new Error('Connection Topic can contain only alphabets and spaces.');
}
return true;
}),
check('details').custom((value,{req})=>{
    var letters = /^[a-zA-Z !.,]+$/;
    if(!value.match(letters))
    {
        throw new Error('Connection Details can contain only alphabets and spaces and special chars(! , . ).');
    }
    return true;
    }),
    check('date').custom((value,{req})=>{
        var today = new Date();
        entered_date = new Date(value);
        if(today.getTime() >entered_date.getTime()) 
        {
                throw new Error('Events can be created after today\'s date.');
           
        }
        return true;
        }),
        check('stime').custom((value, { req }) => {
        
            arr = value.split(':');
            shour = arr[0];
            smin = arr[1];
            arr2 = req.body.etime.split(':');
            ehour = arr2[0];
            emin = arr2[1];
    
            if (shour>ehour) {
                throw new Error('Start time should not be greater than end time');
              }
             else if(shour==ehour) {
                if(smin>=emin)
                {
                    throw new Error('Start time should not be greater than end time'); 
                }
              }
              return true;
        }
        ).withMessage('Start time should not be greater than end time!'),
            check('where').custom((value,{req})=>{
                var letters = /^[a-zA-Z 0-9,]+$/;
                if(!value.match(letters))
                {
                    throw new Error('Connection Location can contain only alphabets, spaces number and comma.');
                }
                return true;
                }),
   
   
    ConnectionsController.newConnection);
//export the router
module.exports = router;