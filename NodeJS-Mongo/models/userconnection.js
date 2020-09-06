/* @afreen */
/**
 * User connection class is used to store an rsvp for a particular connection for a given user.
 */
class userConnection {
    constructor(userid,connection, rsvp) {
        this.userID=userid;
        this.connection = connection;
        this.rsvp = rsvp;
    }

    get userid()
    {
        return this.userID;
    }
    set userid(x)
    {
        this.userID=x;
    }
    get conn(){
        return this.connection;
    }

    set conn(x){
        this.connection=x;
    }
    
    get response()
    {
        return this.rsvp;
    }

    set response(x)
    {
        return this.rsvp;
    }
}
module.exports=userConnection;