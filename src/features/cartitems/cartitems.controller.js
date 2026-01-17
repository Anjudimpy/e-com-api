import CartItemModel from "./cartitems.model.js";
import CartitemsRepository from "./cartitems.repository.js";

export class CartItemsController{
    constructor(){
        this.cartitemRepository = new CartitemsRepository();
    }
    async add(req,res){
        try{
        const{productID, quantity} = req.body;
        const userID = req.userID;
        await this.cartitemRepository.add(productID, userID, quantity);
        res.status(201).send('Cart is updated');
        }catch(err){
            return res.status(500).send("Something went wrong");
        }
        
    }

   async get(req, res){
    try{
        const userID = req.userID;
        const items = await this.cartitemRepository.get(userID);
        return res.status(200).send(items);

    }catch(err){
        console.log(err)
        return res.status(500).send("Something went wrong");
    }
        
    }

   async delete(req, res){
        const userID = req.userID;
        const cartItemID = req.params;
        const isDeleted =await this.cartitemRepository.delete(cartItemID,  userID);
        if(!isDeleted){
            return res.status(404).send("item not found")
        }
        return res.status(200).send('Cart Item is removed');

    }
}