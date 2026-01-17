import CartItemModel from "./cartitems.model.js";
import CartitemsRepository from "./cartitems.repository.js";

export class CartItemsController{
    constructor(){
        this.cartitemRepository = new CartitemsRepository();
    }
    async add(req,res){
        const{productID, quantity} = req.body;
        const userID = req.userID;
        await this.cartitemRepository.add(productID, userID, quantity);
        res.status(201).send('Cart is updated');
    }

    get(req, res){
        const userID = req.userID;
        console.log(userID)
        const items = CartItemModel.get(userID);
        return res.status(200).send(items);
    }

    delete(req, res){
        const userID = req.userID;
        const cartItemID = req.params.id;
        const error = CartItemModel.delete(cartItemID,  userID);
        if(error){
            return res.status(404).send(error)
        }
        return res.status(200).send('Cart Item is removed');

    }
}