const mongoose = require("mongoose");

const subCategoriesSchemas = new mongoose.Schema({
    categoryName: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"categoriesdetails"
    },
    subCategoriesName: {
        type: String,
        required: true
    },
    icon: {
        type: String

    },
    color: {
        type: String
    },
    mainCategory: {
        type:String
    }
});
const subCategoriesDetails = new mongoose.model("subCategoriesDetails", subCategoriesSchemas);
module.exports = subCategoriesDetails;