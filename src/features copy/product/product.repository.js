import {ObjectId} from 'mongodb';
import { getDB } from "../../config/mongodb.js";
import { ApplicationError } from "../../error-handler/applicationError.js";
import mongoose from 'mongoose';
import { productSchema } from './product.schema.js';
import { reviewSchema } from './review.schema.js';
import { categorySchema } from './category.schema.js';

const ProduceModel = mongoose.model('Product',productSchema);
const ReviewModel = mongoose.model('Review', reviewSchema);
const CategoryModel = mongoose.model('Category',categorySchema);
class ProductRepository{
    constructor(){
        this.collection = "products";
    }
 
    async add(productData){
        try{
            //add the product.
            productData.categories=productData.category.split(',').map(e=>e.trim());
            const newProduct =  new ProduceModel(productData);
            const savedProduct = await newProduct.save();

            //update categories.
            await CategoryModel.updateMany(
                {_id:{$in:productData.categories}},
                {
                 $push:{products:new ObjectId(savedProduct._id)}
                }
            )
        
        } catch(err){
            console.log(err);
            throw new ApplicationError("Something went wrong with database", 500);
        }
    }

    async getAll(){
        try{
            const db = getDB();
            const collection = db.collection(this.collection);
            const products = await collection.find().toArray();
            console.log(products);
            return products;
        } catch(err){
            console.log(err);
            throw new ApplicationError("Something went wrong with database", 500);
        }
    }

    async get(id){
        try{
            const db = getDB();
            const collection = db.collection(this.collection);
            return await collection.findOne({_id:id});
        }catch(err){
            console.log(err);
            throw new ApplicationError("Something went wrong with database", 500);
        }
    }

    async filter(minPrice, maxPrice, category){
        try{
            const db = getDB();
            const collection = db.collection(this.collection);
            let filterExpression={};
            if(minPrice){
                filterExpression.price = {$gte: parseFloat(minPrice)}
            }
            if(maxPrice){
                filterExpression.price = {...filterExpression.price, $lte: parseFloat(maxPrice)}
            }
            if(category){
                filterExpression ={$or:[{category:{$in:category}},filterExpression]}
                // filterExpression.category=category;
            }
            return await collection.find(filterExpression).project({name:1,price:1,_id:0, ratings:{$slice:-1}}).toArray();
            
        }catch(err){
            console.log(err);
            throw new ApplicationError("Something went wrong with database", 500);
        }
    }

   async rate(userID, productID, rating){
        try{
          //1.Check if Product exits
          const productToUpdate =await ProduceModel.findById(productID)
          if(!productToUpdate){
             throw new Error("Product not found")
          }
          //2.Get the existing review
          const userReview=await ReviewModel.findOne({product:new ObjectId(productID), user:new ObjectId(userID)});
          if(userReview){
            userReview.rating = rating;
            await userReview.save();
          }else{
            const newReview = new ReviewModel({
                product:new ObjectId(productID),
                user:new ObjectId(userID),
                rating:rating
            })
            await newReview.save();
          }
        }catch(err){
            console.log(err);
            throw new ApplicationError("Something went wrong with database", 500);
        }
    }

    async averageProductPricePerCategory(){
        try{
            const db = getDB();
           return await db.collection(this.collection)
            .aggregate([
                {
                    //Stage 1: Get Vaerge price per category
                    $group:{
                        _id:"$category",
                        averagePrice:{$avg:"$price"}
                    }
                }
            ]).toArray();

        }catch(err){
            console.log(err);
            throw new ApplicationError("Something went wrong with database", 500);
        }
    }



}

export default ProductRepository;