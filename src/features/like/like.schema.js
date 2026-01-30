import mongoose from "mongoose";

export const likeSchema =  new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    },
    likeable:{
        type:mongoose.Schema.Types.ObjectId,
        refPath:'types'
    },
    types:{
        type:String,
        enum:['Product', 'Category']
    }
}).pre('save',()=>{
    console.log('New like comming in');
    // next();
}).post('save',(doc)=>{
    console.log('like is saved');
    console.log(doc);
}).pre('find',()=>{
    console.log('Retrive likes')
    // next();
}).post('find',(docs)=>{
    console.log('find is completed');
    console.log(docs)
})