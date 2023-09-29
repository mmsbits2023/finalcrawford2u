const AgentDetails = require("../Models/AgentDetails");
const ClientDetails = require("../Models/ClientDetails");
const universalFunction = require('../Functions/universalFunction');
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const secretyKey = "abcdefghijklmnopqrstuvwxyzabcdef";


exports.registerAgent = (async (request, response, next) => {
    try {
        
        const {
            firstName,
            middleName,
            lastName,
            phoneNumber,
            whatsAppNumber,
            alternativeNumber,
            adharCard,
            panCard,
            email,
            password1,
            mpin,
            pinCode,
            buildingName,
            flatNumber,
            streetName,
            code
        } = request.body;
        console.log(request.body.pinCode)
        const agentData = await AgentDetails.find({ phoneNumber: phoneNumber }).countDocuments();
        if (agentData > 0) {
            return response.status(409).send({
                status: "FAILURE",
                message: "Agent mobile number already exist"
            })
        }
        if (pinCode && typeof pinCode === 'string' && pinCode.length >= 6) {
            var agentCodeData = pinCode.slice(3, 6);
        }
        console.log("agentCodeData....", pinCode.slice(3, 6));
          
            
         let areaCodeLetter;
        if (pinCode >= 400001 && pinCode <= 400010) {
            areaCodeLetter = "A";
        } else if (pinCode >= 400011 && pinCode <= 400020) {
            areaCodeLetter = "B";
        }
        if (pinCode >= 400021 && pinCode <= 400030) {
            areaCodeLetter = "C";
        } else if (pinCode >= 400031 && pinCode <= 400040) {
            areaCodeLetter = "D";
        }if (pinCode >= 400041 && pinCode <= 400050) {
            areaCodeLetter = "E";
        } else if (pinCode >= 400051 && pinCode <= 400060) {
            areaCodeLetter = "F";
        }if (pinCode >= 400061 && pinCode <= 400070) {
            areaCodeLetter = "G";
        } else if (pinCode >= 400071 && pinCode <= 400080) {
            areaCodeLetter = "H";
        }if (pinCode >= 400081 && pinCode <= 400090) {
            areaCodeLetter = "I";
        } else if (pinCode >= 400091 && pinCode <= 400100) {
            areaCodeLetter = "J";
        }
        
        var agentCode =
            areaCodeLetter +
            agentCodeData+
            firstName.charAt(0) +
            middleName.charAt(0) +
            lastName.charAt(0);
       
            
       console.log("agent code is", agentCode);
        const agentDetailsCheck = new AgentDetails();
        agentDetailsCheck.firstName = firstName;
        agentDetailsCheck.middleName = middleName;
        agentDetailsCheck.lastName = lastName;
        agentDetailsCheck.phoneNumber = phoneNumber;
        agentDetailsCheck.whatsAppNumber = whatsAppNumber;
        agentDetailsCheck.alternativeNumber = alternativeNumber;
        agentDetailsCheck.adharCard = adharCard;
        agentDetailsCheck.panCard = panCard;
        agentDetailsCheck.email = email;
       agentDetailsCheck.password = password1;
        agentDetailsCheck.pinCode = pinCode;
       agentDetailsCheck.code = agentCode;
        agentDetailsCheck.buildingName = buildingName;
        agentDetailsCheck.flatNumber = flatNumber;
        agentDetailsCheck.streetName = streetName;
        console.log("agentDetails", agentDetailsCheck);
       
        const agentdetails = agentDetailsCheck.save(async function (error, saveResult) {
           if (error) { throw new Error(error); }
            
            
            let responseData = {
                status: "SUCCESS",
                message: "Agent  registered successfully",
                data: []
                            
            }; universalFunction.sendResponse(request, response, responseData, next);
           
        }
        
        );
        
    } catch (error) {
        console.log(error);
        next(error);
       
    }

});

exports.registerClient = (async (request, response, next) => {
    try {
        const {
            firstName,
            middleName,
            lastName,
            clientPhoneNumber,
            whatsAppNumber,
            adharCard,
            panCard,
            email,
            mpin,
            pincode,
            buildingName,
            streetName,
            phoneNumber,
            agentCode,
            
        } = request.body;
       
        const clientData = await ClientDetails.find({ clientPhoneNumber: clientPhoneNumber }).countDocuments();
        if (clientData > 0) {
            return response.status(409).send({
                status: "FAILURE",
                message: "Client mobile number already exist"
            })
        }
    
        const phoneNumber1 = await AgentDetails.find({ phoneNumber: phoneNumber });
        console.log("All agent details here....", phoneNumber1[0]);
        request.data = phoneNumber1[0];
        console.log("code of agent is", request.data.code);
        const pindata = request.data.code;
        var pindata1 = pindata.slice(1, 4);

         if (pincode && typeof pincode === 'string' && pincode.length >= 6) {
            var clientCodeData = pincode.slice(3, 6);
        }
        //console.log("clientCodeData....", pincode.slice(3, 6));
        if (pindata1 == clientCodeData) {
            const clientDetailsCheck = new ClientDetails();
            clientDetailsCheck.firstName = firstName;
            clientDetailsCheck.middleName = middleName;
            clientDetailsCheck.lastName = lastName;
            clientDetailsCheck.clientPhoneNumber = clientPhoneNumber;
            clientDetailsCheck.whatsAppNumber = whatsAppNumber;
            clientDetailsCheck.adharCard = adharCard;
            clientDetailsCheck.panCard = panCard;
            clientDetailsCheck.email = email;
            clientDetailsCheck.password = mpin;
            clientDetailsCheck.pincode = pincode;
            clientDetailsCheck.code = request.data.code;
            clientDetailsCheck.buildingName = buildingName;
            clientDetailsCheck.streetName = streetName;
            console.log("clientDetails", clientDetailsCheck);
       
            const clientdetails = clientDetailsCheck.save(async function (error, saveResult) {
                if (error) { throw new Error(error); }
                
                let responseData = {
                    status: "SUCCESS",
                    message: "Client  registered successfully",
                    data: []
                                    
                }; universalFunction.sendResponse(request, response, responseData, next);
            },
               
            );
        } else {
            let responseData = {
                status: "FAILURE",
                message: "Client pincode not match ",
                data: []
                    
            }; universalFunction.sendResponse(request, response, responseData, next);
        }
    
            
    } 
     catch (error) {
            console.log(error);
            next();
        }
    
    });

exports.loginAgent= async function (request, response, next) {
    try {
        const { email,phoneNumber,mpin} = request.body;
        const agentData = await AgentDetails.find({ phoneNumber:phoneNumber,email:email});

        if (agentData.length === 0) {
            return response.status(400).send({
                status: "FAILURE",
                message: " Invalid phone number "
            })
        }
        
        if (!agentData[0].authenticate(mpin)) {
            let responseData = {
                status: "FAILURE",
                message: "Invalid Mpin",
                data: { verified: false }
            };
            universalFunction.sendResponse(request,response, responseData, next);
        } else {
            const salt = crypto.randomBytes(16).toString("hex");
            agentData[0].authToken = salt;

            agentData[0].save(async (error, result) => {
                if (error) {
                    throw new Error(error);
                }
                var jsonPayload = {
                    phoneNumber: phoneNumber,
                    email: email,
                    mpin:mpin
                    
                };
                const jwtData = jwt.sign(jsonPayload, `${secretyKey}-${salt}`, {
                    expiresIn: "1d",
                });
                
               console.log("jwtData",jwtData)

                let responseData = {
                    status: "SUCCESS",
                    message: "LOgin successfully",
                    data: {
                        verified: "true",
                        phoneNumber:phoneNumber,
                        authToken: jwtData,
                    },
                };
                universalFunction.sendResponse(request, response, responseData, next);
           
            })
        }

    } catch (error) {
        next(error);
    }

};

exports.loginClient = async function (request, response, next) {
    try {
        const { clientPhoneNumber,mpin} = request.body;
        const clientData = await ClientDetails.find({ clientPhoneNumber:clientPhoneNumber });

        if (clientData.length === 0) {
            return response.status(400).send({
                status: "FAILURE",
                message: " Invalid phone number "
            })
        }
        if (!clientData[0].authenticate(mpin)) {
            let responseData = {
                status: "FAILURE",
                message: "Invalid Mpin",
                data: { verified: false }
            };
            universalFunction.sendResponse(request,response, responseData, next);
        } else {
            const salt = crypto.randomBytes(16).toString("hex");
            clientData[0].authToken = salt;

            clientData[0].save(async (error, result) => {
                if (error) {
                    throw new Error(error);
                }
                var jsonPayload = {
                    clientPhoneNumber: clientPhoneNumber
                };
                const jwtData = jwt.sign(jsonPayload, `${secretyKey}-${salt}`, {
                    expiresIn: "50d",
                });
                let responseData = {
                    status: "SUCCESS",
                    message: "LOgin successfully",
                    data: {
                        verified: "true",
                        clientPhoneNumber:clientPhoneNumber,
                        authToken: jwtData,
                    },
                };
                universalFunction.sendResponse(request, response, responseData, next);
                         });
        }
            
    } catch (error) {
        next(error);
    }

};
exports.agentLogout = async (request, response, next) => {
    try {
        const { phoneNumber,email,mpin } = request.body;
        
        const agentData = await AgentDetails.find({ phoneNumber: phoneNumber,email:email });
        
        if (agentData.length === 0) { 
            return response.status(404).send({
                status: "FAILURE",
                message:"Agent Data not found here..."
            })
        }
        
        console.log("All agent details here....", agentData[0]);
        request.user = agentData[0];
        console.log("authToken of agent is", request.user.authToken);
                
        const data = await AgentDetails.updateOne({ phoneNumber: phoneNumber },{ $unset: { authToken: "" } })
        
        
        let responseData = {
            status: "SUCCESS",
            message: "Agent Logout Successfully",
            data: []
        }
        universalFunction.sendResponse(request, response, responseData, next);
  
    } catch (error) {
        console.log(error);
        next(error);
    }
};
exports.clientLogout = async (request, response, next) => {
    try {
        const { clientPhoneNumber } = request.body;
        
        const clientData = await ClientDetails.find({ clientPhoneNumber: clientPhoneNumber });
        
        if (clientData.length === 0) { 
            return response.status(404).send({
                status: "FAILURE",
                message:"Client Data not found here..."
            })
        }
        
        console.log("All client details here....", clientData[0]);
        request.user = clientData[0];
        console.log("authToken of client is", request.user.authToken);
                
        const data = await ClientDetails.updateOne({ clientPhoneNumber: clientPhoneNumber },{ $unset: { authToken: "" } })
        
        
        let responseData = {
            status: "SUCCESS",
            message: "Client Logout Successfully",
            data: []
        }
        universalFunction.sendResponse(request, response, responseData, next);
  
    } catch (error) {
        console.log(error);
        next(error);
    }
};
 exports.getAllAgentList=async function (request,response,next){
    try{
       
       var agentDetailsList=await AgentDetails.find();    
    
       if(agentDetailsList.length === 0 ){
        return response.status(400).send({
            status:"FAILURE",
            message:" Agent  data not  found"
        }); 
       }
       let responseData={
        status:"SUCCESS",
        message:"List of all agent",
        data:{
            agentDetailsList:agentDetailsList,
            count:agentDetailsList.length,
        },
       };
       universalFunction.sendResponse(request,response,responseData,next);

    }catch(error){
        next(error);
    }
  };
     exports.getAllClientList=async function (request,response,next){
    try{
       
       var clientDetailsList=await ClientDetails.find();    
    
       if(clientDetailsList.length === 0 ){
        return response.status(400).send({
            status:"FAILURE",
            message:" Client  data not  found"
        }); 
       }
       let responseData={
        status:"SUCCESS",
        message:"List of all client",
        data:{
            clientDetailsList:clientDetailsList,
            count:clientDetailsList.length,
        },
       };
       universalFunction.sendResponse(request,response,responseData,next);

    }catch(error){
        next(error);
    }
};
  exports.getOneAgentDetails=async function (request,response,next){
    try{
       const {phoneNumber}=request.body;
            
      const agentDetails= await AgentDetails.find({phoneNumber:phoneNumber});
           
        if (agentDetails.length === 0)
       {
        return response.status(404).send({
            status:"FAILURE",
            message:" Agent data not  found"
        }); 
        }
        console.log("Agent...data", agentDetails);
       let responseData={
        status:"SUCCESS",
        message:"Get one agent details",
        data:agentDetails
     }
     universalFunction.sendResponse(request,response,responseData,next);

    }catch(error){
        next(error);
    }
  };
    exports.getOneClientDetails=async function (request,response,next){
    try{
       const {clientPhoneNumber}=request.body;
            
      const clientDetails= await ClientDetails.find({clientPhoneNumber:clientPhoneNumber});
           
        if (clientDetails.length === 0)
       {
        return response.status(404).send({
            status:"FAILURE",
            message:" Client data not  found"
        }); 
        }
        console.log("Client Data....", clientDetails);
       let responseData={
        status:"SUCCESS",
        message:"Get one client details",
        data:clientDetails
     }
     universalFunction.sendResponse(request,response,responseData,next);

    }catch(error){
        next(error);
    }
  };
    exports.updateAgentDetails=async function(request,response,next){
    try{
      const {
            firstName,
            middleName,
            lastName,
            phoneNumber,
            whatsAppNumber,
            adharCard,
            panCard,
            email,
            pincode,
            buildingName,
            streetName,
            code        
            } = request.body;
               
            if (pincode.slice(3, 6) >= 1 && pincode.slice(3, 6) <= 10) {
                var agentCodeData = "A" ;            
        }
            if (pincode.slice(3, 6) > 10 && pincode.slice(3, 6) <= 20) {
                var agentCodeData = "B";
            }
            if (pincode.slice(3, 6) > 20 && pincode.slice(3, 6) <= 30) {
                var agentCodeData = "C";
        }
        
            if (pincode.slice(3, 6) > 30 && pincode.slice(3, 6) <= 40) {
                var agentCodeData = "D";
        }
        
            if (pincode.slice(3, 6) >40 && pincode.slice(3, 6) <= 50) {
                var agentCodeData = "E" ;            
        }
            if (pincode.slice(3, 6) > 50 && pincode.slice(3, 6) <= 60) {
                var agentCodeData = "F";
            }
            if (pincode.slice(3, 6) > 60 && pincode.slice(3, 6) <= 70) {
                var agentCodeData = "G";
        }
        
            if (pincode.slice(3, 6) > 70 && pincode.slice(3, 6) <= 80) {
                var agentCodeData = "H";
            }
           if (pincode.slice(3, 6) > 80 && pincode.slice(3, 6) <= 90) {
                var agentCodeData = "I";
        }
        
            if (pincode.slice(3, 6) > 90 && pincode.slice(3, 6) <= 100) {
                var agentCodeData = "J";
            }
          var agentCode =agentCodeData+
            pincode.slice(3,6) +
            firstName.slice(0, 1) +
            middleName.slice(0, 1) +
            lastName.slice(0, 1);
       
       const agentDetails=await AgentDetails.findOne({phoneNumber:phoneNumber});
        console.log("agentDetails....",agentDetails);   

         if(agentDetails.length === 0){
        return response.status(400).send({
            status:"FAILURE",
            message:" Agent data not  found"
        }); 
      }
      agentDetails.firstName=firstName;
      agentDetails.middleName=middleName;
      agentDetails.lastName=lastName;
        agentDetails.phoneNumber = phoneNumber;
        agentDetails.whatsAppNumber = whatsAppNumber;
        agentDetails.adharCard = adharCard;
        agentDetails.panCard = panCard;
        agentDetails.email = email;
        agentDetails.pincode = pincode;
        agentDetails.buildingName = buildingName;
        agentDetails.streetName = streetName;
        agentDetails.code= agentCode;   

      
      const agentData= await agentDetails.save(function(error,saveResult){
        if(error){throw new Error (error)}
        let responseData={
            status:"SUCCESS",
            message:"Agent details updated successfully",
            data:agentDetails
        }
        universalFunction.sendResponse(request,response,responseData,next);
    });
    }catch(error)
    {
        next(error);
    }
  };
 exports.updateClientDetails=async function(request,response,next){
    try{
      const {
            firstName,
            middleName,
            lastName,
            clientPhoneNumber,
            whatsAppNumber,
            adharCard,
            panCard,
            email,
            pincode,
            buildingName,
            streetName,
          code,
            phoneNumber
        } = request.body;
        
         const clientDetails=await ClientDetails.findOne({clientPhoneNumber:clientPhoneNumber});
        console.log("clientDetails....",clientDetails);   

         if(clientDetails.length === 0){
        return response.status(400).send({
            status:"FAILURE",
            message:" Client data not  found"
        }); 
        }
          const phoneNumber1 = await AgentDetails.find({ phoneNumber: phoneNumber });
        console.log("All agent details here....", phoneNumber1);
        request.data = phoneNumber1[0];
        console.log("code of agent is", request.data.code);
        
      clientDetails.firstName=firstName;
      clientDetails.middleName=middleName;
      clientDetails.lastName=lastName;
       clientDetails.phoneNumber = phoneNumber;
        clientDetails.whatsAppNumber = whatsAppNumber;
        clientDetails.adharCard = adharCard;
        clientDetails.panCard = panCard;
        clientDetails.email = email;
        clientDetails.pincode = pincode;
        clientDetails.buildingName = buildingName;
        clientDetails.streetName = streetName;
        clientDetails.code=request.data.code;   

      
      const clientData= await clientDetails.save(function(error,saveResult){
        if(error){throw new Error (error)}
        let responseData={
            status:"SUCCESS",
            message:"Client details updated successfully",
            data:clientData
        }
        universalFunction.sendResponse(request,response,responseData,next);
    });
    }catch(error)
    {
        next(error);
    }
};
  

  exports.deleteAgent=async function(request,response,next){
    try{
      const {phoneNumber}=request.body;
                
       const agentDetails=await AgentDetails.deleteOne({phoneNumber:phoneNumber});
        console.log(agentDetails);   

         if(agentDetails.length === 0){
        return response.status(400).send({
            status:"FAILURE",
            message:" Agent data not  found"
        }); 
        }
         
        const agentData = await AgentDetails();    
         
        agentData.phoneNumber = phoneNumber;

        let responseData = {
            status:"SUCCESS",
            message:"Delete agent details successfully",
            data:[]
        }
        universalFunction.sendResponse(request,response,responseData,next);
  
    }catch(error)
    {
        next(error);
    }
  };

  exports.deleteClient=async function(request,response,next){
    try{
      const {clientPhoneNumber}=request.body;
                
       const clientDetails=await ClientDetails.deleteOne({clientPhoneNumber:clientPhoneNumber});
        console.log(clientDetails);   

         if(clientDetails.length === 0){
        return response.status(400).send({
            status:"FAILURE",
            message:" Client data not  found"
        }); 
        }
         
        const clientData = await ClientDetails();    
         
        clientData.clientPhoneNumber = clientPhoneNumber;

        let responseData = {
            status:"SUCCESS",
            message:"Delete client details successfully",
            data:[]
        }
        universalFunction.sendResponse(request,response,responseData,next);
  
    }catch(error)
    {
        next(error);
    }
  };
