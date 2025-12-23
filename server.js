import express from "express";
import productRouter from "./src/features/product/product.routes.js";
import bodyParser from "body-parser";
import userRouter from "./src/features/user/user.routes.js";
import jwtAuth from "./src/middlewares/jwt.middleware.js";
import cartRouter from "./src/features/cartitems/cartitems.routes.js";

//create Server
const app = express();

app.use(bodyParser.json());

//for all requests related toproduct,redirect to product routes.
//localhost:3200/api/products

app.use('/api/users', userRouter)
app.use('/api/products', jwtAuth, productRouter);
app.use('/api/cartitems', jwtAuth, cartRouter);



app.get('/', (req, res) => {
   res.send("Welocm to E-com API");
})

app.listen(3200, () => {
   console.log("Server is running on port 3200");
});

