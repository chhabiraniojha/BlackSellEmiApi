const express=require('express');
const router=express.Router();
const productController=require('../../controller/productController/Product')


router.get('/filteredproducts',productController.getFilteredProducts)
router.post("/addproduct",productController.addProduct);
router.get('/allproducts',productController.getAllProducts)
router.get('/allproducts/:id',productController.getSingleProduct)
router.delete('/allproducts/:id',productController.deleteSingleProduct)


module.exports=router;