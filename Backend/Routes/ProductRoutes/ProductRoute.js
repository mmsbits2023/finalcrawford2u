const Router = require("express").Router();
const validationFUnction = require("../../Functions/validationFunction");
const productController = require("../../Controller/Products");
const productSchemas = require("../../Schemas/ProductSchemas");

//Add Products API
Router.route('/addProduct').post(
    validationFUnction.validateUser(productSchemas.addProductSchemas),
    productController.addProducts
);
//Get All Products List API
Router.route('/getAllProductsList').post(
   
    productController.getAllProductsList
);
//Get One Product Details API
Router.route('/getOneProductDetails').post(
    validationFUnction.validateUser(productSchemas.getOneProductDetailsSchemas),
    productController.getOneProductDetails
);
//Update Products Details API
Router.route('/updateProductDetails').post(
    validationFUnction.validateUser(productSchemas.updateProductDetailsSchemas),
    productController.updateProductDetails
)
//Delete Products API
Router.route('/deleteProduct').post(
    validationFUnction.validateUser(productSchemas.deleteProductSchemas),
    productController.deleteProducts
);
exports.Router=Router;