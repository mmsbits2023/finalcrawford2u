require('./db/connection');
const cors = require("cors");
const path = require("path");
const express = require("express");
const app = express();
const Port = process.env.PORT || 5050;
const agentRouter = require('./Routes/AgentRoutes/AgentRoute');
const clientRouter = require('./Routes/ClientRoutes/ClientRoute');
const categoriesRouter = require("./Routes/Categories-SubCategoriesRoutes/CategoriesRoute");
const productRouter = require("./Routes/ProductRoutes/ProductRoute");
const orderRouter = require("./Routes/OrderRoutes/OrderRoute");


app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors());

/*app.use(express.static(path.join(__dirname, '../frontend/build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});*/

app.use('/agent', agentRouter.Router);
app.use('/client', clientRouter.Router);
app.use('/category', categoriesRouter.Router);
app.use('/products', productRouter.Router);
app.use('/order', orderRouter.Router);




app.listen(Port, () => { 
    console.log(`Server is running on port number ${Port}`)
})