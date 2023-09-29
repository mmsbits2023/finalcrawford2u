const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
    agentcode: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"agentDetails"
    },
    clientName: {
        type: mongoose.SchemaTypes.Types.ObjectId,
        ref:"clientDetails"
    },
    productName: {
        type: mongoose.SchemaTypes.Types.ObjectId,
        ref:"productDetails"
    },
    status: {
        type:String,
    },
    updated: {
        type:Date
    },
    paymentMode: {
        type:String
    },
    paymentAmount: {
        type:String
    },
    billsUrl: {
        type:String
    }
    
    
}); 

const transactionDetails = new mongoose.model("transactionDetails", transactionSchema);
module.exports = transactionDetails;
