const mongoose = require("mongoose");
const crypto = require("crypto");
const { v1: uuidv1 } = require("uuid");

const clientSchemas = new mongoose.Schema({

     agentcode: {
      type: mongoose.Types.ObjectId,
      ref: "agentDetails",
      
    }, 

    firstName: {
        type: String,
        required: ""
    },
    middleName: {
        type: String,
        required: ""
    },
    lastName: {
        type: String,
        required: ""
    },
    clientPhoneNumber: {
        type: String,
        required: ""
    },
    whatsAppNumber: {
        type: String,
    },
    adharCard: {
        type: String
    },
    panCard: {
        type: String
    },
    email: {
        type: String
    },
    pincode: {
        type: String
    },
    buildingName: {
        type: String
    },
    streetName:
    {
        type: String
    },
    code: {
        type: String
    },
    encry_password: {
        type: String
    },
    authToken: {
        type: String,
        default: ""
    },
    salt: {
        type: String,
        default: "",
    },
    firebaseToken: {
        type: String,
        default: "",
    },
    mpin: {
        type: String
    }
})

clientSchemas
.virtual("password")
.set( function(password){
  this._password=password;
  this.salt=uuidv1();
this.encry_password=this.securePassword(password); 

 })
.get(function(){
   return this._password
})

clientSchemas.methods = {
   authenticate:function(plainpassword){
     console.log(this.securePassword(plainpassword));
      console.log(this.securePassword(plainpassword) + "===" + this.encry_password);
      return this.securePassword(plainpassword) === this.encry_password;
   },
  securePassword:function(plainpassword){
      //console.log("securePassword",plainpassword);
      if(!plainpassword) return "";
      try{
      return crypto
      .createHmac("sha256",this.salt)
      .update(plainpassword)
      .digest("hex");
    
   }catch(err){return "";
   } 
   },
   };
  clientSchemas.methods.tOJSON = function () {
      var obj =this.toObject();
      delete obj.salt;
      return obj;
   }
module.exports= new mongoose.model("clientDetails",clientSchemas);