const agentController = require('../../Controller/AgentClient');
const agentSchema = require('../../Schemas/AgentClientSchema');
const universalFunction = require('../../Functions/universalFunction');
const validationFunction = require("../../Functions/validationFunction");
const Router = require("express").Router();


//AgentRegister API
Router.route('/register').post(
   validationFunction.validateUser(agentSchema.generateRegisterSchema),
   agentController.registerAgent
);

//Login API
Router.route('/login').post(

    validationFunction.validateUser(agentSchema.verifyLoginSchema),
    agentController.loginAgent
);
//Logout API
Router.route('/logout').post(
    universalFunction.authenticateUser,
    validationFunction.validateUser(agentSchema.logoutAgentSchemas),
    agentController.agentLogout
);
 
//Get All Agent List
Router.route('/getAllAgentList').post(
        agentController.getAllAgentList
);
//Get One Agent Details
Router.route('/getOneAgentDetails').post(
    universalFunction.authenticateUser,
    validationFunction.validateUser(agentSchema.getOneAgentSchemas),
    agentController.getOneAgentDetails
);

//Update Agent Details
Router.route('/updateAgentDetails').post(
    universalFunction.authenticateUser,
    validationFunction.validateUser(agentSchema.updateAgentSchemas),
    agentController.updateAgentDetails
)
//Delete Agent Details
Router.route('/deleteAgentDetails').post(
    universalFunction.authenticateUser,
    validationFunction.validateUser(agentSchema.deleteAgentSchemas),
    agentController.deleteAgent
)
exports.Router=Router;
















