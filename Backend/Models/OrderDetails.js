const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    productName: {
        type: mongoose.Types.ObjectId,
        ref: "productDetails"
    },
    clientName: {
        type: mongoose.Types.ObjectId,
        ref: "clientDetails"
    },
    clientName1: {
        type:String,
    },
     productName1: {
        type:String,
    },
    agentCode: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"agentDetails"
    },
    code: {
        type:String,
    },
     amount: {
        type:String
    },
    transactionMode: {
        type:String
    },
    status: {
        type:String,
    },
    updated: {
        type:Date
    },
   
    
    
}); 

const orderDetails = new mongoose.model("orderDetails", orderSchema);
module.exports = orderDetails;
