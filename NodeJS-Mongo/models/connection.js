/* @afreen */
/*This model is used to represent a connection in the application.
*It provides getters and setters to get and set various properties like 
*connection id,name,topic,details,date,location,start and end time.
*/
class connection {
    constructor( connectionID,connectionName,connectionTopic,details,date,starttime,endtime,location) {
      this.connectionID = connectionID;
      this.connectionName=connectionName;
      this.connectionTopic=connectionTopic;
      this.details=details;
      this.date=date;
      this.starttime=starttime;
      this.endtime=endtime;
      this.location=location;
     
    }
    get connID() {
      return this.connectionID;
    }
    set connID(x) {
      this.connectionID = x;
    }
    get connName() {
        return this.connectionName;
      }
      set connName(x) {
        this.connectionName = x;
      }
      get connTopic() {
        return this.connectionTopic;
      }
      set connTopic(x) {
        this.connectionTopic = x;
      }
      get detls() {
        return this.details;
      }
      set detls(x) {
        this.details = x;
      }
      get stim() {
        return this.starttime;
      }
      set stim(x) {
        this.starttime = x;
      }
      get etim() {
        return this.endtime;
      }
      set etim(x) {
        this.endtime = x;
      }
      get dte() {
        return this.date;
      }
      set dte(x) {
        this.date = x;
      }
      get loc()
      {
        return this.location;
      }
      set loc(x)
      {
      this.location = x;
      }
  }
//export connection class
module.exports = connection;