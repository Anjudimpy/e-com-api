import express from 'express';
import { CartItemsController } from './cartitems.controller.js';

const cartRouter = express.Router();

const cartItemController = new CartItemsController();

cartRouter.delete('/:id',(req,res,next)=>{cartItemController.delete(req,res,next)})
cartRouter.post('/',(req,res,next)=>{cartItemController.add(req,res,next)} );
cartRouter.get('/',(req,res,next)=>{cartItemController.get(req,res,next)});


export default cartRouter;
