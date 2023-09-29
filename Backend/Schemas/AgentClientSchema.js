
exports.generateRegisterSchema={
    type:"object",
    properties:{
        phoneNumber:{
            type:"string",
            minLength:10,
            maxLength:10,
            pattern:"^[0-9()-.s]+$",
        },
        mpin:{
            type:"string",
            minLength:8,
            maxLength:8,
            pattern:"^[0-9()-.s]+$",
      },
      firstName: {
        type: "string",
        pattern: "^[A-Z,a-z]",
        errorMessage:"Invalid firstname "
      },
      middleName: {
        type: "string",
        pattern: "^[A-Z,a-z]",
        errorMessage:"Invalid middleName"
      },
       lastName: {
        type: "string",
        pattern: "^[A-Z,a-z]",
        errorMessage:"Invalid lastName "
      },
        adharCard: {
          type: "string",
          minLength: 12,
          maxLength:12,
        pattern: "^[0-9()-.s]+$",
        errorMessage:" Invalid adharCard number"
      },
         panCard: {
          type: "string",
          minLength: 10,
          maxLength:10,
        pattern: "^[A-Z,0-9()-.s]+$",
        errorMessage:"Pancard number "
      },
         buildingName: {
        type: "string",
        pattern: "^[A-Z,a-z]",
        errorMessage:"buildingName must be required"
      },
          streetName: {
        type: "string",
        pattern: "^[A-Z,a-z]",
        errorMessage:"streetName must be required"
      },
     pinCode: {
        type: "string",
        minLength:6, 
        maxLength:6,
        pattern:"^[0-9()-.s]+$",
        errorMessage:"pincode must be required"
      }
    },
    required: ["phoneNumber"]
};
exports.generateClientRegisterSchema={
    type:"object",
    properties:{
        clientPhoneNumber:{
            type:"string",
            minLength:10,
            maxLength:10,
            pattern:"^[0-9()-.s]+$",
        },
        mpin:{
            type:"string",
            minLength:8,
            maxLength:8,
            pattern:"^[0-9()-.s]+$",
      },
        firstName: {
        type: "string",
        pattern: "^[A-Z,a-z]",
        errorMessage:"Invalid firstname "
      },
      middleName: {
        type: "string",
        pattern: "^[A-Z,a-z]",
        errorMessage:"Invalid middleName"
      },
       lastName: {
        type: "string",
        pattern: "^[A-Z,a-z]",
        errorMessage:"Invalid lastName "
      },
        adharCard: {
          type: "string",
          minLength: 12,
          maxLength:12,
        pattern: "^[0-9()-.s]+$",
        errorMessage:" Invalid adharCard number"
      },
         panCard: {
          type: "string",
          minLength: 10,
          maxLength:10,
        pattern: "^[A-Z,0-9()-.s]+$",
        errorMessage:"Pancard number "
      },
         buildingName: {
        type: "string",
        pattern: "^[A-Z,a-z]",
        errorMessage:"buildingName must be required"
      },
        streetName: {
        type: "string",
        pattern: "^[A-Z,a-z]",
        errorMessage:"streetName must be required"
      },
      pincode: {
        type: "string",
        minLength:6, 
        maxLength:6,
        pattern: "^[0-9()-.s]+$",
        errorMessage:"pincode must be required"
      }
    },
    required: ["clientPhoneNumber","mpin"]
};
exports.verifyLoginSchema = {
    type: "object",
    properties: {
        phoneNumber: {
            type: "string",
            minLength: 10,
            maxLength: 10,
            pattern: "^[0-9()-.s]+$",
        },
        mpin: {
            type: "string",
            minLength: 8,
            maxLength: 8,
            pattern: "^[0-9()-.s]+$"
        }
    },
    required: ["phoneNumber", "mpin"]
};

exports.clientLoginSchema = {
    type: "object",
    properties: {
        clientPhoneNumber: {
            type: "string",
            minLength: 10,
            maxLength: 10,
            pattern: "^[0-9()-.s]+$",
        },
        mpin: {
            type: "string",
            minLength: 8,
            maxLength: 8,
            pattern: "^[0-9()-.s]+$"
        }
    },
    required: ["clientPhoneNumber", "mpin"]
};

exports.getAllAgentSchemas = {

  type: "object",
  properties: {
    phoneNumber: {
      type: "string",
      minLength: 10,
      maxLength: 10,
      pattern: "^[0-9()-.s]+$",
    },
    
  },
  required: ["phoneNumber"],
};

exports.getAllClientSchemas = {

  type: "object",
  properties: {
    ClientPhoneNumber: {
      type: "string",
      minLength: 10,
      maxLength: 10,
      pattern: "^[0-9()-.s]+$",
    },
    
  },
  required: ["ClientPhoneNumber"],
};
exports.getOneAgentSchemas = {

  type: "object",
  properties: {
    phoneNumber: {
      type: "string",
      minLength: 10,
      maxLength: 10,
      pattern: "^[0-9()-.s]+$",
    },
    
  },
  required: ["phoneNumber"],
};

exports.getOneClientSchemas = {

  type: "object",
  properties: {
    clientPhoneNumber: {
      type: "string",
      minLength: 10,
      maxLength: 10,
      pattern: "^[0-9()-.s]+$",
    },
    
  },
  required: ["clientPhoneNumber"],
};

exports.updateAgentSchemas = {

  type: "object",
  properties: {
    phoneNumber: {
      type: "string",
      minLength: 10,
      maxLength: 10,
      pattern: "^[0-9()-.s]+$",
    },
    
  },
  required: ["phoneNumber"],
};

exports.updateClientSchemas = {

  type: "object",
  properties: {
    clientPhoneNumber: {
      type: "string",
      minLength: 10,
      maxLength: 10,
      pattern: "^[0-9()-.s]+$",
    },
    
  },
  required: ["clientPhoneNumber"],
};

exports.deleteAgentSchemas = {

  type: "object",
  properties: {
    phoneNumber: {
      type: "string",
      minLength: 10,
      maxLength: 10,
      pattern: "^[0-9()-.s]+$",
    },
    
  },
  required: ["phoneNumber"],
};

exports.deleteClientSchemas = {

  type: "object",
  properties: {
    clientPhoneNumber: {
      type: "string",
      minLength: 10,
      maxLength: 10,
      pattern: "^[0-9()-.s]+$",
    },
    
  },
  required: ["clientPhoneNumber"],
};

exports.logoutAgentSchemas = {

  type: "object",
  properties: {
    phoneNumber: {
      type: "string",
      minLength: 10,
      maxLength: 10,
      pattern: "^[0-9()-.s]+$",
    },
    
  },
  required: ["phoneNumber"],
};
exports.logoutClientSchemas = {

  type: "object",
  properties: {
    clientPhoneNumber: {
      type: "string",
      minLength: 10,
      maxLength: 10,
      pattern: "^[0-9()-.s]+$",
    },
    
  },
  required: ["clientPhoneNumber"],
};