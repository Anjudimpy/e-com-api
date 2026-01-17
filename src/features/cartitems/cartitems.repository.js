import { ObjectId } from "mongodb";
import { getDB } from "../../config/mongodb.js"
import { ApplicationError } from "../../error-handler/applicationError.js";

export default class CartitemsRepository{
    constructor(){
        this.collection = "cartitems"
    }

  async add(productID, userID, quantity){
    try{
        const db = getDB();
        const collection = db.collection(this.collection);
        await collection.insertOne({productID:new ObjectId(productID), userID:new ObjectId(userID), quantity});
    }catch(err){
        throw new ApplicationError("Something went wrong with database", 500);
    }
     }
}