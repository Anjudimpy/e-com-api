import { LikeRepository } from "./like.repository.js";

export class LikeController{
    constructor(){
        this.likeRepository = new LikeRepository();
    }
     async getLikes(req,res,next){
        try{
            const {id,type} =req.params;
            const likes=await this.likeRepository.getLikes(type,id);
            return res.status(200).send(likes);
            console.log(likes)
        }catch(err){
            console.log(err);
            return res.status(200).send("Somthing went wrong");
        }
    }
    async likeItem(req, res, next){
        
        try{
           const {id, type} = req.body;
           const userId= req.userId;
           if(type!='Product'&& type!='Category'){
             return res.status(400).send('Invalid Type')
           }
           if(type=='Product'){
            this.likeRepository.likeProduct(userId, id)
           }else{
            this.likeRepository.likeCategory(userId,id)
           }
           return res.status(200).send();
        }catch(err){
            console.log(err);
            return res.status(200).send("Somthing went wrong")
    }
        
    }

   
}