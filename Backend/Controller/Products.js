const CategoriesDetails = require("../Models/CategoriesDetails");
const ProductDetails = require("../Models/ProductDetails");
const universalFunction = require("../Functions/universalFunction");

exports.addProducts = async function (request, response, next) {
    try {
        const {
            productsName,
            description,
            richDescription,
            image,
            images,
            brand,
            price,
            category,
            countInStock,
            rating,
            isFeatured,
            dateCreated,
            name
        } = request.body;
        const productCheck = await ProductDetails.find({ productsName: productsName }).countDocuments();
         
        if (productCheck > 0) {
            return response.status(400).send({
                status: "FAILURE",
                message: "Product already exist here..."
            })
        }
        const categoryData = await CategoriesDetails.find({ name: name });
        console.log("category data.....", categoryData[0]);
        request.data = categoryData[0];
        const categorydata = request.data.name;
        console.log("categorydata.....name...", categoryData);
       
        const productData = await ProductDetails();
        productData.productsName = productsName;
        productData.description = description;
        productData.richDescription = richDescription;
        productData.image = image;
        productData.images = images;
        productData.brand = brand;
        productData.price = price;
        productData.mainCategory = categorydata;
        productData.countInStock = countInStock;
        productData.rating = rating;
        productData.isFeatured = isFeatured;
        productData.dateCreated = dateCreated;

        productData.save(async (error, saveResult) => {
            if (error) { throw new Error(error) }
        
            let responseData = {
                status: "SUCCESS",
                message: "product data added successfully",
                data: []
                            
            };
            universalFunction.sendResponse(request, response, responseData, next);
        })

    } catch (error) {
        console.log(error);
        next(error);
    }
};

exports.getAllProductsList = async function (request, response, next) {
    try {
        //const { productsName } = request.body; 
            
        const productsData = await ProductDetails.find();
               
        if (productsData.length === 0) {
            return response.status(404).send({
                status: "FAILURE",
                message: "Productdata not found here..."
            })
        }
        // productsData.productsName = productsName;
       
        let responseData = {
            status: "SUCCESS",
            message: " Show products data successfully",
            data: {
                productsData: productsData,
                count: productsData.length
            }
                            
        };
        universalFunction.sendResponse(request, response, responseData, next);

            
    } catch (error) {
        console.log(error);
        next(error);
    }
};
    
exports.getOneProductDetails = async function (request, response, next) {
    try {
        const { productsName } = request.body;
            
        const productsData = await ProductDetails.find({ productsName: productsName });
               
        if (productsData.length === 0) {
            return response.status(404).send({
                status: "FAILURE",
                message: "Product data not found here..."
            })
        }
        // productsData.productsName = productsName;
       
        let responseData = {
            status: "SUCCESS",
            message: " Show products data successfully",
            data: {
                productsData: productsData,
            }
                            
        };
        universalFunction.sendResponse(request, response, responseData, next);
   
    } catch (error) {
        console.log(error);
        next(error);
    }
};
    
exports.updateProductDetails = async function (request, response, next) {
    try {
        const {
            productsName,
            description,
            richDescription,
            image,
            images,
            brand,
            price,
            category,
            countInStock,
            rating,
            isFeatured,
            dateCreated,
            name
        } = request.body;
        const productCheck = await ProductDetails.findOne({ productsName: productsName })
         
        if (productCheck.length === 0) {
            return response.status(404).send({
                status: "FAILURE",
                message: "Product data not found here..."
            })
        }
        const categoryData = await CategoriesDetails.find({ name: name });
        console.log("category data.....", categoryData[0]);
        request.data = categoryData[0];
        const categorydata = request.data.name;
        console.log("categorydata.....name...", categoryData);
       
        const productData = productCheck[0];
        productCheck.productsName = productsName;
        productCheck.description = description;
        productCheck.richDescription = richDescription;
        productCheck.image = image;
        productCheck.images = images;
        productCheck.brand = brand;
        productCheck.price = price;
        productCheck.mainCategory = categorydata;
        productCheck.countInStock = countInStock;
        productCheck.rating = rating;
        productCheck.isFeatured = isFeatured;
        productCheck.dateCreated = dateCreated;

        const data = productCheck.save(async (error, saveResult) => {
            if (error) { throw new Error(error) }
        
            let responseData = {
                status: "SUCCESS",
                message: "product data updated successfully",
                data: { productCheck: productCheck }
                            
            };
            universalFunction.sendResponse(request, response, responseData, next);
        })

    } catch (error) {
        console.log(error);
        next(error);
    }
};
    
exports.deleteProducts = async function (request, response, next) { 
    try {
        const { productsName } = request.body;
       
        const productCheck = await ProductDetails.deleteOne({ productsName: productsName });
        
        if (productCheck.length === 0) { 
           return response.status(404).send({
                status: "FAILURE",
                message:"Product not found here..."
            }) 
        }
        productCheck.productsName = productsName;
       
            let responseData = {
                status: "SUCCESS",
                message: "product data deleted successfully",
                data: []
                            
            };
            universalFunction.sendResponse(request, response, responseData, next);

            
    } catch (error) {
        console.log(error);
        next(error);
     }
}
