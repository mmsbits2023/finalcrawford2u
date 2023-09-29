const OrderDetails = require("../Models/OrderDetails");
const ProductDetails = require("../Models/ProductDetails");
const ClientDetails = require("../Models/ClientDetails");
const AgentDetails = require("../Models/AgentDetails");
const universalFunction = require("../Functions/universalFunction");

exports.createOrder = async function (request, response, next) {
    try {
        const {
            OrderproductName,
            clientPhoneNumber,
            phoneNumber,
            productName,
            clientName1,
            productName1,
            code,
            amount,
            transactionMode,
            status,
            updated        
        } = request.body;

        const orderCheck = await OrderDetails.find({ OrderproductName: OrderproductName }).countDocuments();
         
        if (orderCheck.length > 0) {
            return response.status(400).send({
                status: "FAILURE",
                message: "Already ordered product here..."
            })
        }
       
        const clientData = await ClientDetails.find({ clientPhoneNumber:clientPhoneNumber });
        console.log("client data.....", clientData[0]);
        request.data = clientData[0];
        const clientdata = request.data.firstName;
        console.log("clientdata.....firstName...", clientData);

         const agentData = await AgentDetails.find({ phoneNumber:phoneNumber });
        console.log("agent data.....", agentData[0]);
        request.data = agentData[0];
        const agentdata = request.data.code;
        console.log("agentdata.....code...", agentData);
       
        const orderData = await OrderDetails();
        orderData.OrderproductName = OrderproductName;
        orderData.productName1 = productName;
        orderData.clientName1 = clientdata;
        orderData.code = agentdata;
        orderData.amount = amount;
        orderData.transactionMode = transactionMode;
        orderData.status = status;
        orderData.updated = updated;
       
       const data=await orderData.save(async (error, saveResult) => {
            if (error) { throw new Error(error) }
        
            let responseData = {
                status: "SUCCESS",
                message: "Order data added successfully",
                data: []
                            
            };
            universalFunction.sendResponse(request, response, responseData, next);
        })

    } catch (error) {
        console.log(error);
        next(error);
    }
};

exports.getAllOrderList = async function (request, response, next) {
    try {
                    
        const orderData = await OrderDetails.find();
               
        if (orderData.length === 0) {
            return response.status(404).send({
                status: "FAILURE",
                message: "Order data not found here..."
            })
        }
        
       
        let responseData = {
            status: "SUCCESS",
            message: " Show all order list data successfully",
            data: {
                orderData: orderData,
                count: orderData.length
            }
                            
        };
        universalFunction.sendResponse(request, response, responseData, next);

            
    } catch (error) {
        console.log(error);
        next(error);
    }
};
  
exports.getOneOrderDetails = async function (request, response, next) {
    try {
        const { productName1 } = request.body;
            
        const orderData = await OrderDetails.find({ productName1: productName1 });
               
        if (orderData.length === 0) {
            return response.status(404).send({
                status: "FAILURE",
                message: "Order data not found here..."
            })
        }
        
       
        let responseData = {
            status: "SUCCESS",
            message: " Show order data  of product successfully",
            data: {
                orderData: orderData,
            }
                            
        };
        universalFunction.sendResponse(request, response, responseData, next);
   
    } catch (error) {
        console.log(error);
        next(error);
    }
};
   
exports.updateOrderDetails = async function (request, response, next) {
    try {
        const {
            OrderproductName,
            clientPhoneNumber,
            phoneNumber,
            productName,
            clientName1,
            productName1,
            code,
            amount,
            transactionMode,
            status,
            updated        
        } = request.body;
        const orderCheck = await OrderDetails.findOne({ productName1: productName1 })
         
        if (orderCheck.length === 0) {
            return response.status(404).send({
                status: "FAILURE",
                message: "Order data not found here..."
            })
        }
        const clientData = await ClientDetails.find({ clientPhoneNumber:clientPhoneNumber });
        console.log("client data.....", clientData[0]);
        request.data = clientData[0];
        const clientdata = request.data.firstName;
        console.log("clientdata.....firstName...", clientData);

         const agentData = await AgentDetails.find({ phoneNumber:phoneNumber });
        console.log("agent data.....", agentData[0]);
        request.data = agentData[0];
        const agentdata = request.data.code;
        console.log("agentdata.....code...", agentData);
       
        const orderData = orderCheck[0];
        //orderData.OrderproductName = OrderproductName;
        orderCheck.productName1 = productName1;
        orderCheck.clientName1 = clientdata;
        orderCheck.code = agentdata;
        orderCheck.amount = amount;
        orderCheck.transactionMode = transactionMode;
        orderCheck.status = status;
        orderCheck.updated = updated;

        const data = orderCheck.save(async (error, saveResult) => {
            if (error) { throw new Error(error) }
        
            let responseData = {
                status: "SUCCESS",
                message: "Order data updated successfully",
                data: { orderCheck: orderCheck }
                            
            };
            universalFunction.sendResponse(request, response, responseData, next);
        })

    } catch (error) {
        console.log(error);
        next(error);
    }
};
   
exports.deleteOrder= async function (request, response, next) { 
    try {
        const { productName1 } = request.body;
       
        const orderCheck = await OrderDetails.deleteOne({ productName1: productName1 });
        
        if (orderCheck.length === 0) { 
           return response.status(404).send({
                status: "FAILURE",
                message:"Order not found here..."
            }) 
        }
        orderCheck.productName1 = productName1;
       
            let responseData = {
                status: "SUCCESS",
                message: "order deleted successfully",
                data: []
                            
            };
            universalFunction.sendResponse(request, response, responseData, next);

            
    } catch (error) {
        console.log(error);
        next(error);
     }
}
