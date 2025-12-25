import express from "express";
import swagger from "swagger-ui-express";
import productRouter from "./src/features/product/product.routes.js";
import bodyParser from "body-parser";
import userRouter from "./src/features/user/user.routes.js";
import jwtAuth from "./src/middlewares/jwt.middleware.js";
import cartRouter from "./src/features/cartitems/cartitems.routes.js";
import apiDocs from './swagger.json' assert {type:'json'};

//create Server
const app = express();
app.use(bodyParser.json());

//CROS policy configuration
app.use((req,res, next)=>{
   res.header('Access-Control-Allow-Origin','http://127.0.0.1:5500');
   res.header('Access-Control-Allow-Headers','*');
   res.header('Access-Control-Allow-Methods',"*");

   //return ok for preflight request.
   if(req.method == 'OPTIONS'){
      return res.sendStatus(200);
   }
   next();
})
app.use('/api-docs', swagger.serve, swagger.setup(apiDocs));

//for all requests related toproduct,redirect to product routes.
//localhost:3200/api/products

app.use('/api/users', userRouter)
app.use('/api/products', jwtAuth, productRouter);
app.use('/api/cartitems', jwtAuth, cartRouter);

app.get('/', (req, res) => {
   res.send("Welocm to E-com API");
})
app.use((req, res)=>{
   res.status(404).send("API not found. Please check our documantions for more information at localhost:3200/api-docs")
})

app.listen(3200, () => {
   console.log("Server is running on port 3200");
});

