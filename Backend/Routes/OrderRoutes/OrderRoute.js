const Router = require("express").Router();
const validationFunction = require("../../Functions/validationFunction");
const orderSchema = require("../../Schemas/OrderSchemas");
const orderController = require("../../Controller/Orders");

//createOrder API
Router.route('/createOrder').post(
   validationFunction.validateUser(orderSchema.createOrderSchemas),
   orderController.createOrder
);
//Get All Order List API
Router.route('/getAllOrderList').post(
    orderController.getAllOrderList
);
//Get One Order Details API
Router.route('/getOneOrderDetails').post(
    validationFunction.validateUser(orderSchema.getOneOrderSchemas),
    orderController.getOneOrderDetails
);

//Update Order Details API
Router.route('/updateOrderDetails').post(
    validationFunction.validateUser(orderSchema.updateOrderSchemas),
    orderController.updateOrderDetails
);

//Delete Order  API
Router.route('/deleteOrder').post(
    validationFunction.validateUser(orderSchema.deleteOrderSchemas),
    orderController.deleteOrder
);
exports.Router=Router;