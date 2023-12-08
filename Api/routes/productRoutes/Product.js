const express=require('express');
const Router=express.Router();
const productController=require('../../controller/productController/Product')

Router.post("/addproduct",productController.addProduct);


module.exports=Router;