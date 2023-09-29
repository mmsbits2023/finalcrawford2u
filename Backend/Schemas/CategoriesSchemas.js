
exports.addCategoriesSchemas = {

  type: "object",
  properties: {
    name: {
      type: "string",
          },
    
  },
  required: ["name"],
};

exports.getOneCategoriesSchemas = {

  type: "object",
  properties: {
    name: {
      type: "string",
          },
    
  },
  required: ["name"],
};
exports.updateCategoriesSchemas = {

  type: "object",
  properties: {
    name: {
      type: "string",
          },
    
  },
  required: ["name"],
};
exports.deleteCategoriesSchemas = {

  type: "object",
  properties: {
    name: {
      type: "string",
          },
    
  },
  required: ["name"],
};
exports.addSubCategoriesSchemas = {
  
  type: "object",
  properties: {
    subCategoriesName: {
      type: "string",
    },
    
  },
  required: ["subCategoriesName"],
};

exports.getOneSubCategoriesSchemas = {
  
  type: "object",
  properties: {
    subCategoriesName: {
      type: "string",
    },
    
  },
  required: ["subCategoriesName"],
};

exports.deleteSubCategoriesSchemas = {
  
  type: "object",
  properties: {
    subCategoriesName: {
      type: "string",
          },
    
  },
  required: ["subCategoriesName"],
}

exports.updateSubCategoriesSchemas = {
  
  type: "object",
  properties: {
    subCategoriesName: {
      type: "string",
          },
    
  },
  required: ["subCategoriesName"],
}