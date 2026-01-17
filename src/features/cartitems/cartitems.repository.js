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
  async get(userID){
    try{
        const db = getDB();
        const collection = db.collection(this.collection);
        return await collection.find({userID: new ObjectId(userID)}).toArray();

    }catch(err){
        throw new ApplicationError("Something went wrong with database", 500)
    }
 }  
 
 async delete(cartItemID,userID){
    try{
        const db = getDB();
        const collection = db.collection(this.collection);
        const result = await collection.deleteOne({_id: new ObjectId(cartItemID), userID:new ObjectId(userID)});
        return result.deletedCount>0;
    }catch(err){
        throw new ApplicationError("Something went wrong with database", 500)
    }
 }
}