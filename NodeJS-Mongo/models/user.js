/* @afreen */
/*This model is used to represent a user in the application.
*It provides getters and setters to get and set various properties like 
*User ID,First Name,Last Name,Email Address,Address Field,City,State,Zip Code,Country
*/
class user {
    constructor( userID,firstName,lastName,email,password,address,city,state,zipcode,country){
      this.userID = userID;
      this.firstName=firstName;
      this.lastName=lastName;
      this.email=email;
      this.password=password;
      this.address=address;
      this.city=city;
      this.state=state;
      this.zipcode=zipcode;
      this.country=country;
     
    }
    get userid() {
      return this.userID;
    }
    set userid(x) {
      this.userID = x;
    }
    get fname() {
        return this.firstName;
      }
      set fname(x) {
        this.firstName = x;
      }
      get lname() {
        return this.lastName;
      }
      set lname(x) {
        this.lastName = x;
      }
    get mail()
    {
      return this.email;
    }
    set mail(x)
    {
      this.email=x;
    }
    get pwd()
    {
      return this.password;
    }
    set  pwd(x)
    {
      this.password=x;
    }
      get addressfield() {
        return this.address;
      }
      set addressfield(x) {
        this.address = x;
      }
      get cityname() {
        return this.city;
      }
      set cityname(x) {
        this.city = x;
      }
      get statename() {
        return this.state;
      }
      set statename(x) {
        this.state = x;
      }
      get zip() {
        return this.zipcode;
      }
      set zip(x) {
        this.zipcode = x;
      }
      get countryname()
      {
        return this.country;
      }
      set countryname(x)
      {
      this.country = x;
      }
  }
//export user class
module.exports = user;