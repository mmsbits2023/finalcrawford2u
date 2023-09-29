const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
    productData: {
        type: mongoose.Types.ObjectId,
        ref:"productdetails"
    },
    name: {
        type:String,
    },
    price: {
        type:String
    },
    countOfItem: {
        type:String
    },
    productName: {
        type:String
    }
       
}); 

const cartItemDetails = new mongoose.model("cartItemDetails", cartItemSchema);
module.exports = cartItemDetails;
