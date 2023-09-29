
exports.addProductSchemas = {
  
    type: "object",
    properties: {
        productsName: {
            type: "string",
        },
    
    },
    required: ["productsName"],
};


exports.getOneProductDetailsSchemas = {
  
    type: "object",
    properties: {
        productsName: {
            type: "string",
        },
    
    },
    required: ["productsName"],
};

exports.updateProductDetailsSchemas = {
  
  type: "object",
  properties: {
    productsName: {
      type: "string",
          },
    
  },
  required: ["productsName"],
}
exports.deleteProductSchemas = {
  
  type: "object",
  properties: {
    productsName: {
      type: "string",
          },
    
  },
  required: ["productsName"],
}
