const express=require('express');
const router=express.Router();
const productController=require('../../controller/productController/Product')


router.get('/filteredproducts',productController.getFilteredProducts)
router.get('/products',productController.getProducts)

// admin routes
router.post("/admin/addproduct",productController.addProduct);
router.get('/admin/allproducts',productController.getAllProducts)
router.get('/admin/allproducts/:id',productController.getSingleProduct)
router.delete('/admin/allproducts/:id',productController.deleteSingleProduct)


module.exports=router;