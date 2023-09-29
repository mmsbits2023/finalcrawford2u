const categoryController = require("../../Controller/Categories-SubCategories");
const validationFunction = require("../../Functions/validationFunction");
const categorySchema = require("../../Schemas/CategoriesSchemas")

const Router = require("express").Router();

//Add Categories API
Router.route('/addCategory').post(
   validationFunction.validateUser(categorySchema.addCategoriesSchemas),
   categoryController.addCategories
);

//Get All Categories List API
Router.route('/getAllCategoriesList').post(
      categoryController.getAllCategoriesList
);

//Get One Category  API
Router.route('/getOneCategory').post(
   validationFunction.validateUser(categorySchema.getOneCategoriesSchemas),
   categoryController.getOneCategory
)

//Get Update Category  API
Router.route('/updateCategory').post(
   validationFunction.validateUser(categorySchema.updateCategoriesSchemas),
   categoryController.updateCategories
)
//Delete Category API
Router.route('/deleteCategory').post(
   validationFunction.validateUser(categorySchema.deleteCategoriesSchemas),
   categoryController.deleteCategory
)
//Add SubCategories API
Router.route('/addSubCategory').post(
   validationFunction.validateUser(categorySchema.addSubCategoriesSchemas),
   categoryController.addSubCategories
);

//Get All SubCategories List API
Router.route('/getAllSubCategoriesList').post(
      categoryController.getAllSubCategoriesList
);

//Get One SubCategory  API
Router.route('/getOneSubCategory').post(
   validationFunction.validateUser(categorySchema.getOneSubCategoriesSchemas),
   categoryController.getOneSubCategory
);

//Get delete SubCategory  API
Router.route('/deleteSubCategory').post(
   validationFunction.validateUser(categorySchema.deleteSubCategoriesSchemas),
   categoryController.deleteSubCategory
);

//Get Update Sub Category  API
Router.route('/updateSubCategory').post(
   validationFunction.validateUser(categorySchema.updateSubCategoriesSchemas),
   categoryController.updateSubCategories
)
exports.Router=Router;