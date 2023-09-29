const mongoose = require("mongoose");

const categoriesSchemas = new mongoose.Schema({
    name: {
        type: String,
        required:true
    },
    categoryNumber: {
        type:String
    }
    });
const categoriesDetails = new mongoose.model("categoriesDetails", categoriesSchemas);
module.exports = categoriesDetails;