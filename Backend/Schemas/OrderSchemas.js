
exports.createOrderSchemas = {
  
  type: "object",
  properties: {
    OrderproductsName: {
      type: "string",
          },
    
  },
  required: ["OrderproductsName"],
},

exports.getOneOrderSchemas = {
  
  type: "object",
  properties: {
    productName1: {
      type: "string",
          },
    
  },
  required: ["productName1"],
    },

exports.updateOrderSchemas = {
  
  type: "object",
  properties: {
    productName1: {
      type: "string",
          },
    
  },
  required: ["productName1"],
    },
    
exports.deleteOrderSchemas = {
  
  type: "object",
  properties: {
    productName1: {
      type: "string",
          },
    
  },
  required: ["productName1"],
}