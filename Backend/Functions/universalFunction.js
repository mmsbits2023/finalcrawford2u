const AgentDetails = require("../Models/AgentDetails");
const ClientDetails = require("../Models/ClientDetails");
const secretyKey = "abcdefghijklmnopqrstuvwxyzabcdef";
const jwt = require("jsonwebtoken");
module.exports = {
  sendResponse: async function (request, response, responseData, next) {
    response.status(201).send(responseData);
  },
      
  authenticateUser: async function (request, response,error, next) {
    try {
      console.log("Hello Authentication...!");
      console.log("authentication code", request.body)
      if (request && request.headers && request.headers.authorization) {
        // if(request.body !== undefine){}
        
        if (Object.keys(request.body).length === 0 && request.body.constructor === Object) {
          var { phoneNumber } = request.query;
          var { clientPhoneNumber } = request.query;
        } else {
          var { phoneNumber } = request.body
          var { clientPhoneNumber } = request.body;
        }
        //const token1 = request.cookies.jwt;
        const token = request.headers.authorization;
        console.log(token);
        console.log("Incoming data", request.body);
                 
        const agentCheck = await AgentDetails.find({ phoneNumber: phoneNumber });
        /* request.token = token;
        request.agentCheck = agentCheck;*/
                        
        if (agentCheck.length === 0) {
          return response.status(401).send({
            status: "FAILURE",
            message: " Authentication failed! please login again"
          })
        }
      }
      const clientCheck = await ClientDetails.find({ clientPhoneNumber: clientPhoneNumber });
                                      
      if (clientCheck.length === 0) {
        return response.status(401).send({
          status: "FAILURE",
          message: " Authentication failed! please login again"
        })
      }
      console.log(error);
              
      jwt.verify(
        token, `${secretyKey}-${agentCheck[0].authToken}`,
        async function (error, data) {
                     
          console.log(error);
          if (error) {
            return response.status(401).send({
              status: "FAILURE",
              message: " Authentication failed! jwt token not match"
            })
               
                      
          } else {
                            
            console.log("jwt verification successfully");
            request.user = agentCheck[0];
                    
            next();
          }
        }
      )
    }
    catch (error) {
      console.log(error);
      return response.status(401).send({
        status: "FAILURE",
        message: "Authentication failed! please login again",
      });
        
    }
  }
}  



      