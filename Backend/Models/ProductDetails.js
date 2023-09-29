const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    productsName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    richDescription: {
        type: String,
        default: ""
    },
    image: {
        type: String,
        default: ""
    },
    imageString: [{
        type: String,
        
    }],
    brand: {
        type: String,
        default: ""
    },
    price: {
        type: String,
        default: 0
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "categoriesDetails"
    },
    countInStock: {
        type: String,
        required: true,
        min: 0,
        max: 255
    },
    rating: {
        type: String,
        required: true
    },
    isFeatured: {
        type: Boolean,
        required: true
    },
    dateCreated: {
        type: Date,
        default: Date.now()
    },
    mainCategory: {
        type: String,
            }
});
const productDetails = new mongoose.model("productDetails", productSchema);
module.exports = productDetails;