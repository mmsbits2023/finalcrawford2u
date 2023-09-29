const CategoriesDetails = require("../Models/CategoriesDetails");
const SubCategoriesDetails = require("../Models/SubCategoriesDetails");
const universalFunction = require("../Functions/universalFunction");
const subCategoriesDetails = require("../Models/SubCategoriesDetails");

exports.addCategories = async (request, response, next) => {
    try {
        const { name,categoryNumber } = request.body;

        const categoriesCheck = await CategoriesDetails.find({ name: name }).countDocuments();

        if (categoriesCheck > 0) {
            return response.status(404).send({
                status: "FAILURE",
                message: "Categories are already exit here..."
            })
        }
        const categoriesData = await CategoriesDetails();
        categoriesData.name = name;
        categoriesData.categoryNumber = categoryNumber;

        categoriesData.save(async (error, saveResult) => {
            if (error) { throw new Error(error); }
        
            let responseData = {
                status: "SUCCESS",
                message: "Category added successfully",
                data: []
                            
            };
            universalFunction.sendResponse(request, response, responseData, next);
        })

    } catch (error) {
        console.log(error);
        next(error);
    }
};
exports.getAllCategoriesList = async (request, response, next) => {
    try {
       // const { name } = request.body;

        const categoriesCheck = await CategoriesDetails.find();

        if (categoriesCheck.length === 0) {
            return response.status(404).send({
                status: "FAILURE",
                message: "Categories are not found"
            })
        }
                       
            let responseData = {
                status: "SUCCESS",
                message: "Category data successfully",
                data: {
                    categoriesData: categoriesCheck,
                    count: categoriesCheck.length
                }
                            
        };
        universalFunction.sendResponse(request, response, responseData, next);
    } catch (error) {
        console.log(error);
        next(error);
    }
};

exports.getOneCategory = async (request, response, next) => {
    try {
       const { name } = request.body;

        const categoriesCheck = await CategoriesDetails.find({name:name});

        if (categoriesCheck === 0) {
            return response.status(404).send({
                status: "FAILURE",
                message: "Categories are not found"
            })
        }
                       
        let responseData = {
            status: "SUCCESS",
            message: "Show Category data successfully",
            data: {
                categoriesCheck:categoriesCheck
        }                           
        };
        universalFunction.sendResponse(request, response, responseData, next);
    } catch (error) {
        console.log(error);
        next(error);
    }
};
exports.updateCategories = async (request, response, next) => {
    try {
        const { categoryNumber,name} = request.body;
         
        const categoriesCheck = await CategoriesDetails.findOne({ categoryNumber:categoryNumber });
              
        if (categoriesCheck=== 0) {
            return response.status(404).send({
                status: "FAILURE",
                message: "Categories are not found"
            })
        }
        const categoriesData = categoriesCheck[0];
        categoriesCheck.name = name;
        categoriesCheck.categoryNumber = categoryNumber;

        categoriesCheck.save(async (error, saveResult) => {
            if (error) { throw new Error(error); }
        
            let responseData = {
                status: "SUCCESS",
                message: "Category updated successfully",
                data: []
                            
            };
            universalFunction.sendResponse(request, response, responseData, next);
        })

    } catch (error) {
        console.log(error);
        next(error);
    }
};
exports.deleteCategory = async (request, response, next) => {
    try {
       const { name } = request.body;

        const categoriesCheck = await CategoriesDetails.deleteOne({name:name});

        if (categoriesCheck.length === 0) {
            return response.status(404).send({
                status: "FAILURE",
                message: "Categories are not found"
            })
        }
                       
            let responseData = {
                status: "SUCCESS",
                message: "Category data  deleted successfully",
                data: []                            
        };
        universalFunction.sendResponse(request, response, responseData, next);
    } catch (error) {
        console.log(error);
        next(error);
    }
};
exports.addSubCategories = async (request, response, next) => {
    try {
        const { name, subCategoriesName, icon, color, categoryName } = request.body;

       
        const subCategoriesCheck = await SubCategoriesDetails.find({ subCategoriesName: subCategoriesName }).countDocuments();

        if (subCategoriesCheck > 0) {
            return response.status(404).send({
                status: "FAILURE",
                message: "SubCategories are already exit here..."
            })
        }
        const mainCategory = await CategoriesDetails.find({ name: name });
        request.data = mainCategory[0];
        console.log("mainCategory....", request.data.name);
        const dataName = request.data.name;
        console.log("dataName is....", dataName);
        const subCategoriesData = new SubCategoriesDetails();
        subCategoriesData.mainCategory = dataName;
        subCategoriesData.subCategoriesName = subCategoriesName;
        subCategoriesData.icon = icon;
        subCategoriesData.color = color;

        subCategoriesData.save(async (error, saveResult) => {
            if (error) { throw new Error(error); }
        
            let responseData = {
                status: "SUCCESS",
                message: " SubCategory added successfully",
                data: []
                            
            };
            universalFunction.sendResponse(request, response, responseData, next);
        })

    } catch (error) {
        console.log(error);
        next(error);
    }
};
exports.getAllSubCategoriesList = async (request, response, next) => {
    try {
       // const { name } = request.body;

        const subCategoriesCheck = await SubCategoriesDetails.find();

        if (subCategoriesCheck.length === 0) {
            return response.status(404).send({
                status: "FAILURE",
                message: "SubCategories are not found"
            })
        }
                       
            let responseData = {
                status: "SUCCESS",
                message: " Show SubCategory data successfully",
                data: {
                    subCategoriesData: subCategoriesCheck,
                    count: subCategoriesCheck.length
                }
                            
        };
        universalFunction.sendResponse(request, response, responseData, next);
    } catch (error) {
        console.log(error);
        next(error);
    }
};

exports.getOneSubCategory = async (request, response, next) => {
    try {
       const { subCategoriesName } = request.body;

        const subCategoriesCheck = await SubCategoriesDetails.find({subCategoriesName:subCategoriesName});

        if (subCategoriesCheck === 0) {
            return response.status(404).send({
                status: "FAILURE",
                message: "SubCategories are not found"
            })
        }
                       
        let responseData = {
            status: "SUCCESS",
            message: "Show SubCategory data successfully",
            data: {
                subCategoriesCheck:subCategoriesCheck
        }                           
        };
        universalFunction.sendResponse(request, response, responseData, next);
    } catch (error) {
        console.log(error);
        next(error);
    }
};

exports.updateSubCategories = async (request, response, next) => {
    try {
        const { subCategoriesName,icon,color,name} = request.body;
         
        const subCategoriesCheck = await SubCategoriesDetails.findOne({subCategoriesName:subCategoriesName });
              
        if (subCategoriesCheck=== 0) {
            return response.status(404).send({
                status: "FAILURE",
                message: "Sub Categories are not found"
            })
        }
        const subCategoriesData = subCategoriesCheck[0];
        subCategoriesCheck.name = name;
        subCategoriesCheck.subCategoriesName = subCategoriesName;
        subCategoriesCheck.icon = icon;
        subCategoriesCheck.color = color;

        subCategoriesCheck.save(async (error, saveResult) => {
            if (error) { throw new Error(error); }
        
            let responseData = {
                status: "SUCCESS",
                message: "SuSbCategory updated successfully",
                data: []
                            
            };
            universalFunction.sendResponse(request, response, responseData, next);
        })

    } catch (error) {
        console.log(error);
        next(error);
    }
};
exports.deleteSubCategory = async (request, response, next) => {
    try {
       const { subCategoriesName } = request.body;

        const subCategoriesCheck = await SubCategoriesDetails.deleteOne({subCategoriesName:subCategoriesName});

        if (subCategoriesCheck.length === 0) {
            return response.status(404).send({
                status: "FAILURE",
                message: "SubCategories are not found"
            })
        }
                       
            let responseData = {
                status: "SUCCESS",
                message: "SubCategory data  deleted successfully",
                data: []                            
        };
        universalFunction.sendResponse(request, response, responseData, next);
    } catch (error) {
        console.log(error);
        next(error);
    }
};
