
const clientController=require('../../Controller/AgentClient')
const agentSchema = require('../../Schemas/AgentClientSchema');
const clientSchema = require('../../Schemas/AgentClientSchema');
const validationFunction = require("../../Functions/validationFunction");
const universalFunction = require("../../Functions/universalFunction");
const Router = require("express").Router();

//ClientRegister API
Router.route('/clientregister').post(
   validationFunction.validateUser(agentSchema.generateRegisterSchema),
   clientController.registerClient
);

//Login API
Router.route('/clientlogin').post(

    validationFunction.validateUser(clientSchema.clientLoginSchema),
    clientController.loginClient
)
//Get All Client List
Router.route('/getAllClientList').post(
     clientController.getAllClientList
)
//Get One Client Details
Router.route('/getOneClientDetails').post(
    universalFunction.authenticateUser,
    validationFunction.validateUser(clientSchema.getOneClientSchemas),
    clientController.getOneClientDetails
)
//Update Client Details
Router.route('/updateClientDetails').post(
    universalFunction.authenticateUser,
    validationFunction.validateUser(clientSchema.updateClientSchemas),
    clientController.updateClientDetails
)
//Delete Client Details
Router.route('/deleteClientDetails').post(
    universalFunction.authenticateUser,
    validationFunction.validateUser(clientSchema.deleteClientSchemas),
    clientController.deleteClient
)
 //Logout API
Router.route('/clientLogout').post(
    universalFunction.authenticateUser,
    validationFunction.validateUser(clientSchema.logoutClientSchemas),
    clientController.clientLogout
);
exports.Router=Router;