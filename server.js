import express from "express";
import './env.js';
import swagger from "swagger-ui-express";
import productRouter from "./src/features/product/product.routes.js";
import bodyParser from "body-parser";
import userRouter from "./src/features/user/user.routes.js";
import jwtAuth from "./src/middlewares/jwt.middleware.js";
import cartRouter from "./src/features/cartitems/cartitems.routes.js";
import apiDocs from './swagger.json' assert {type:'json'};
import cors from "cors";
import loggerMiddleware from "./src/middlewares/logger.middleware.js";
import { ApplicationError } from "./src/error-handler/applicationError.js";
import {connectToMongoDB} from "./src/config/mongodb.js";
import orderRouter from "./src/features/order/order.routes.js";

//create Server
const app = express();
//load all the enviroment variable in application

app.use(bodyParser.json());

//CROS policy configuration
// 1.
// app.use((req,res, next)=>{
//    res.header('Access-Control-Allow-Origin','http://127.0.0.1:5500');
//    res.header('Access-Control-Allow-Headers','*');
//    res.header('Access-Control-Allow-Methods',"*");

//    //return ok for preflight request.
//    if(req.method == 'OPTIONS'){
//       return res.sendStatus(200);
//    }
//    next();
// })

//2. CORS configuration by library
app.use(cors());

app.use('/api-docs', swagger.serve, swagger.setup(apiDocs));

app.use(loggerMiddleware);

//for all requests related toproduct,redirect to product routes.
//localhost:3200/api/products

app.use('/api/users', userRouter)
app.use('/api/products', productRouter);
app.use('/api/cartitems',loggerMiddleware, jwtAuth, cartRouter);
app.use('/api/orders', jwtAuth, orderRouter)

app.get('/', (req, res) => {
   res.send("Welocm to E-com API");
})
//Error handler middleware
app.use((err, req, res, next) =>{
   console.log(err);
   if(err instanceof ApplicationError){
      res.status(err.code).send(err.message);
   }
   //server errors
   res.status(500).send("Somthing went wrong, please try later")
})

// Middleware to handle 404 requests.
app.use((req, res)=>{
   res.status(404).send("API not found. Please check our documantions for more information at localhost:3200/api-docs")
})

app.listen(3200, () => {
   console.log("Server is running on port 3200");
   connectToMongoDB();
});

